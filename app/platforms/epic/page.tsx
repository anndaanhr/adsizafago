import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { mockProducts } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function EpicGamesPage() {
  // Filter products to show only Epic Games platform
  const epicProducts = mockProducts.filter((product) => product.platforms?.includes("Epic"))

  // Get featured Epic games (top 3 by rating)
  const featuredEpic = [...epicProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)

  // Get Epic exclusives
  const epicExclusives = epicProducts
    .filter((p) => p.platforms?.includes("Epic") && !p.platforms?.includes("Steam") && !p.platforms?.includes("GOG"))
    .slice(0, 6)

  // Group by category
  const actionGames = epicProducts.filter((p) => p.genre?.includes("Action"))
  const adventureGames = epicProducts.filter((p) => p.genre?.includes("Adventure"))

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Platforms", href: "/platforms" },
          { label: "Epic Games", href: "/platforms/epic" },
        ]}
      />

      {/* Epic Platform Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-lg p-6 mb-8 mt-4 text-white">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-700"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Epic Games Store</h1>
            <p className="mt-2">
              Browse our collection of games available on the Epic Games Store. Instant delivery of Epic keys.
            </p>
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary" className="bg-purple-800 hover:bg-purple-800">
                Official Partner
              </Badge>
              <Badge variant="secondary" className="bg-purple-800 hover:bg-purple-800">
                Instant Delivery
              </Badge>
              <Badge variant="secondary" className="bg-purple-800 hover:bg-purple-800">
                Epic Exclusives
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Epic Games */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Epic Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEpic.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-medium">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-purple-50">
                    Epic
                  </Badge>
                  {product.genre && <Badge variant="outline">{product.genre}</Badge>}
                </div>
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    {product.discount > 0 && (
                      <span className="text-sm line-through text-muted-foreground">
                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Epic Exclusives */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Epic Exclusives</h2>
          <Link href="/platforms/epic?filter=exclusive">
            <Button variant="outline">View All Exclusives</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {epicExclusives.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                  Exclusive
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm">${product.price.toFixed(2)}</span>
                  {product.discount > 0 && (
                    <span className="text-xs line-through text-muted-foreground">
                      ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tabs for different genres */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Epic Games</TabsTrigger>
          <TabsTrigger value="action">Action</TabsTrigger>
          <TabsTrigger value="adventure">Adventure</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={epicProducts} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="action">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={actionGames} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="adventure">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={adventureGames} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
