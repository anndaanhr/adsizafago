"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Clock, Percent, Filter, Search, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SaleCountdown } from "@/components/sale-countdown"
import { ProductGrid } from "@/components/product-grid"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductFilters } from "@/components/product-filters"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { mockProducts } from "@/lib/mock-data"
import { useToast } from "@/components/ui/use-toast"

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortOption, setSortOption] = useState("discount-high")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedFilters, setSelectedFilters] = useState({
    platforms: [],
    genres: [],
    publishers: [],
  })
  const { toast } = useToast()

  // Mock active sales data
  const activeSales = [
    {
      id: "summer-sale",
      title: "Summer Sale",
      description: "Huge discounts on top games! Limited time only.",
      endDate: "2023-08-31",
      image: "/placeholder.svg?height=400&width=800&text=Summer+Sale",
      discount: "Up to 80% off",
      theme: "from-sale-red to-sale-orange",
    },
    {
      id: "publisher-week",
      title: "EA Publisher Week",
      description: "Special deals on all Electronic Arts titles",
      endDate: "2023-08-15",
      image: "/placeholder.svg?height=400&width=800&text=EA+Publisher+Week",
      discount: "Up to 70% off",
      theme: "from-blue-600 to-blue-400",
    },
    {
      id: "indie-spotlight",
      title: "Indie Spotlight",
      description: "Discover amazing indie games at incredible prices",
      endDate: "2023-08-20",
      image: "/placeholder.svg?height=400&width=800&text=Indie+Spotlight",
      discount: "Up to 65% off",
      theme: "from-purple-600 to-purple-400",
    },
  ]

  // Flash sales with countdown timers
  const [flashSales, setFlashSales] = useState([
    {
      id: "flash-1",
      title: "Flash Deal: Cyberpunk 2077",
      endTime: new Date(Date.now() + 3600000 * 5).toISOString(), // 5 hours from now
      discount: 75,
      image: "/images/cyberpunk.png",
      originalPrice: 59.99,
      currentPrice: 14.99,
    },
    {
      id: "flash-2",
      title: "Flash Deal: Microsoft Office 2023",
      endTime: new Date(Date.now() + 3600000 * 8).toISOString(), // 8 hours from now
      discount: 60,
      image: "/placeholder.svg?height=200&width=200&text=Office+2023",
      originalPrice: 149.99,
      currentPrice: 59.99,
    },
    {
      id: "flash-3",
      title: "Flash Deal: Adobe Creative Cloud",
      endTime: new Date(Date.now() + 3600000 * 3).toISOString(), // 3 hours from now
      discount: 50,
      image: "/placeholder.svg?height=200&width=200&text=Adobe+CC",
      originalPrice: 52.99,
      currentPrice: 26.49,
    },
  ])

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    filterProducts()
  }

  const addToCart = (product) => {
    try {
      // Get existing cart
      const existingCart = localStorage.getItem("zafago_cart")
      const cart = existingCart ? JSON.parse(existingCart) : []

      // Check if product already in cart
      const existingItemIndex = cart.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity += 1
      } else {
        // Add new item with quantity 1
        cart.push({
          ...product,
          quantity: 1,
        })
      }

      // Save to localStorage
      localStorage.setItem("zafago_cart", JSON.stringify(cart))

      // Trigger storage event for header to update cart count
      window.dispatchEvent(new Event("storage"))

      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Failed to add to cart", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Filter products based on active tab, search query, and filters
  const filterProducts = () => {
    setLoading(true)

    // Get products with discounts
    const discountedProducts = mockProducts
      .filter((product) => product.discount > 0)
      .sort((a, b) => b.discount - a.discount)

    // Apply filters
    const filteredProducts = discountedProducts.filter((product) => {
      // Filter by category if tab is not "all"
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

      return true
    })

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
    setSortOption("discount-high")
  }

  // Fetch products on initial load and when filters change
  useEffect(() => {
    filterProducts()
  }, [activeTab, sortOption, selectedFilters, priceRange])

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Deals", href: "/deals" },
        ]}
      />

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Special Deals & Offers</h1>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search deals..."
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
                <SheetDescription>Narrow down your deals search with these filters.</SheetDescription>
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
            placeholder="Search deals..."
            className="w-full pl-8 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Flash Sales Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Flash Sales</h2>
          <Badge variant="outline" className="bg-sale-red text-white border-sale-red px-3 py-1 text-xs">
            <Clock className="mr-1 h-3 w-3" /> Limited Time
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {flashSales.map((sale) => (
            <Card
              key={sale.id}
              className="overflow-hidden border-2 border-sale-red/20 hover:border-sale-red/40 transition-all"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-sale-red text-white border-0">{sale.discount}% OFF</Badge>
                  </div>
                  <div className="relative h-40 w-full">
                    <Image src={sale.image || "/placeholder.svg"} alt={sale.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">{sale.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${sale.currentPrice.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${sale.originalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-muted-foreground">
                        <SaleCountdown endDate={sale.endTime} className="text-sale-red font-medium" showTitle={false} />
                      </div>
                      <Button
                        size="sm"
                        className="bg-brand-500 hover:bg-brand-600 whitespace-nowrap"
                        onClick={(e) => {
                          e.stopPropagation()
                          const product = mockProducts.find((p) => p.title === sale.title.replace("Flash Deal: ", ""))
                          if (product) {
                            addToCart(product)
                          } else {
                            toast({
                              title: "Error",
                              description: "Product not found.",
                              variant: "destructive",
                            })
                          }
                        }}
                      >
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Sales Banners */}
      <div className="grid gap-6 mb-8">
        <h2 className="text-2xl font-bold">Seasonal Sales</h2>
        {activeSales.map((sale, index) => (
          <div
            key={sale.id}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${sale.theme} text-white`}
          >
            <div className="relative h-48 md:h-64 w-full">
              <Image src={sale.image || "/placeholder.svg"} alt={sale.title} fill className="object-cover opacity-20" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="space-y-2">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">{sale.discount}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold">{sale.title}</h2>
                  <p className="text-white/80 max-w-md">{sale.description}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <SaleCountdown
                    endDate={sale.endDate}
                    className="bg-black/20 backdrop-blur-sm rounded-lg p-2"
                    showTitle={false}
                  />
                  <Button asChild className="bg-white text-foreground hover:bg-white/90">
                    <Link href={`/deals/${sale.id}`}>View Deals</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deal Categories */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full justify-start overflow-auto py-1 px-0 bg-transparent">
          <TabsTrigger
            value="all"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Deals
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
          <TabsTrigger
            value="best"
            className="rounded-full data-[state=active]:bg-sale-red data-[state=active]:text-white"
          >
            <Percent className="mr-1 h-4 w-4" />
            Best Discounts
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-muted animate-pulse h-[300px] shimmer"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="text-sm text-muted-foreground mb-4">Showing {products.length} deals</div>
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
              <h3 className="text-lg font-medium mb-2">No deals found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
