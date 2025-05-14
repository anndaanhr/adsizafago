"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Calendar, MapPin, ArrowLeft, Award, Tag, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductGrid } from "@/components/product-grid"
import { mockPublishers, mockProducts } from "@/lib/mock-data"

export default function PublisherDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id

  const [publisher, setPublisher] = useState(null)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Load publisher data and products on initial load
  useEffect(() => {
    const fetchPublisher = () => {
      try {
        setIsLoading(true)

        // Find publisher by ID
        const foundPublisher = mockPublishers.find((p) => p.id === id)

        if (foundPublisher) {
          setPublisher(foundPublisher)

          // Get publisher's products
          const publisherProducts = mockProducts.filter((product) => product.publisher === foundPublisher.name)
          setProducts(publisherProducts)
        } else {
          router.push("/404")
        }
      } catch (error) {
        console.error("Failed to fetch publisher", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchPublisher()
    }
  }, [id, router])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
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

  // Get deals from this publisher
  const deals = products.filter((product) => product.discount > 0)

  // Get top rated products
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4)

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Publishers", href: "/publishers" },
          { label: publisher.name, href: `/publishers/${publisher.id}` },
        ]}
      />

      {/* Publisher Hero Section */}
      <div className="relative mt-6 mb-10 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
          <div className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl">
            <Image
              src={publisher.logo || `/placeholder.svg?height=160&width=160&text=${publisher.name[0]}`}
              alt={publisher.name}
              fill
              className="object-contain p-2"
            />
          </div>

          <div className="flex-1 text-center md:text-left text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{publisher.name}</h1>
            <p className="text-white/80 mb-4 max-w-2xl">{publisher.description.split(".")[0]}.</p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Badge
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-none flex items-center gap-1"
              >
                <Calendar className="h-3 w-3" />
                Founded: {publisher.founded}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-none flex items-center gap-1"
              >
                <MapPin className="h-3 w-3" />
                {publisher.headquarters}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-none flex items-center gap-1"
              >
                <Tag className="h-3 w-3" />
                {products.length} Products
              </Badge>
              <Button variant="secondary" size="sm" asChild className="bg-white/90 hover:bg-white text-blue-600">
                <a href={publisher.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Visit Website
                </a>
              </Button>
            </div>
          </div>
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
            Products ({products.length})
          </TabsTrigger>
          <TabsTrigger
            value="deals"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Current Deals ({deals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About {publisher.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{publisher.description}</p>
                  <p className="text-muted-foreground">
                    Founded in {publisher.founded}, {publisher.name} has established itself as a leading publisher in
                    the digital entertainment industry. With headquarters in {publisher.headquarters}, they continue to
                    deliver high-quality products to customers worldwide.
                  </p>
                </CardContent>
              </Card>

              {topRated.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-yellow-500" />
                      Top Rated Products
                    </CardTitle>
                    <CardDescription>The highest rated products from {publisher.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {topRated.map((product) => (
                        <Card key={product.id} className="overflow-hidden border-0 shadow-sm">
                          <CardContent className="p-0">
                            <div className="flex">
                              <div className="relative h-24 w-24 flex-shrink-0">
                                <Image
                                  src={
                                    product.image ||
                                    `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(product.title)}`
                                  }
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
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium line-clamp-1">{product.title}</h4>
                                  <div className="flex items-center">
                                    <Badge
                                      variant="secondary"
                                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500"
                                    >
                                      {product.rating}★
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{product.platform}</p>
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
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publisher Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

              {publisher.featuredProducts && publisher.featuredProducts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Tag className="mr-2 h-5 w-5 text-blue-500" />
                      Featured Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {publisher.featuredProducts.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`}>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                            <div className="relative h-12 w-12 rounded overflow-hidden">
                              <Image
                                src={
                                  product.image ||
                                  `/placeholder.svg?height=48&width=48&text=${encodeURIComponent(product.title)}`
                                }
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{product.title}</h4>
                              {product.discount > 0 && (
                                <span className="text-xs text-sale-red">Save {product.discount}%</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                All Products by {publisher.name}
              </CardTitle>
              <CardDescription>Browse the complete catalog of products from this publisher</CardDescription>
            </CardHeader>
            <CardContent>
              {products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground">This publisher doesn't have any products in our catalog yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5 text-sale-red" />
                Current Deals from {publisher.name}
              </CardTitle>
              <CardDescription>Special offers and discounts currently available</CardDescription>
            </CardHeader>
            <CardContent>
              {deals.length > 0 ? (
                <ProductGrid products={deals} showSaleTags={true} />
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                  <h3 className="text-lg font-medium mb-2">No deals available</h3>
                  <p className="text-muted-foreground mb-4">There are currently no active deals from this publisher.</p>
                  <Button asChild>
                    <Link href="/deals">Browse All Deals</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
