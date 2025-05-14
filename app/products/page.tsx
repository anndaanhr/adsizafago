"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
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
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
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
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const productsPerPage = 20

  // Get category from URL params
  const category = searchParams.get("category") || "all"
  const urlSearchQuery = searchParams.get("search") || ""
  const filter = searchParams.get("filter") || ""
  const page = Number.parseInt(searchParams.get("page") || "1", 10)

  useEffect(() => {
    // Set initial search query from URL
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery)
    }

    // Set initial active tab based on category
    if (category !== "all") {
      setActiveTab(category)
    }

    // Set initial page from URL
    if (page) {
      setCurrentPage(page)
    }
  }, [urlSearchQuery, category, page])

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    updateURL(1)
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

    // Reset to page 1 when filters change
    setCurrentPage(1)
    updateURL(1)
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
    setCurrentPage(1)
    updateURL(1)
  }

  // Filter products based on active tab, search query, and filters
  const filterProducts = () => {
    setLoading(true)

    // Filter products based on active tab and search query
    const filtered = mockProducts.filter((product) => {
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
    const sortedProducts = [...filtered]

    switch (sortOption) {
      case "newest":
        sortedProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        break
      case "price-low":
        sortedProducts.sort((a, b) => {
          const priceA = a.price - (a.price * a.discount) / 100
          const priceB = b.price - (b.price * b.discount) / 100
          return priceA - priceB
        })
        break
      case "price-high":
        sortedProducts.sort((a, b) => {
          const priceA = a.price - (a.price * a.discount) / 100
          const priceB = b.price - (b.price * b.discount) / 100
          return priceB - priceA
        })
        break
      case "bestselling":
        sortedProducts.sort((a, b) => b.sales - a.sales)
        break
      case "discount":
        sortedProducts.sort((a, b) => b.discount - a.discount)
        break
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating)
        break
      // Featured is default
      default:
        // Mix of bestselling, rating, and newness
        sortedProducts.sort((a, b) => {
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

    // Calculate total pages
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
    setTotalPages(totalPages)
    setFilteredProducts(sortedProducts)

    // Get current page products
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    setProducts(currentProducts)
    setLoading(false)
  }

  // Update URL with page parameter
  const updateURL = (page) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/products?${params.toString()}`, { scroll: false })
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    updateURL(page)
    // Scroll to top of product section
    document.getElementById("products-section").scrollIntoView({ behavior: "smooth" })
  }

  // Reset to page 1 when filters change (except when currentPage itself changes)
  useEffect(() => {
    setCurrentPage(1)
    updateURL(1)
    // We don't call filterProducts() here because the currentPage change will trigger the next useEffect
  }, [activeTab, sortOption, selectedFilters, priceRange, searchQuery])

  // Fetch products when page or filters change
  useEffect(() => {
    filterProducts()
  }, [activeTab, sortOption, selectedFilters, priceRange, currentPage, searchQuery])

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

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = []
    const maxVisiblePages = 5

    // Always show first page
    items.push(
      <Button
        key="page-1"
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        className={`h-8 w-8 p-0 ${currentPage === 1 ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </Button>,
    )

    // Calculate range of pages to show
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)

    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3) + 1)
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      items.push(
        <span key="ellipsis-1" className="px-2">
          ...
        </span>,
      )
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Button
          key={`page-${i}`}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          className={`h-8 w-8 p-0 ${currentPage === i ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>,
      )
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      items.push(
        <span key="ellipsis-2" className="px-2">
          ...
        </span>,
      )
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <Button
          key={`page-${totalPages}`}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          className={`h-8 w-8 p-0 ${currentPage === totalPages ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>,
      )
    }

    return items
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
        <div className="flex-1" id="products-section">
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
              <div className="text-sm text-muted-foreground mb-4">
                Showing {(currentPage - 1) * productsPerPage + 1}-
                {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </div>
              <ProductGrid products={products} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>

                  {generatePaginationItems()}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              )}
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
