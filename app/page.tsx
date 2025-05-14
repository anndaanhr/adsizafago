"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/hero-carousel"
import { ProductGrid } from "@/components/product-grid"
import { CategoryShowcase } from "@/components/category-showcase"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { TrendingGames } from "@/components/trending-games"
import { UpcomingReleases } from "@/components/upcoming-releases"
import { Card, CardContent } from "@/components/ui/card"
import { mockProducts, mockPublishers } from "@/lib/mock-data"

export default function HomePage() {
  // Get featured products from the centralized data source
  const featuredProducts = [
    mockProducts.find((p) => p.id === "game-1"), // Elden Ring
    mockProducts.find((p) => p.id === "game-2"), // Cyberpunk 2077
    mockProducts.find((p) => p.id === "software-1"), // Microsoft Office
  ].filter(Boolean)

  // Get new releases from the centralized data source
  const newReleases = mockProducts
    .filter((p) => new Date(p.releaseDate) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000))
    .slice(0, 4)

  // Get top selling products from the centralized data source
  const topSelling = mockProducts.sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 4)

  // Get digital products from the centralized data source
  const digitalProducts = mockProducts.filter((p) => p.category === "digital").slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <section className="w-full">
        <HeroCarousel items={featuredProducts} />
      </section>

      {/* Summer Sale Banner - SMALLER VERSION */}
      <section className="container mx-auto my-8">
        <div className="relative overflow-hidden rounded-lg">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 md:p-6">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="inline-block bg-white dark:bg-black px-3 py-1 rounded-full mb-2 animate-pulse">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Limited Time Offer</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Summer Sale</h2>
                <p className="text-sm md:text-base text-white/90 max-w-md">Up to 75% off on selected titles!</p>
              </div>
              <div className="flex gap-3">
                <Button
                  size="sm"
                  asChild
                  className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800"
                >
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button size="sm" asChild className="bg-black/50 hover:bg-black/70 text-white border-2 border-white">
                  <Link href="/deals">View Deals</Link>
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="container py-8">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
            Explore Categories
          </span>
        </h2>
        <CategoryShowcase />
      </section>

      {/* Trending Games */}
      <section className="py-8 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
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
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
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
      <section className="py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Publishers</h2>
            <Button variant="link" size="sm" asChild>
              <Link href="/publishers">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockPublishers.slice(0, 6).map((publisher) => (
              <Link key={publisher.id} href={`/publishers/${publisher.id}`}>
                <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <div className="relative w-16 h-16 mb-3">
                      <Image
                        src={publisher.logo || `/placeholder.svg?height=64&width=64&text=${publisher.name[0]}`}
                        alt={publisher.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-medium text-sm">{publisher.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
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
      <section className="py-8 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
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
      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
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
      <section className="py-8 bg-gradient-to-r from-brand-600 to-brand-500 text-white">
        <div className="container">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  )
}
