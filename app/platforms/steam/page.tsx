import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { mockProducts } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SteamPage() {
  // Filter products to show only Steam platform
  const steamProducts = mockProducts.filter((product) => product.platforms?.includes("Steam"))

  // Get featured Steam games (top 3 by rating)
  const featuredSteam = [...steamProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)

  // Get Steam deals
  const steamDeals = steamProducts
    .filter((p) => p.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 6)

  // Group by category
  const actionGames = steamProducts.filter((p) => p.genre?.includes("Action"))
  const rpgGames = steamProducts.filter((p) => p.genre?.includes("RPG"))
  const strategyGames = steamProducts.filter((p) => p.genre?.includes("Strategy"))

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Platforms", href: "/platforms" },
          { label: "Steam", href: "/platforms/steam" },
        ]}
      />

      {/* Steam Platform Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg p-6 mb-8 mt-4 text-white">
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
              className="text-blue-700"
            >
              <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"></path>
              <path d="M16.24 7.76a6 6 0 1 0-8.48 8.48"></path>
              <path d="M12 18v-4"></path>
              <path d="M8 10l4 4"></path>
              <path d="M16 10l-4 4"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Steam Games</h1>
            <p className="mt-2">
              Browse our collection of games available on the Steam platform. Instant delivery of Steam keys.
            </p>
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary" className="bg-blue-800 hover:bg-blue-800">
                Official Partner
              </Badge>
              <Badge variant="secondary" className="bg-blue-800 hover:bg-blue-800">
                Instant Delivery
              </Badge>
              <Badge variant="secondary" className="bg-blue-800 hover:bg-blue-800">
                Global Keys
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Steam Games */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Steam Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSteam.map((product) => (
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
                  <Badge variant="outline" className="bg-blue-50">
                    Steam
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

      {/* Steam Deals */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Steam Deals</h2>
          <Link href="/deals">
            <Button variant="outline">View All Deals</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {steamDeals.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-medium">
                  -{product.discount}%
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm">${product.price.toFixed(2)}</span>
                  <span className="text-xs line-through text-muted-foreground">
                    ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tabs for different genres */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Steam Games</TabsTrigger>
          <TabsTrigger value="action">Action</TabsTrigger>
          <TabsTrigger value="rpg">RPG</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={steamProducts} />
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

        <TabsContent value="rpg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={rpgGames} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategy">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={strategyGames} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
