"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Filter, ChevronDown, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Breadcrumb } from "@/components/breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProducts } from "@/lib/mock-data"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortOption, setSortOption] = useState("featured")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedFilters, setSelectedFilters] = useState({
    platforms: [],
    genres: [],
    publishers: [],
  })

  // Get category from URL params
  const category = searchParams.get("category") || "all"
  const urlSearchQuery = searchParams.get("search") || ""
  const filter = searchParams.get("filter") || ""

  useEffect(() => {
    // Set initial search query from URL
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery)
    }

    // Set initial active tab based on category
    if (category !== "all") {
      setActiveTab(category)
    }
  }, [urlSearchQuery, category])

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    filterProducts()
  }

  // Update filters
  const updateFilters = (type, value) => {
    setSelectedFilters((prev) => {
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

  // Reset filters
  const resetFilters = () => {
    setSelectedFilters({
      platforms: [],
      genres: [],
      publishers: [],
    })
    setPriceRange([0, 100])
    setSearchQuery("")
    setSortOption("featured")
  }

  // Filter products based on active tab, search query, and filters
  const filterProducts = () => {
    setLoading(true)

    // Filter products based on active tab and search query
    const filteredProducts = mockProducts.filter((product) => {
      // Filter by category/tab
      if (activeTab !== "all" && product.category !== activeTab) {
        return false
      }

      // Filter by search query
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Filter by price range
      const discountedPrice = product.price - (product.price * product.discount) / 100
      if (discountedPrice < priceRange[0] || discountedPrice > priceRange[1]) {
        return false
      }

      // Filter by platforms
      if (selectedFilters.platforms.length > 0 && !selectedFilters.platforms.includes(product.platform)) {
        return false
      }

      // Filter by genres
      if (
        selectedFilters.genres.length > 0 &&
        !selectedFilters.genres.some((genre) => product.genres.includes(genre))
      ) {
        return false
      }

      // Filter by publishers
      if (selectedFilters.publishers.length > 0 && !selectedFilters.publishers.includes(product.publisher)) {
        return false
      }

      // Filter by special filters
      if (filter === "upcoming" && new Date(product.releaseDate) < new Date()) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortOption) {
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
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
      case "bestselling":
        filteredProducts.sort((a, b) => b.sales - a.sales)
        break
      case "discount":
        filteredProducts.sort((a, b) => b.discount - a.discount)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      // Featured is default
      default:
        // Mix of bestselling, rating, and newness
        filteredProducts.sort((a, b) => {
          const scoreA =
            a.sales / 1000000 +
            a.rating +
            (new Date(a.releaseDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? 2 : 0)
          const scoreB =
            b.sales / 1000000 +
            b.rating +
            (new Date(b.releaseDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? 2 : 0)
          return scoreB - scoreA
        })
    }

    setProducts(filteredProducts)
    setLoading(false)
  }

  // Fetch products on initial load and when filters change
  useEffect(() => {
    filterProducts()
  }, [activeTab, sortOption, selectedFilters, priceRange])

  // Get page title based on category
  const getPageTitle = () => {
    if (urlSearchQuery) {
      return `Search results for "${urlSearchQuery}"`
    }

    if (filter === "upcoming") {
      return "Upcoming Releases"
    }

    switch (activeTab) {
      case "games":
        return "Games"
      case "software":
        return "Software"
      case "digital":
        return "Digital Products"
      default:
        return "All Products"
    }
  }

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: getPageTitle(), href: `/products?category=${category}` },
        ]}
      />

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-[200px] pl-8 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="bestselling">Best Selling</SelectItem>
              <SelectItem value="discount">Biggest Discount</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
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
                <SheetDescription>Narrow down your product search with these filters.</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <ProductFilters
                  isMobile={true}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedFilters={selectedFilters}
                  updateFilters={updateFilters}
                  resetFilters={resetFilters}
                />
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
            placeholder="Search products..."
            className="w-full pl-8 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full justify-start overflow-auto py-1 px-0 bg-transparent">
          <TabsTrigger
            value="all"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Products
          </TabsTrigger>
          <TabsTrigger
            value="games"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Games
          </TabsTrigger>
          <TabsTrigger
            value="software"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Software
          </TabsTrigger>
          <TabsTrigger
            value="digital"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Digital Products
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <ProductFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedFilters={selectedFilters}
            updateFilters={updateFilters}
            resetFilters={resetFilters}
          />
        </div>

        {/* Products */}
        <div className="flex-1">
          {/* Active filters */}
          {(urlSearchQuery ||
            filter ||
            selectedFilters.platforms.length > 0 ||
            selectedFilters.genres.length > 0 ||
            selectedFilters.publishers.length > 0 ||
            priceRange[0] > 0 ||
            priceRange[1] < 100) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {urlSearchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {urlSearchQuery}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {filter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Filter: {filter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => (window.location.href = `/products`)} />
                </Badge>
              )}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-muted animate-pulse h-[300px] shimmer"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="text-sm text-muted-foreground mb-4">Showing {products.length} products</div>
              <ProductGrid products={products} />

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
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
              <Button onClick={resetFilters}>Reset all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

