"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  LogIn,
  Package,
  Settings,
  LogOut,
  Bell,
  Moon,
  Sun,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, login, logout } = useAuth()
  const [cartItems, setCartItems] = useState([])

  // Get cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("zafago_cart")
    if (storedCart) {
      try {
        const items = JSON.parse(storedCart)
        setCartItems(items)
      } catch (error) {
        console.error("Failed to parse cart", error)
      }
    }
  }, [])

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    // Navigate to search results
    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
  }

  // Calculate cart item count
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const mainNavItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Deals", href: "/deals" },
    { label: "Publishers", href: "/publishers" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <Image
                src="/placeholder.svg?height=32&width=32&text=Z"
                alt="Zafago"
                width={32}
                height={32}
                className="rounded bg-gradient-to-br from-brand-500 to-brand-600 text-white"
              />
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-white/20 rotate-45 transform translate-x-0 transition-transform duration-1000 animate-[spin_3s_linear_infinite]"></div>
            </div>
            <span className="hidden font-bold sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
              Zafago
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? "text-foreground animated-underline after:bg-brand-500 after:h-0.5 after:w-full"
                    : "text-muted-foreground hover:text-foreground animated-underline"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex relative">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] lg:w-[300px] pl-8 rounded-full bg-muted/50 focus:bg-background transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover-lift"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative hover-lift">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover-lift">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-brand-500 text-white">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover-lift">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="flex items-center cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist" className="flex items-center cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/notifications" className="flex items-center cursor-pointer">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                      <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-brand-500 text-white">
                        3
                      </Badge>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild className="hover-lift">
                <Link href="/login">
                  <LogIn className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Link>
              </Button>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 py-4">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                    <Image
                      src="/placeholder.svg?height=32&width=32&text=Z"
                      alt="Zafago"
                      width={32}
                      height={32}
                      className="rounded bg-gradient-to-br from-brand-500 to-brand-600 text-white"
                    />
                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
                      Zafago
                    </span>
                  </Link>
                  <div className="relative">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full pl-8 rounded-full bg-muted/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {mainNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`font-medium ${
                          pathname === item.href ? "text-foreground" : "text-muted-foreground"
                        } hover:text-foreground`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="space-y-2 pt-4">
                    {user ? (
                      <>
                        <div className="font-medium">My Account</div>
                        <div className="pl-4 border-l space-y-2">
                          <Link
                            href="/account"
                            className="flex items-center text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/account/orders"
                            className="flex items-center text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Package className="mr-2 h-4 w-4" />
                            <span>Orders</span>
                          </Link>
                          <Link
                            href="/account/wishlist"
                            className="flex items-center text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Heart className="mr-2 h-4 w-4" />
                            <span>Wishlist</span>
                          </Link>
                          <Link
                            href="/account/settings"
                            className="flex items-center text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                          <button
                            className="flex items-center text-muted-foreground hover:text-foreground w-full text-left"
                            onClick={() => {
                              logout()
                              setMobileMenuOpen(false)
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <Button asChild className="w-full bg-brand-500 hover:bg-brand-600">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                          <LogIn className="mr-2 h-4 w-4" />
                          <span>Login / Register</span>
                        </Link>
                      </Button>
                    )}
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Switch theme</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme("light")}
                        className={theme === "light" ? "border-brand-500 text-brand-500" : ""}
                      >
                        <Sun className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme("dark")}
                        className={theme === "dark" ? "border-brand-500 text-brand-500" : ""}
                      >
                        <Moon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

