import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { mockProducts } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SaleCountdown } from "@/components/sale-countdown"

export default function ComingSoonPage() {
  // Filter products to show only those with future release dates
  const today = new Date()

  const comingSoon = mockProducts.filter((product) => {
    if (!product.releaseDate) return false
    const releaseDate = new Date(product.releaseDate)
    return releaseDate > today
  })

  // Sort by release date (closest first)
  const sortedComingSoon = [...comingSoon].sort((a, b) => {
    const dateA = new Date(a.releaseDate || Date.now())
    const dateB = new Date(b.releaseDate || Date.now())
    return dateA.getTime() - dateB.getTime()
  })

  // Get most anticipated (top 3 by pre-orders or rating)
  const mostAnticipated = [...comingSoon].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)

  // Group by release window
  const thisMonth = sortedComingSoon.filter((p) => {
    const releaseDate = new Date(p.releaseDate || Date.now())
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    return releaseDate < nextMonth
  })

  const nextThreeMonths = sortedComingSoon.filter((p) => {
    const releaseDate = new Date(p.releaseDate || Date.now())
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    const threeMonths = new Date()
    threeMonths.setMonth(threeMonths.getMonth() + 3)
    return releaseDate >= nextMonth && releaseDate <= threeMonths
  })

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Coming Soon", href: "/coming-soon" },
        ]}
      />

      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Coming Soon</h1>
        <p className="mt-2 text-muted-foreground">
          Explore upcoming games and software releases you can pre-order today.
        </p>
      </div>

      {/* Most Anticipated */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Most Anticipated</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mostAnticipated.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-medium">
                    Pre-order Discount: {product.discount}%
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Release Date: {new Date(product.releaseDate || Date.now()).toLocaleDateString()}
                </p>
                <div className="mb-3">
                  <SaleCountdown endDate={new Date(product.releaseDate || Date.now())} label="Releases in:" />
                </div>
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
                    <Button size="sm" variant="default">
                      Pre-order Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tabs for different release windows */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Upcoming</TabsTrigger>
          <TabsTrigger value="thisMonth">This Month</TabsTrigger>
          <TabsTrigger value="nextThree">Next 3 Months</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={sortedComingSoon} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="thisMonth">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={thisMonth} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nextThree">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={nextThreeMonths} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
