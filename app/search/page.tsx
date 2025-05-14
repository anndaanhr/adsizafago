"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SearchIcon, Filter, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Breadcrumb } from "@/components/breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProducts } from "@/lib/mock-data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortOption, setSortOption] = useState("relevance")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState(query)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    setShowSuggestions(false)
    filterProducts()
  }

  // Generate search suggestions
  const generateSuggestions = (input) => {
    if (!input || input.length < 2) {
      setSuggestions([])
      return
    }

    const allTerms = mockProducts.flatMap((product) => [product.title, product.publisher, ...product.genres])

    const uniqueTerms = [...new Set(allTerms)]
    const matchingTerms = uniqueTerms.filter((term) => term.toLowerCase().includes(input.toLowerCase())).slice(0, 5)

    setSuggestions(matchingTerms)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    generateSuggestions(value)
    setShowSuggestions(true)
  }

  // Select suggestion
  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    // Trigger search with the selected suggestion
    setTimeout(() => filterProducts(), 0)
  }

  // Filter products based on search query
  const filterProducts = () => {
    setLoading(true)

    // Filter products based on search query
    let filteredProducts = mockProducts.filter((product) => {
      // If no search query, return all products
      if (!searchQuery) return true

      // Search in title, description, publisher, and genres
      const searchIn = [product.title, product.description, product.publisher, ...product.genres].map((item) =>
        item?.toLowerCase(),
      )

      return searchIn.some((text) => text?.includes(searchQuery.toLowerCase()))
    })

    // Filter by category/tab
    if (activeTab !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category === activeTab)
    }

    // Sort products
    switch (sortOption) {
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
      case "discount":
        filteredProducts.sort((a, b) => b.discount - a.discount)
        break
      // Relevance is default
      default:
        // For relevance, we prioritize exact matches in title, then partial matches
        filteredProducts.sort((a, b) => {
          const titleA = a.title.toLowerCase()
          const titleB = b.title.toLowerCase()
          const query = searchQuery.toLowerCase()

          // Exact title match gets highest priority
          if (titleA === query && titleB !== query) return -1
          if (titleB === query && titleA !== query) return 1

          // Title starts with query gets next priority
          if (titleA.startsWith(query) && !titleB.startsWith(query)) return -1
          if (titleB.startsWith(query) && !titleA.startsWith(query)) return 1

          // Title contains query gets next priority
          const aContains = titleA.includes(query)
          const bContains = titleB.includes(query)
          if (aContains && !bContains) return -1
          if (bContains && !aContains) return 1

          // Fall back to bestselling
          return b.sales - a.sales
        })
    }

    setProducts(filteredProducts)
    setLoading(false)
  }

  // Initial search on page load
  useEffect(() => {
    if (query) {
      setSearchQuery(query)
      filterProducts()
    }
  }, [query])

  // Update search results when tab or sort option changes
  useEffect(() => {
    if (searchQuery) {
      filterProducts()
    }
  }, [activeTab, sortOption])

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Search", href: "/search" },
          searchQuery ? { label: `"${searchQuery}"`, href: `/search?q=${encodeURIComponent(searchQuery)}` } : null,
        ].filter(Boolean)}
      />

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {searchQuery ? `Search results for "${searchQuery}"` : "Search"}
        </h1>

        <div className="flex items-center gap-2">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="bestselling">Best Selling</SelectItem>
              <SelectItem value="discount">Biggest Discount</SelectItem>
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
                <SheetDescription>Narrow down your search results with these filters.</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <ProductFilters isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <form onSubmit={handleSearch} className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for games, software, publishers..."
            className="w-full pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-500 hover:bg-brand-600">
            Search
          </Button>
        </form>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-background border rounded-md mt-1 shadow-lg">
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-muted cursor-pointer"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  <div className="flex items-center">
                    <SearchIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{suggestion}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full justify-start overflow-auto py-1 px-0 bg-transparent">
          <TabsTrigger
            value="all"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Results
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
              <div className="text-sm text-muted-foreground mb-4">
                Showing {products.length} results for "{searchQuery}"
              </div>
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
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any products matching your search. Try adjusting your search terms or filters.
              </p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
