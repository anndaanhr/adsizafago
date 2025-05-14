"use client"

import { useState, useEffect } from "react"
import { X, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { mockPublishers } from "@/lib/mock-data"

interface ProductFiltersProps {
  isMobile?: boolean
  priceRange?: [number, number]
  setPriceRange?: (range: [number, number]) => void
  selectedFilters?: {
    platforms: string[]
    genres: string[]
    publishers: string[]
    [key: string]: string[]
  }
  updateFilters?: (type: string, value: string) => void
  resetFilters?: () => void
}

export function ProductFilters({
  isMobile = false,
  priceRange = [0, 100],
  setPriceRange = () => {},
  selectedFilters = { platforms: [], genres: [], publishers: [] },
  updateFilters = () => {},
  resetFilters = () => {},
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange)
  const [localFilters, setLocalFilters] = useState(selectedFilters)

  // Update local state when props change
  useEffect(() => {
    setLocalPriceRange(priceRange)
    setLocalFilters(selectedFilters)
  }, [priceRange, selectedFilters])

  const toggleFilter = (type: string, value: string) => {
    // If updateFilters prop is provided, use it
    if (updateFilters) {
      updateFilters(type, value)
      return
    }

    // Otherwise, use local state
    setLocalFilters((prev) => {
      const current = [...prev[type]]
      const index = current.indexOf(value)

      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }

      return {
        ...prev,
        [type]: current,
      }
    })
  }

  const handlePriceRangeChange = (value: number[]) => {
    const newRange = value as [number, number]
    setLocalPriceRange(newRange)

    // If setPriceRange prop is provided, use it
    if (setPriceRange) {
      setPriceRange(newRange)
    }
  }

  const clearFilters = () => {
    // If resetFilters prop is provided, use it
    if (resetFilters) {
      resetFilters()
      return
    }

    // Otherwise, use local state
    setLocalFilters({
      platforms: [],
      genres: [],
      publishers: [],
    })
    setLocalPriceRange([0, 100])
  }

  const hasActiveFilters = () => {
    return (
      localFilters.platforms.length > 0 ||
      localFilters.genres.length > 0 ||
      localFilters.publishers.length > 0 ||
      localPriceRange[0] > 0 ||
      localPriceRange[1] < 100
    )
  }

  // Platform options
  const platforms = [
    "Steam",
    "Epic Games",
    "Origin",
    "Battle.net",
    "GOG",
    "Ubisoft Connect",
    "Windows",
    "Mac",
    "Cross-platform",
    "Xbox",
    "PlayStation",
  ]

  // Genre options
  const genres = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Racing",
    "Puzzle",
    "Indie",
    "FPS",
    "Open World",
    "Roguelike",
    "Metroidvania",
    "Casual",
    "Horror",
    "Platformer",
  ]

  // Publisher options from mock data
  const publishers = mockPublishers.map((publisher) => publisher.name)

  return (
    <div className={`space-y-6 ${isMobile ? "" : "sticky top-20"}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Filters</h3>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 text-xs text-brand-500 hover:text-brand-600"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Active filters */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {localFilters.platforms.map((platform) => (
            <Badge key={`platform-${platform}`} variant="secondary" className="flex items-center gap-1">
              {platform}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("platforms", platform)} />
            </Badge>
          ))}
          {localFilters.genres.map((genre) => (
            <Badge key={`genre-${genre}`} variant="secondary" className="flex items-center gap-1">
              {genre}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("genres", genre)} />
            </Badge>
          ))}
          {localFilters.publishers.map((publisher) => (
            <Badge key={`publisher-${publisher}`} variant="secondary" className="flex items-center gap-1">
              {publisher}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("publishers", publisher)} />
            </Badge>
          ))}
          {(localPriceRange[0] > 0 || localPriceRange[1] < 100) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              ${localPriceRange[0]} - ${localPriceRange[1]}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setLocalPriceRange([0, 100])
                  if (setPriceRange) {
                    setPriceRange([0, 100])
                  }
                }}
              />
            </Badge>
          )}
        </div>
      )}

      <div className="space-y-4">
        <Accordion type="multiple" defaultValue={["price", "platforms", "genres", "publishers"]}>
          <AccordionItem value="price" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="text-sm font-medium">Price Range</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 px-1">
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={localPriceRange}
                  onValueChange={handlePriceRangeChange}
                  className="py-4"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${localPriceRange[0]}</span>
                  <span className="text-sm">${localPriceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="platforms" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="text-sm font-medium">Platforms</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={`platform-${platform}`}
                      checked={localFilters.platforms.includes(platform)}
                      onCheckedChange={() => toggleFilter("platforms", platform)}
                      className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500"
                    />
                    <Label htmlFor={`platform-${platform}`} className="text-sm font-normal cursor-pointer">
                      {platform}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="genres" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="text-sm font-medium">Genres</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={`genre-${genre}`}
                      checked={localFilters.genres.includes(genre)}
                      onCheckedChange={() => toggleFilter("genres", genre)}
                      className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500"
                    />
                    <Label htmlFor={`genre-${genre}`} className="text-sm font-normal cursor-pointer">
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="publishers" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="text-sm font-medium">Publishers</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {publishers.map((publisher) => (
                  <div key={publisher} className="flex items-center space-x-2">
                    <Checkbox
                      id={`publisher-${publisher}`}
                      checked={localFilters.publishers.includes(publisher)}
                      onCheckedChange={() => toggleFilter("publishers", publisher)}
                      className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500"
                    />
                    <Label htmlFor={`publisher-${publisher}`} className="text-sm font-normal cursor-pointer">
                      {publisher}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ratings" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="text-sm font-medium">Ratings</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500"
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="text-sm font-normal cursor-pointer flex items-center"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-1">& Up</span>
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
