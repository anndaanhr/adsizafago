"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

export function UpcomingReleases() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [notifiedGames, setNotifiedGames] = useState<Record<string, boolean>>({})
  const { toast } = useToast()
  const { user, openLoginModal } = useAuth()

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      // Generate mock upcoming games
      const today = new Date()

      const mockGames = [
        {
          id: "upcoming-1",
          title: "Dragon Age: The Veilguard",
          image: "/placeholder.svg?height=200&width=350&text=Dragon+Age",
          platform: "Steam",
          releaseDate: new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days from now
          publisher: "Electronic Arts",
          genre: "RPG",
        },
        {
          id: "upcoming-2",
          title: "Star Wars Outlaws",
          image: "/placeholder.svg?height=200&width=350&text=Star+Wars+Outlaws",
          platform: "Epic Games",
          releaseDate: new Date(today.getTime() + 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days from now
          publisher: "Ubisoft",
          genre: "Action Adventure",
        },
        {
          id: "upcoming-3",
          title: "Fable",
          image: "/placeholder.svg?height=200&width=350&text=Fable",
          platform: "Xbox",
          releaseDate: new Date(today.getTime() + 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 days from now
          publisher: "Microsoft",
          genre: "RPG",
        },
      ]

      setGames(mockGames)
      setLoading(false)
    }, 500)
  }, [])

  const handleNotify = (gameId, gameTitle) => {
    if (!user) {
      openLoginModal("Please login to set release notifications")
      return
    }

    setNotifiedGames((prev) => {
      const newState = { ...prev, [gameId]: !prev[gameId] }

      toast({
        title: newState[gameId] ? "Notification set" : "Notification removed",
        description: newState[gameId]
          ? `You'll be notified when ${gameTitle} is released.`
          : `You won't be notified about ${gameTitle}.`,
      })

      return newState
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-muted animate-pulse h-[200px] shimmer"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {games.map((game) => {
        const releaseDate = new Date(game.releaseDate)
        const daysUntilRelease = Math.ceil((releaseDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

        return (
          <div key={game.id} className="rounded-xl overflow-hidden border group hover-lift">
            <div className="relative h-[200px] w-full">
              <Image
                src={game.image || "/placeholder.svg"}
                alt={game.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                    {game.platform}
                  </Badge>
                  <Badge className="bg-sale-purple text-white">{daysUntilRelease} days left</Badge>
                </div>

                <Link href={`/products/${game.id}`}>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-brand-500 transition-colors line-clamp-1">
                    {game.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {releaseDate.toLocaleDateString()}
                  </div>

                  <Button
                    size="sm"
                    variant={notifiedGames[game.id] ? "default" : "outline"}
                    className={notifiedGames[game.id] ? "bg-brand-500 hover:bg-brand-600" : ""}
                    onClick={() => handleNotify(game.id, game.title)}
                  >
                    <Bell className="h-4 w-4 mr-1" />
                    {notifiedGames[game.id] ? "Notified" : "Notify Me"}
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
