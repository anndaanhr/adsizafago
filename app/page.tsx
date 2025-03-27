import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/hero-carousel"
import { ProductGrid } from "@/components/product-grid"
import { CategoryShowcase } from "@/components/category-showcase"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { FeaturedPublishers } from "@/components/featured-publishers"
import { TrendingGames } from "@/components/trending-games"
import { UpcomingReleases } from "@/components/upcoming-releases"
import { SaleCountdown } from "@/components/sale-countdown"

export default function HomePage() {
  // Featured products for the hero carousel
  const featuredProducts = [
    {
      id: "1",
      title: "Elden Ring",
      image: "/placeholder.svg?height=600&width=1200&text=Elden+Ring",
      price: 59.99,
      discount: 15,
      platform: "Steam",
      category: "games",
      description:
        "Embark on an epic adventure in a vast, seamless world filled with incredible challenges and discovery.",
    },
    {
      id: "2",
      title: "Cyberpunk 2077",
      image: "/placeholder.svg?height=600&width=1200&text=Cyberpunk+2077",
      price: 49.99,
      discount: 30,
      platform: "Epic Games",
      category: "games",
      description:
        "Become a cyberpunk, an urban mercenary equipped with cybernetic enhancements in a dystopian future.",
    },
    {
      id: "3",
      title: "Microsoft Office 2023",
      image: "/placeholder.svg?height=600&width=1200&text=Microsoft+Office+2023",
      price: 149.99,
      discount: 20,
      platform: "Windows",
      category: "software",
      description: "Boost your productivity with the latest suite of Microsoft Office applications.",
    },
  ]

  // New releases section
  const newReleases = [
    {
      id: "4",
      title: "Starfield",
      image: "/placeholder.svg?height=300&width=300&text=Starfield",
      price: 69.99,
      platform: "Steam",
      category: "games",
      releaseDate: "2023-09-06",
      rating: 4.5,
    },
    {
      id: "5",
      title: "Diablo IV",
      image: "/placeholder.svg?height=300&width=300&text=Diablo+IV",
      price: 59.99,
      platform: "Battle.net",
      category: "games",
      releaseDate: "2023-06-06",
      rating: 4.7,
    },
    {
      id: "6",
      title: "Baldur's Gate 3",
      image: "/placeholder.svg?height=300&width=300&text=Baldur's+Gate+3",
      price: 59.99,
      platform: "Steam",
      category: "games",
      releaseDate: "2023-08-03",
      rating: 4.9,
    },
    {
      id: "7",
      title: "Hogwarts Legacy",
      image: "/placeholder.svg?height=300&width=300&text=Hogwarts+Legacy",
      price: 49.99,
      platform: "Epic Games",
      category: "games",
      releaseDate: "2023-02-10",
      rating: 4.6,
    },
  ]

  // Top selling section
  const topSelling = [
    {
      id: "8",
      title: "Grand Theft Auto V",
      image: "/placeholder.svg?height=300&width=300&text=GTA+V",
      price: 29.99,
      platform: "Steam",
      category: "games",
      soldCount: 12500,
      rating: 4.8,
    },
    {
      id: "9",
      title: "Minecraft",
      image: "/placeholder.svg?height=300&width=300&text=Minecraft",
      price: 26.99,
      platform: "Java Edition",
      category: "games",
      soldCount: 10800,
      rating: 4.9,
    },
    {
      id: "10",
      title: "FIFA 23",
      image: "/placeholder.svg?height=300&width=300&text=FIFA+23",
      price: 59.99,
      platform: "Origin",
      category: "games",
      soldCount: 9200,
      rating: 4.3,
    },
    {
      id: "11",
      title: "Red Dead Redemption 2",
      image: "/placeholder.svg?height=300&width=300&text=RDR2",
      price: 39.99,
      platform: "Epic Games",
      category: "games",
      soldCount: 8700,
      rating: 4.9,
    },
  ]

  // Digital products section
  const digitalProducts = [
    {
      id: "12",
      title: "Steam Wallet $50",
      image: "/placeholder.svg?height=300&width=300&text=Steam+Wallet",
      price: 50.0,
      platform: "Steam",
      category: "wallet",
    },
    {
      id: "13",
      title: "PlayStation Store $25",
      image: "/placeholder.svg?height=300&width=300&text=PS+Store",
      price: 25.0,
      platform: "PlayStation",
      category: "wallet",
    },
    {
      id: "14",
      title: "Xbox Game Pass Ultimate (3 Months)",
      image: "/placeholder.svg?height=300&width=300&text=Xbox+Game+Pass",
      price: 44.99,
      platform: "Xbox",
      category: "subscription",
    },
    {
      id: "15",
      title: "Roblox 2200 Robux",
      image: "/placeholder.svg?height=300&width=300&text=Roblox",
      price: 24.99,
      platform: "Roblox",
      category: "currency",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <section className="w-full">
        <HeroCarousel items={featuredProducts} />
      </section>

      {/* Summer Sale Banner */}
      <section className="py-6 bg-gradient-sale">
        <div className="container">
          <SaleCountdown
            title="Summer Sale"
            description="Huge discounts on top games! Limited time only."
            endDate="2023-08-31"
          />
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
            Explore Categories
          </span>
        </h2>
        <CategoryShowcase />
      </section>

      {/* Trending Games */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
            <Button variant="link" asChild className="group">
              <Link href="/products?sort=trending" className="flex items-center text-brand-600">
                View all
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <TrendingGames />
        </div>
      </section>

      {/* New Releases */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">New Releases</h2>
          <Button variant="link" asChild className="group">
            <Link href="/products?sort=newest" className="flex items-center text-brand-600">
              View all
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <ProductGrid products={newReleases} />
      </section>

      {/* Featured Publishers */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Featured Publishers</h2>
            <Button variant="link" asChild className="group">
              <Link href="/publishers" className="flex items-center text-brand-600">
                View all publishers
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <FeaturedPublishers />
        </div>
      </section>

      {/* Top Selling */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Top Selling</h2>
          <Button variant="link" asChild className="group">
            <Link href="/products?sort=bestselling" className="flex items-center text-brand-600">
              View all
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <ProductGrid products={topSelling} />
      </section>

      {/* Upcoming Releases */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Upcoming Releases</h2>
            <Button variant="link" asChild className="group">
              <Link href="/products?filter=upcoming" className="flex items-center text-brand-600">
                View all
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <UpcomingReleases />
        </div>
      </section>

      {/* Digital Products */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Digital Products</h2>
          <Button variant="link" asChild className="group">
            <Link href="/products?category=digital" className="flex items-center text-brand-600">
              View all
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <ProductGrid products={digitalProducts} />
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-gradient-to-r from-brand-600 to-brand-500 text-white">
        <div className="container">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  )
}

