"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, TrendingUp, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export function TrendingGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      // Generate mock trending games
      const mockGames = [
        {
          id: "1",
          title: "Elden Ring",
          image: "/placeholder.svg?height=600&width=300&text=Elden+Ring",
          price: 59.99,
          discount: 15,
          platform: "Steam",
          rating: 4.8,
          trendingRank: 1,
          trendingChange: "up",
        },
        {
          id: "2",
          title: "Baldur's Gate 3",
          image: "/placeholder.svg?height=600&width=300&text=Baldur's+Gate+3",
          price: 59.99,
          discount: 0,
          platform: "Steam",
          rating: 4.9,
          trendingRank: 2,
          trendingChange: "up",
        },
        {
          id: "3",
          title: "Cyberpunk 2077",
          image: "/placeholder.svg?height=600&width=300&text=Cyberpunk+2077",
          price: 49.99,
          discount: 30,
          platform: "Epic Games",
          rating: 4.5,
          trendingRank: 3,
          trendingChange: "down",
        },
        {
          id: "4",
          title: "Starfield",
          image: "/placeholder.svg?height=600&width=300&text=Starfield",
          price: 69.99,
          discount: 0,
          platform: "Steam",
          rating: 4.6,
          trendingRank: 4,
          trendingChange: "up",
        },
      ]

      setGames(mockGames)
      setLoading(false)
    }, 500)
  }, [])

  const handleAddToCart = (gameId, gameTitle) => {
    toast({
      title: "Added to cart",
      description: `${gameTitle} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-muted animate-pulse h-[400px] shimmer"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map((game) => {
        const discountedPrice = game.discount
          ? (game.price - (game.price * game.discount) / 100).toFixed(2)
          : game.price.toFixed(2)

        return (
          <div key={game.id} className="group relative rounded-xl overflow-hidden border hover-lift">
            <div className="relative h-[400px] w-full">
              <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              <div className="absolute top-2 left-2 flex items-center gap-2">
                <Badge className="bg-brand-500 text-white flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />#{game.trendingRank}
                </Badge>

                {game.discount > 0 && <Badge className="bg-sale-red text-white">{game.discount}% OFF</Badge>}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                    {game.platform}
                  </Badge>
                  <div className="flex items-center bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-xs font-medium">{game.rating}</span>
                  </div>
                </div>

                <Link href={`/products/${game.id}`}>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-brand-500 transition-colors">{game.title}</h3>
                </Link>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {game.discount > 0 ? (
                      <>
                        <span className="text-muted-foreground line-through">${game.price.toFixed(2)}</span>
                        <span className="font-bold text-brand-500">${discountedPrice}</span>
                      </>
                    ) : (
                      <span className="font-bold">${discountedPrice}</span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className="bg-brand-500 hover:bg-brand-600"
                    onClick={() => handleAddToCart(game.id, game.title)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

