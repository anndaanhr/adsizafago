import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6">
        {/* Newsletter Section */}
        <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-brand-600/10 to-brand-400/10 border border-brand-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground max-w-md">
                Subscribe to our newsletter for exclusive deals, new releases, and gaming news.
              </p>
            </div>
            <div className="flex w-full max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="Enter your email" className="pl-10 rounded-r-none border-r-0" />
              </div>
              <Button className="rounded-l-none">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/placeholder.svg?height=32&width=32&text=Z"
                alt="Zafago"
                width={32}
                height={32}
                className="rounded bg-gradient-to-br from-brand-500 to-brand-600 text-white"
              />
              <span className="font-bold">Zafago</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for digital games, software, and more. Get instant delivery of activation codes.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-brand-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-brand-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-brand-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-brand-500 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Products</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/products?category=games"
                className="text-sm text-muted-foreground hover:text-brand-500 transition-colors"
              >
                Games
              </Link>
              <Link
                href="/products?category=software"
                className="text-sm text-muted-foreground hover:text-brand-500 transition-colors"
              >
                Software
              </Link>
              <Link
                href="/products?category=wallet"
                className="text-sm text-muted-foreground hover:text-brand-500 transition-colors"
              >
                Gift Cards
              </Link>
              <Link
                href="/products?category=subscription"
                className="text-sm text-muted-foreground hover:text-brand-500 transition-colors"
              >
                Subscriptions
              </Link>
              <Link
                href="/products?category=currency"
                className="text-sm text-muted-foreground hover:text-brand-500 transition-colors"
              >
                In-game Currency
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                About Us
              </Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Careers
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Blog
              </Link>
              <Link href="/press" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Press
              </Link>
              <Link href="/publishers" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Publishers
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Support</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/help" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Contact Us
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                FAQs
              </Link>
              <Link href="/redeem" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                How to Redeem
              </Link>
              <Link href="/refund" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Refund Policy
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Cookies Policy
              </Link>
              <Link href="/licenses" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Licenses
              </Link>
              <Link href="/security" className="text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                Security
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Zafago. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Image src="/placeholder.svg?height=30&width=40&text=Visa" alt="Visa" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40&text=MC" alt="Mastercard" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40&text=PayPal" alt="PayPal" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40&text=BTC" alt="Bitcoin" width={40} height={30} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

