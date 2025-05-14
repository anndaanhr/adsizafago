import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { mockProducts } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewReleasesPage() {
  // Filter products to show only those released in the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const newReleases = mockProducts.filter((product) => {
    const releaseDate = new Date(product.releaseDate || Date.now())
    return releaseDate >= thirtyDaysAgo
  })

  // Get featured new releases (top 3 by rating)
  const featuredReleases = [...newReleases].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)

  // Group products by category
  const gameReleases = newReleases.filter((p) => p.category === "Games")
  const softwareReleases = newReleases.filter((p) => p.category === "Software")

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "New Releases", href: "/new-releases" },
        ]}
      />

      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">New Releases</h1>
        <p className="mt-2 text-muted-foreground">
          Check out the latest games and software released in the past 30 days.
        </p>
      </div>

      {/* Featured New Releases */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured New Releases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReleases.map((product) => (
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
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Released: {new Date(product.releaseDate || Date.now()).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center">
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

      {/* Tabs for Games and Software */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All New Releases</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={newReleases} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="games">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={gameReleases} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="software">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={softwareReleases} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
