"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ExternalLink, Award, Calendar, Package } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockPublishers } from "@/lib/mock-data"

export default function PublishersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter publishers based on search query
  const filteredPublishers = mockPublishers.filter((publisher) =>
    publisher.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Publishers</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search publishers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Featured Publisher */}
      {filteredPublishers.length > 0 && searchQuery.length === 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Featured Publisher</h2>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-lg p-4 flex-shrink-0 backdrop-blur-sm">
                <Image
                  src={filteredPublishers[0].logo || "/placeholder.svg"}
                  alt={filteredPublishers[0].name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <Badge className="bg-white/20 hover:bg-white/30 mb-2">Featured</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{filteredPublishers[0].name}</h2>
                <p className="text-white/80 max-w-2xl mb-4">{filteredPublishers[0].description}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Founded: {filteredPublishers[0].founded}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Package className="h-4 w-4" />
                    <span>Products: {filteredPublishers[0].products.length}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Award className="h-4 w-4" />
                    <span>Top Publisher</span>
                  </div>
                </div>
                <Button asChild className="bg-white text-blue-600 hover:bg-white/90">
                  <Link href={`/publishers/${filteredPublishers[0].id}`}>View Publisher</Link>
                </Button>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      )}

      {/* Publishers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPublishers.length > 0 ? (
          filteredPublishers.map(
            (publisher, index) =>
              // Skip the first publisher if we're showing the featured section and there's no search query
              (searchQuery.length > 0 || index > 0) && (
                <Link key={publisher.id} href={`/publishers/${publisher.id}`}>
                  <Card className="h-full overflow-hidden hover:shadow-md transition-all border-2 hover:border-brand-500/20">
                    <CardContent className="p-0">
                      <div className="relative h-32 w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="relative w-20 h-20 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
                            <Image
                              src={publisher.logo || "/placeholder.svg"}
                              alt={publisher.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h2 className="text-xl font-bold mb-2 text-center">{publisher.name}</h2>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 text-center">
                          {publisher.description.substring(0, 100)}...
                        </p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Founded:</span> {publisher.founded}
                          </div>
                          <div>
                            <span className="font-medium">Products:</span> {publisher.products.length}
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <Button variant="ghost" size="sm" className="text-brand-500 gap-1">
                            View Publisher <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ),
          )
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">No publishers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
