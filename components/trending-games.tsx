"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { mockProducts } from "@/lib/mock-data"

export function TrendingGames() {
  const { toast } = useToast()
  const [trendingGames, setTrendingGames] = useState([])

  useEffect(() => {
    // Get trending games from the mock data
    const trending = mockProducts
      .filter((product) => product.category === "games")
      .sort((a, b) => b.rating * b.sales - a.rating * a.sales)
      .slice(0, 4)

    setTrendingGames(trending)
  }, [])

  const addToCart = (product) => {
    try {
      // Get existing cart
      const existingCart = localStorage.getItem("zafago_cart")
      const cart = existingCart ? JSON.parse(existingCart) : []

      // Check if product already in cart
      const existingItemIndex = cart.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity += 1
      } else {
        // Add new item with quantity 1
        cart.push({
          ...product,
          quantity: 1,
        })
      }

      // Save to localStorage
      localStorage.setItem("zafago_cart", JSON.stringify(cart))

      // Trigger storage event for header to update cart count
      window.dispatchEvent(new Event("storage"))

      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Failed to add to cart", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addToWishlist = (product) => {
    toast({
      title: "Added to wishlist",
      description: `${product.title} has been added to your wishlist.`,
    })
  }

  if (trendingGames.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[16/9] bg-muted animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                <div className="h-8 bg-muted rounded animate-pulse mt-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {trendingGames.map((game) => {
        const discountedPrice = game.discount
          ? (game.price - (game.price * game.discount) / 100).toFixed(2)
          : game.price.toFixed(2)

        return (
          <Card key={game.id} className="overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-0">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={game.image || `/placeholder.svg?height=225&width=400&text=${encodeURIComponent(game.title)}`}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {game.discount > 0 && (
                  <Badge className="absolute top-2 right-2 bg-sale-red hover:bg-sale-red">-{game.discount}%</Badge>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="font-normal">
                    {game.platform}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-xs font-medium">{game.rating}</span>
                  </div>
                </div>
                <Link href={`/products/${game.id}`} className="hover:underline">
                  <h3 className="font-semibold mb-2 line-clamp-1">{game.title}</h3>
                </Link>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold">${discountedPrice}</span>
                    {game.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">${game.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm" onClick={() => addToCart(game)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addToWishlist(game)}>
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to Wishlist</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                    <Link href={`/products/${game.id}`}>
                      <Info className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
