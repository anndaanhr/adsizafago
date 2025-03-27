"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ExternalLink, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { mockPublishers } from "@/lib/mock-data"

export default function PublishersPage() {
  const [publishers, setPublishers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    filterPublishers()
  }

  // Filter publishers based on search query
  const filterPublishers = () => {
    setLoading(true)

    // Filter publishers based on search query
    const filteredPublishers = mockPublishers.filter((publisher) => {
      if (!searchQuery) return true

      return (
        publisher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        publisher.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        publisher.products.some((product) => product.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })

    setPublishers(filteredPublishers)
    setLoading(false)
  }

  // Load publishers on initial load
  useEffect(() => {
    filterPublishers()
  }, [searchQuery])

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Publishers", href: "/publishers" },
        ]}
      />

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Publishers</h1>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search publishers..."
            className="w-full md:w-[300px] pl-8 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-muted animate-pulse h-[200px] shimmer"></div>
          ))}
        </div>
      ) : publishers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishers.map((publisher) => (
            <Card key={publisher.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-40 w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={publisher.logo || "/placeholder.svg"}
                      alt={publisher.name}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-2">{publisher.name}</h2>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{publisher.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {publisher.products.slice(0, 3).map((product, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                    {publisher.products.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{publisher.products.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={publisher.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Website
                      </a>
                    </Button>
                    <Button asChild>
                      <Link href={`/publishers/${publisher.id}`} className="flex items-center">
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
          <h3 className="text-lg font-medium mb-2">No publishers found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search query.</p>
          <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
        </div>
      )}
    </div>
  )
}

