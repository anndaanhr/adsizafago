"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Calendar, MapPin, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductGrid } from "@/components/product-grid"
import { mockPublishers, mockProducts } from "@/lib/mock-data"

export default function PublisherDetailPage() {
  const params = useParams()
  const publisherId = params.id

  const [publisher, setPublisher] = useState(null)
  const [publisherProducts, setPublisherProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Load publisher data and products on initial load
  useEffect(() => {
    setLoading(true)

    // Find publisher by ID
    const foundPublisher = mockPublishers.find((p) => p.id === publisherId)

    if (foundPublisher) {
      setPublisher(foundPublisher)

      // Find products by this publisher
      const products = mockProducts.filter((product) => product.publisher === foundPublisher.name)
      setPublisherProducts(products)
    }

    setLoading(false)
  }, [publisherId])

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-64 bg-muted rounded"></div>
          <div className="h-10 w-96 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!publisher) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Publisher not found</h2>
          <p className="text-muted-foreground mb-6">The publisher you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/publishers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Publishers
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Publishers", href: "/publishers" },
          { label: publisher.name, href: `/publishers/${publisher.id}` },
        ]}
      />

      {/* Publisher Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
        <div className="w-32 h-32 relative flex-shrink-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg">
          <Image src={publisher.logo || "/placeholder.svg"} alt={publisher.name} fill className="object-contain p-2" />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{publisher.name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Founded: {publisher.founded}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {publisher.headquarters}
            </Badge>
            <Button variant="outline" size="sm" asChild className="h-6">
              <a href={publisher.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <ExternalLink className="mr-1 h-3 w-3" />
                Visit Website
              </a>
            </Button>
          </div>
          <p className="text-muted-foreground">{publisher.description}</p>
        </div>
      </div>

      {/* Publisher Content */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full justify-start overflow-auto py-1 px-0 bg-transparent">
          <TabsTrigger
            value="overview"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Products ({publisherProducts.length})
          </TabsTrigger>
          <TabsTrigger
            value="deals"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Current Deals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">About {publisher.name}</h2>
                <p className="text-muted-foreground mb-4">{publisher.description}</p>
                <p className="text-muted-foreground">
                  Founded in {publisher.founded}, {publisher.name} has established itself as a leading publisher in the
                  digital entertainment industry. With headquarters in {publisher.headquarters}, they continue to
                  deliver high-quality products to customers worldwide.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Popular Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {publisher.featuredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="relative h-24 w-24 flex-shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                            {product.discount > 0 && (
                              <div className="absolute top-0 right-0 bg-sale-red text-white text-xs font-bold px-1.5 py-0.5">
                                -{product.discount}%
                              </div>
                            )}
                          </div>
                          <div className="p-3 flex-1">
                            <h4 className="font-medium line-clamp-1">{product.title}</h4>
                            <Link
                              href={`/products/${product.id}`}
                              className="text-sm text-primary hover:underline mt-2 inline-block"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Publisher Info</h3>
              <Card>
                <CardContent className="p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Founded</h4>
                    <p>{publisher.founded}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Headquarters</h4>
                    <p>{publisher.headquarters}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Website</h4>
                    <a
                      href={publisher.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {publisher.website.replace("https://", "")}
                    </a>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Notable Products</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {publisher.products.map((product, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <h2 className="text-2xl font-semibold mb-6">All Products by {publisher.name}</h2>
          {publisherProducts.length > 0 ? (
            <ProductGrid products={publisherProducts} />
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">This publisher doesn't have any products in our catalog yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="deals" className="mt-6">
          <h2 className="text-2xl font-semibold mb-6">Current Deals from {publisher.name}</h2>
          {publisherProducts.filter((product) => product.discount > 0).length > 0 ? (
            <ProductGrid products={publisherProducts.filter((product) => product.discount > 0)} showSaleTags={true} />
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
              <h3 className="text-lg font-medium mb-2">No deals available</h3>
              <p className="text-muted-foreground mb-4">There are currently no active deals from this publisher.</p>
              <Button asChild>
                <Link href="/deals">Browse All Deals</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

