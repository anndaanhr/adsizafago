"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Eye, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

interface ProductGridProps {
  products: any[]
  showSaleTags?: boolean
}

export function ProductGrid({ products, showSaleTags = false }: ProductGridProps) {
  const { toast } = useToast()
  const { user, openLoginModal } = useAuth()
  const [hoveredProduct, setHoveredProduct] = useState(null)

  // Add to wishlist
  const addToWishlist = (e, product) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      openLoginModal("Please sign in to add items to your wishlist")
      return
    }

    // In a real app, this would be an API call to add the item to the user's wishlist
    // For now, we'll update local storage
    const storedWishlist = localStorage.getItem("zafago_wishlist")
    let wishlistIds = []

    if (storedWishlist) {
      try {
        wishlistIds = JSON.parse(storedWishlist)
      } catch (error) {
        console.error("Failed to parse wishlist", error)
      }
    }

    // Check if the product is already in the wishlist
    if (wishlistIds.includes(product.id)) {
      toast({
        title: "Already in wishlist",
        description: `${product.title} is already in your wishlist.`,
      })
      return
    }

    // Add the product ID to the wishlist
    wishlistIds.push(product.id)
    localStorage.setItem("zafago_wishlist", JSON.stringify(wishlistIds))

    toast({
      title: "Added to wishlist",
      description: `${product.title} has been added to your wishlist.`,
    })
  }

  // Add to cart
  const addToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()

    // In a real app, this would be an API call to add the item to the user's cart
    // For now, we'll update local storage
    const storedCart = localStorage.getItem("zafago_cart")
    let cartItems = []

    if (storedCart) {
      try {
        cartItems = JSON.parse(storedCart)
      } catch (error) {
        console.error("Failed to parse cart", error)
      }
    }

    // Check if the product is already in the cart
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      // Update quantity
      existingItem.quantity += 1
    } else {
      // Add new item
      cartItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        discount: product.discount,
        platform: product.platform,
        image: product.image,
        quantity: 1,
      })
    }

    localStorage.setItem("zafago_cart", JSON.stringify(cartItems))

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  // Navigate to product detail
  const navigateToProduct = (productId) => {
    window.location.href = `/products/${productId}`
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const discountedPrice = product.price - (product.price * product.discount) / 100

        return (
          <Card
            key={product.id}
            className="overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => navigateToProduct(product.id)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-sale-red text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </div>
                  )}
                  {showSaleTags && product.saleTag && (
                    <div className="absolute top-2 left-2 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      {product.saleTag}
                    </div>
                  )}

                  {/* Quick action buttons */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex justify-center gap-2 transition-opacity duration-300 ${
                      hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                      onClick={(e) => addToWishlist(e, product)}
                    >
                      <Heart className="h-4 w-4 text-white" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                      onClick={(e) => addToCart(e, product)}
                    >
                      <ShoppingCart className="h-4 w-4 text-white" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigateToProduct(product.id)
                      }}
                    >
                      <Eye className="h-4 w-4 text-white" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {product.platform}
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize">
                      {product.category}
                    </Badge>
                  </div>
                  <h3 className="font-medium mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {product.discount > 0 ? (
                        <>
                          <span className="font-bold">${discountedPrice.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

