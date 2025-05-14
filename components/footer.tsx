import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=32&width=32&text=Z"
                  alt="Zafago"
                  width={32}
                  height={32}
                  className="rounded bg-gradient-to-br from-brand-500 to-brand-600 text-white"
                />
              </div>
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
                Zafago
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for digital games, software, and gift cards at the best prices.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=games" className="text-muted-foreground hover:text-foreground">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/products?category=software" className="text-muted-foreground hover:text-foreground">
                  Software
                </Link>
              </li>
              <li>
                <Link href="/products?category=digital" className="text-muted-foreground hover:text-foreground">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-foreground">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/new-releases" className="text-muted-foreground hover:text-foreground">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="text-muted-foreground hover:text-foreground">
                  Coming Soon
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Platforms</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/platforms/steam" className="text-muted-foreground hover:text-foreground">
                  Steam
                </Link>
              </li>
              <li>
                <Link href="/platforms/epic" className="text-muted-foreground hover:text-foreground">
                  Epic Games
                </Link>
              </li>
              <li>
                <Link href="/platforms/origin" className="text-muted-foreground hover:text-foreground">
                  Origin
                </Link>
              </li>
              <li>
                <Link href="/platforms/uplay" className="text-muted-foreground hover:text-foreground">
                  Uplay
                </Link>
              </li>
              <li>
                <Link href="/platforms/gog" className="text-muted-foreground hover:text-foreground">
                  GOG
                </Link>
              </li>
              <li>
                <Link href="/platforms/xbox" className="text-muted-foreground hover:text-foreground">
                  Xbox
                </Link>
              </li>
              <li>
                <Link href="/platforms/playstation" className="text-muted-foreground hover:text-foreground">
                  PlayStation
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-foreground">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Zafago. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <Image
                src="/placeholder.svg?height=32&width=32&text=VISA"
                alt="Visa"
                width={32}
                height={20}
                className="h-5 w-auto"
              />
              <Image
                src="/placeholder.svg?height=32&width=32&text=MC"
                alt="Mastercard"
                width={32}
                height={20}
                className="h-5 w-auto"
              />
              <Image
                src="/placeholder.svg?height=32&width=32&text=AMEX"
                alt="American Express"
                width={32}
                height={20}
                className="h-5 w-auto"
              />
              <Image
                src="/placeholder.svg?height=32&width=32&text=PP"
                alt="PayPal"
                width={32}
                height={20}
                className="h-5 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
