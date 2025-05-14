"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Filter, Search, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { SaleCountdown } from "@/components/sale-countdown"
import { ProductGrid } from "@/components/product-grid"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductFilters } from "@/components/product-filters"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProducts } from "@/lib/mock-data"

export default function DealDetailPage() {
  const params = useParams()
  const dealId = params.id

  const [sale, setSale] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortOption, setSortOption] = useState("discount-high")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock sales data
  const salesData = {
    "summer-sale": {
      id: "summer-sale",
      title: "Summer Sale",
      description:
        "Huge discounts on top games! Limited time only. Get up to 80% off on selected titles across all categories. Don't miss out on these incredible deals!",
      endDate: "2023-08-31",
      image: "/placeholder.svg?height=400&width=800&text=Summer+Sale",
      discount: "Up to 80% off",
      theme: "from-sale-red to-sale-orange",
      banner: "/placeholder.svg?height=400&width=1200&text=Summer+Sale+Banner",
    },
    "publisher-week": {
      id: "publisher-week",
      title: "EA Publisher Week",
      description:
        "Special deals on all Electronic Arts titles. Enjoy massive discounts on popular EA franchises including FIFA, Battlefield, The Sims, and more!",
      endDate: "2023-08-15",
      image: "/placeholder.svg?height=400&width=800&text=EA+Publisher+Week",
      discount: "Up to 70% off",
      theme: "from-blue-600 to-blue-400",
      banner: "/placeholder.svg?height=400&width=1200&text=EA+Publisher+Week",
    },
    "indie-spotlight": {
      id: "indie-spotlight",
      title: "Indie Spotlight",
      description:
        "Discover amazing indie games at incredible prices. Support independent developers and find hidden gems at fantastic discounts!",
      endDate: "2023-08-20",
      image: "/placeholder.svg?height=400&width=800&text=Indie+Spotlight",
      discount: "Up to 65% off",
      theme: "from-purple-600 to-purple-400",
      banner: "/placeholder.svg?height=400&width=1200&text=Indie+Spotlight",
    },
  }

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    filterProducts()
  }

  // Filter products based on search query and sale
  const filterProducts = () => {
    setLoading(true)

    // Get products with discounts
    let filteredProducts = mockProducts.filter((product) => product.discount > 0)

    // Filter by sale type
    if (dealId === "summer-sale") {
      // Summer sale - all categories with high discounts
      filteredProducts = filteredProducts.filter((product) => product.discount >= 30)
    } else if (dealId === "publisher-week") {
      // EA Publisher Week - only EA games
      filteredProducts = filteredProducts.filter((product) => product.publisher === "Electronic Arts")
    } else if (dealId === "indie-spotlight") {
      // Indie Spotlight - only indie games
      filteredProducts = filteredProducts.filter((product) => product.genres.includes("Indie"))
    }

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort products
    switch (sortOption) {
      case "discount-high":
        filteredProducts.sort((a, b) => b.discount - a.discount)
        break
      case "price-low":
        filteredProducts.sort((a, b) => {
          const priceA = a.price - (a.price * a.discount) / 100
          const priceB = b.price - (b.price * b.discount) / 100
          return priceA - priceB
        })
        break
      case "price-high":
        filteredProducts.sort((a, b) => {
          const priceA = a.price - (a.price * a.discount) / 100
          const priceB = b.price - (b.price * b.discount) / 100
          return priceB - priceA
        })
        break
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        break
      case "bestselling":
        filteredProducts.sort((a, b) => b.sales - a.sales)
        break
    }

    setProducts(filteredProducts)
    setLoading(false)
  }

  // Load sale data and products on initial load
  useEffect(() => {
    if (dealId && salesData[dealId]) {
      setSale(salesData[dealId])
      filterProducts()
    }
  }, [dealId, sortOption, searchQuery])

  if (!sale) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Sale not found</h2>
          <p className="text-muted-foreground mb-6">The sale you're looking for doesn't exist or has ended.</p>
          <Button asChild>
            <Link href="/deals">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Deals
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
          { label: "Deals", href: "/deals" },
          { label: sale.title, href: `/deals/${sale.id}` },
        ]}
      />

      {/* Sale Banner */}
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${sale.theme} text-white mb-8`}>
        <div className="relative h-48 md:h-64 w-full">
          <Image src={sale.banner || sale.image} alt={sale.title} fill className="object-cover opacity-20" />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-2">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">{sale.discount}</Badge>
              <h1 className="text-2xl md:text-4xl font-bold">{sale.title}</h1>
              <p className="text-white/80 max-w-2xl">{sale.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <span className="text-white/80">Sale ends in:</span>
                <SaleCountdown
                  endDate={sale.endDate}
                  className="bg-black/20 backdrop-blur-sm rounded-lg p-2"
                  showTitle={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <h2 className="text-2xl font-bold">Sale Products</h2>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search in this sale..."
              className="w-[220px] pl-8 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount-high">Biggest Discount</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="bestselling">Best Selling</SelectItem>
            </SelectContent>
          </Select>

          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down your search with these filters.</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <ProductFilters isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mb-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search in this sale..."
            className="w-full pl-8 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <ProductFilters />
        </div>

        {/* Products */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-muted animate-pulse h-[300px] shimmer"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="text-sm text-muted-foreground mb-4">Showing {products.length} products in this sale</div>
              <ProductGrid products={products} showSaleTags={true} />

              {/* Pagination */}
              <div className="flex items-center justify-center space-x-2 mt-12">
                <Button variant="outline" size="icon" disabled>
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search query.</p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
