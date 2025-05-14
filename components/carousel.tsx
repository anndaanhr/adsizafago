"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CarouselProps {
  items: {
    id: string
    title: string
    image: string
    price: number
    discount?: number
    platform: string
    category: string
  }[]
}

export function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, items.length])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const currentItem = items[currentIndex]
  const discountedPrice = currentItem.discount
    ? (currentItem.price - (currentItem.price * currentItem.discount) / 100).toFixed(2)
    : currentItem.price.toFixed(2)

  return (
    <div className="relative w-full overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative aspect-[21/9] w-full">
        <Image
          src={currentItem.image || "/placeholder.svg"}
          alt={currentItem.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/30 dark:from-background/90 dark:via-background/60 dark:to-background/40" />

        <div className="absolute inset-0 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-4 md:gap-6 max-w-md">
              <div className="space-y-2">
                <Badge className="inline-block">{currentItem.platform}</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{currentItem.title}</h1>
                <p className="text-muted-foreground md:text-xl">Get your digital code instantly after purchase.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">${discountedPrice}</span>
                {currentItem.discount && (
                  <Badge variant="destructive" className="text-sm">
                    {currentItem.discount}% OFF
                  </Badge>
                )}
                {currentItem.discount && (
                  <span className="text-xl text-muted-foreground line-through">${currentItem.price.toFixed(2)}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href={`/products/${currentItem.id}`}>Buy Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/products?category=${currentItem.category}`}>View More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-primary/30"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
