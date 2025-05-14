"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { mockProducts } from "@/lib/mock-data"

export default function WishlistPage() {
  const { user, openLoginModal } = useAuth()
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Load wishlist items on initial load
  useEffect(() => {
    if (user) {
      setLoading(true)

      // In a real app, this would be an API call to get the user's wishlist
      // For now, we'll use mock data
      const storedWishlist = localStorage.getItem("zafago_wishlist")
      let wishlistIds = []

      if (storedWishlist) {
        try {
          wishlistIds = JSON.parse(storedWishlist)
        } catch (error) {
          console.error("Failed to parse wishlist", error)
        }
      }

      // Get the products from the wishlist IDs
      const items = mockProducts.filter((product) => wishlistIds.includes(product.id))
      setWishlistItems(items)

      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [user])

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    // In a real app, this would be an API call to remove the item from the user's wishlist
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

    // Remove the product ID from the wishlist
    const updatedWishlist = wishlistIds.filter((id) => id !== productId)
    localStorage.setItem("zafago_wishlist", JSON.stringify(updatedWishlist))

    // Update the UI
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))

    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    })
  }

  // Add item to cart
  const addToCart = (product) => {
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

  // Clear wishlist
  const clearWishlist = () => {
    // In a real app, this would be an API call to clear the user's wishlist
    // For now, we'll update local storage
    localStorage.setItem("zafago_wishlist", JSON.stringify([]))

    // Update the UI
    setWishlistItems([])

    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="container py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Wishlist", href: "/wishlist" },
          ]}
        />

        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Please sign in to view your wishlist</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Sign in to your account to view and manage your wishlist. Don't have an account? Create one for free.
          </p>
          <Button onClick={() => openLoginModal("Please sign in to view your wishlist")}>Sign In / Register</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Wishlist", href: "/wishlist" },
        ]}
      />

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>

        {wishlistItems.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-muted animate-pulse h-[200px] shimmer"></div>
          ))}
        </div>
      ) : wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="relative h-48 w-full">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    {item.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-sale-red text-white text-xs font-bold px-2 py-1 rounded">
                        {item.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <Link href={`/products/${item.id}`} className="hover:underline">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.title}</h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{item.platform}</Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {item.discount > 0 ? (
                          <>
                            <span className="text-lg font-bold">
                              ${(item.price - (item.price * item.discount) / 100).toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove from wishlist</span>
                        </Button>
                        <Button onClick={() => addToCart(item)}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8">
            You haven't added any products to your wishlist yet. Browse our catalog and add items you're interested in.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
