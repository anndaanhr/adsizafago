"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroCarouselProps {
  items: {
    id: string
    title: string
    image: string
    price: number
    discount?: number
    platform: string
    category: string
    description?: string
  }[]
}

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const startAutoPlay = () => {
      autoPlayRef.current = setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
      }, 5000)
    }

    startAutoPlay()

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, currentIndex, items.length])

  // Handle transition end
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
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
          className={`object-cover transition-opacity duration-500 ${isTransitioning ? "opacity-80" : "opacity-100"}`}
          priority
        />
        <div className="hero-overlay" />

        <div className="absolute inset-0 flex items-center">
          <div className="container px-4 md:px-6">
            <div
              className={`grid gap-4 md:gap-6 max-w-md transition-all duration-500 ${
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="space-y-2">
                <Badge className="inline-block bg-brand-500 hover:bg-brand-600">{currentItem.platform}</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{currentItem.title}</h1>
                <p className="text-muted-foreground md:text-xl">
                  {currentItem.description || "Get your digital code instantly after purchase."}
                </p>
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
                <Button size="lg" className="bg-brand-500 hover:bg-brand-600 hover-glow" asChild>
                  <Link href={`/products/${currentItem.id}`}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-500 text-brand-500 hover:bg-brand-500/10"
                  asChild
                >
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
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80 transition-all hover:scale-110"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80 transition-all hover:scale-110"
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
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-brand-500 w-6" : "bg-background/50 hover:bg-background/80"
            }`}
            onClick={() => goToSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

