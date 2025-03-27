"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ShoppingCart,
  Heart,
  Search,
  ChevronDown,
  Globe,
  User,
  Menu,
  X,
  Star,
  TruckIcon,
  ShieldCheck,
  Clock,
  CreditCard,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function PetStore() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Dog Food",
      image: "/placeholder.svg?height=300&width=300",
      price: 49.99,
      offerPrice: 39.99,
      category: "Food",
    },
    {
      id: 2,
      name: "Comfortable Dog Bed",
      image: "/placeholder.svg?height=300&width=300",
      price: 89.99,
      offerPrice: 69.99,
      category: "Accessories",
    },
    {
      id: 3,
      name: "Interactive Dog Toy",
      image: "/placeholder.svg?height=300&width=300",
      price: 24.99,
      offerPrice: 19.99,
      category: "Toys",
    },
    {
      id: 4,
      name: "Dog Grooming Kit",
      image: "/placeholder.svg?height=300&width=300",
      price: 34.99,
      offerPrice: 29.99,
      category: "Grooming",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "My dog absolutely loves the premium food I purchased from PetDo. The quality is exceptional and delivery was super fast!",
    },
    {
      id: 2,
      name: "Michael Brown",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The dog bed I bought is amazing quality. My furry friend hasn't left it since it arrived. Great customer service too!",
    },
    {
      id: 3,
      name: "Emily Davis",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4,
      text: "The interactive toys keep my puppy entertained for hours. Definitely coming back for more products!",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="PetDo Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold">PetDo</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
                Shop
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  Categories <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/category/food" className="w-full">
                      Food
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/accessories" className="w-full">
                      Accessories
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/toys" className="w-full">
                      Toys
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/grooming" className="w-full">
                      Grooming
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] pl-8 md:w-[250px] rounded-full bg-muted"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
              <span className="sr-only">Sign In</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
              <span className="sr-only">Cart</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4 bg-background">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full pl-8 rounded-full bg-muted" />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
                Shop
              </Link>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium transition-colors hover:text-primary">
                  Categories <ChevronDown className="h-4 w-4" />
                </summary>
                <nav className="mt-2 ml-4 flex flex-col space-y-2">
                  <Link href="/category/food" className="text-sm transition-colors hover:text-primary">
                    Food
                  </Link>
                  <Link href="/category/accessories" className="text-sm transition-colors hover:text-primary">
                    Accessories
                  </Link>
                  <Link href="/category/toys" className="text-sm transition-colors hover:text-primary">
                    Toys
                  </Link>
                  <Link href="/category/grooming" className="text-sm transition-colors hover:text-primary">
                    Grooming
                  </Link>
                </nav>
              </details>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative">
          <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Everything Your Dog Needs in One Place
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Premium quality products for your furry friends. From nutritious food to comfortable accessories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="font-medium">
                    Shop Now
                  </Button>
                  <Button size="lg" variant="outline" className="font-medium">
                    View Deals
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Happy dog"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {["Food", "Accessories", "Toys", "Grooming"].map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg bg-background shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=${category}`}
                      alt={category}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 w-full p-4">
                      <h3 className="text-lg font-semibold text-white">{category}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-background">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to wishlist</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Quick view</span>
                      </Button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Button className="mx-auto">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-center">
                    <Badge variant="outline" className="mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex justify-center gap-2">
                      <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                      <span className="font-medium text-primary">${product.offerPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </div>
          </div>
        </section>

        {/* Why Our Store */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Why Choose PetDo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <TruckIcon className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
                  <p className="text-muted-foreground">
                    On orders over $50. Get your pet supplies delivered to your doorstep.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <ShieldCheck className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
                  <p className="text-muted-foreground">
                    All our products are carefully selected for quality and safety.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Clock className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    Our customer service team is available around the clock to help you.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <CreditCard className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
                  <p className="text-muted-foreground">
                    Multiple secure payment options for your convenience and safety.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Join Our Newsletter</h2>
              <p className="max-w-[600px] text-primary-foreground/90 md:text-lg">
                Subscribe to get special offers, free giveaways, and pet care tips.
              </p>
              <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
                <Input type="email" placeholder="Enter your email" className="bg-primary-foreground text-foreground" />
                <Button variant="secondary">Subscribe</Button>
              </div>
              <p className="text-xs text-primary-foreground/70">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="PetDo Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl font-bold">PetDo</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your one-stop shop for all pet needs. Quality products for your furry friends.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Shop</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Dog Food
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Accessories
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Toys
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Grooming
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Press
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Support</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Returns & Refunds
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Delivery Information
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contact</h3>
              <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <p>123 Pet Street, Dogville</p>
                <p>New York, NY 10001</p>
                <p>Email: info@petdo.com</p>
                <p>Phone: (123) 456-7890</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} PetDo. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Cookies Policy
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/placeholder.svg?height=30&width=40&text=Visa" alt="Visa" width={40} height={30} />
                <Image src="/placeholder.svg?height=30&width=40&text=MC" alt="Mastercard" width={40} height={30} />
                <Image src="/placeholder.svg?height=30&width=40&text=PayPal" alt="PayPal" width={40} height={30} />
                <Image
                  src="/placeholder.svg?height=30&width=40&text=Amex"
                  alt="American Express"
                  width={40}
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

