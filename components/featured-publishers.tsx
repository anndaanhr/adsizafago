"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function FeaturedPublishers() {
  const [publishers, setPublishers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      // Generate mock publishers
      const mockPublishers = [
        {
          id: "electronic-arts",
          name: "Electronic Arts",
          logo: "/placeholder.svg?height=100&width=100&text=EA",
          productCount: 120,
          category: "major",
        },
        {
          id: "ubisoft",
          name: "Ubisoft",
          logo: "/placeholder.svg?height=100&width=100&text=Ubisoft",
          productCount: 95,
          category: "major",
        },
        {
          id: "activision-blizzard",
          name: "Activision Blizzard",
          logo: "/placeholder.svg?height=100&width=100&text=Activision",
          productCount: 85,
          category: "major",
        },
        {
          id: "take-two",
          name: "Take-Two Interactive",
          logo: "/placeholder.svg?height=100&width=100&text=Take-Two",
          productCount: 65,
          category: "major",
        },
        {
          id: "bethesda",
          name: "Bethesda Softworks",
          logo: "/placeholder.svg?height=100&width=100&text=Bethesda",
          productCount: 45,
          category: "major",
        },
      ]

      setPublishers(mockPublishers)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[200px] h-[100px] rounded-xl bg-muted animate-pulse shimmer"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {publishers.map((publisher) => (
        <Link key={publisher.id} href={`/publishers/${publisher.id}`} className="flex-shrink-0 w-[200px] group">
          <div className="rounded-xl border p-4 h-full flex flex-col hover-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <Image src={publisher.logo || "/placeholder.svg"} alt={publisher.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate group-hover:text-brand-500 transition-colors">
                  {publisher.name}
                </h3>
                <Badge variant={publisher.category === "major" ? "default" : "secondary"} className="mt-1 text-xs">
                  {publisher.category === "major" ? "Major" : "Indie"}
                </Badge>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
              <span>{publisher.productCount} products</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
