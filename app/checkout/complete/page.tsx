"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, Copy, Download, ShoppingCart, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutCompletePage() {
  const { toast } = useToast()
  const [copiedCodes, setCopiedCodes] = useState({})
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load order data from localStorage
  useEffect(() => {
    const loadOrder = () => {
      try {
        const storedOrder = localStorage.getItem("zafago_current_order")
        if (storedOrder) {
          const parsedOrder = JSON.parse(storedOrder)
          setOrder(parsedOrder)
        } else {
          // If no order is found, redirect to products page
          window.location.href = "/products"
        }
      } catch (error) {
        console.error("Failed to parse order", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrder()
  }, [])

  // Generate redemption codes for purchased items
  const generateRedemptionCode = (productId) => {
    // In a real app, these would come from a database or API
    // Here we're generating random codes based on the product ID for demonstration
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let code = ""

    // Use the product ID to seed the random code generation
    const seed = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    // Generate a code in the format XXXX-XXXXX-XXXXX-XXXXX
    for (let i = 0; i < 19; i++) {
      if (i === 4 || i === 10 || i === 16) {
        code += "-"
      } else {
        const randomIndex = (seed * (i + 1)) % characters.length
        code += characters[randomIndex]
      }
    }

    return code
  }

  // Generate payment instructions based on payment method
  const getPaymentInstructions = () => {
    // In a real app, this would come from the order data
    // Here we're assuming the payment method for demonstration
    const paymentMethod = localStorage.getItem("zafago_payment_method") || "credit-card"

    switch (paymentMethod) {
      case "ovo":
        return "Your OVO payment has been processed successfully. You should receive a confirmation notification on your OVO app."
      case "gopay":
        return "Your GoPay payment has been processed successfully. You should receive a confirmation notification on your GoPay app."
      case "dana":
        return "Your DANA payment has been processed successfully. You should receive a confirmation notification on your DANA app."
      case "shopeepay":
        return "Your ShopeePay payment has been processed successfully. You should receive a confirmation notification on your ShopeePay app."
      case "bank-transfer":
        return "Your bank transfer has been confirmed. Thank you for your payment."
      case "qris":
        return "Your QRIS payment has been processed successfully. Thank you for your payment."
      default:
        return "Your payment has been processed successfully. Thank you for your purchase."
    }
  }

  // Generate redemption instructions based on platform
  const getRedemptionInstructions = (platform) => {
    switch (platform) {
      case "Steam":
        return "Redeem on Steam: Open Steam client, click 'Games' menu, select 'Activate a Product on Steam', and follow the instructions."
      case "Epic Games":
        return "Redeem on Epic Games Store: Open the Epic Games launcher, click on your account name, select 'Redeem Code', and enter your code."
      case "GOG":
        return "Redeem on GOG: Go to GOG.com, log in to your account, click on your username, select 'Redeem Code', and enter your code."
      case "Origin":
        return "Redeem on EA app: Open the EA app, click on your profile picture, select 'Redeem Product Code', and enter your code."
      case "Uplay":
        return "Redeem on Ubisoft Connect: Open Ubisoft Connect, click on the menu icon, select 'Activate a key', and enter your code."
      case "PlayStation":
        return "Redeem on PlayStation Store: Log in to your PlayStation account, go to the PlayStation Store, scroll down to 'Redeem Codes', and enter your code."
      case "Xbox":
        return "Redeem on Microsoft Store: Sign in to your Microsoft account, go to redeem.microsoft.com, enter your code, and follow the instructions."
      case "Windows":
        return "Visit the product's official website, sign in with your account, enter your product key, and follow the instructions to download and install."
      default:
        return "Visit the product's official website and follow the instructions to redeem your code."
    }
  }

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopiedCodes({ ...copiedCodes, [id]: true })

    toast({
      title: "Code copied",
      description: "The redemption code has been copied to your clipboard.",
    })

    // Reset the copied state after 3 seconds
    setTimeout(() => {
      setCopiedCodes((prev) => ({ ...prev, [id]: false }))
    }, 3000)
  }

  const handleDownloadCodes = () => {
    if (!order || !order.items) return

    // Create a text file with all codes
    const codesText = order.items
      .map((item) => {
        const code = generateRedemptionCode(item.id)
        const instructions = getRedemptionInstructions(item.platform)
        return `${item.title} (${item.platform}): ${code}\n${instructions}\n\n`
      })
      .join("")

    const blob = new Blob([codesText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `zafago-codes-${order.orderNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Codes downloaded",
      description: "Your redemption codes have been downloaded as a text file.",
    })
  }

  if (isLoading) {
    return (
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!order || !order.items || order.items.length === 0) {
    return (
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Order Found</h1>
          <p className="mb-6">We couldn't find any order details. Please try making a purchase first.</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Purchase!</h1>
        <p className="text-muted-foreground">
          Your order has been successfully processed and your digital codes are ready below.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold">Order #{order.orderNumber}</h2>
                <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground mt-1">{getPaymentInstructions()}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleDownloadCodes}>
                <Download className="mr-2 h-4 w-4" />
                Download All Codes
              </Button>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Your Digital Products</h3>

              {order.items.map((item) => {
                const code = generateRedemptionCode(item.id)
                const instructions = getRedemptionInstructions(item.platform)

                return (
                  <div key={item.id} className="bg-muted p-4 rounded-lg">
                    <div className="flex gap-4 items-start">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            item.image || `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(item.title)}`
                          }
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant="outline">{item.platform}</Badge>
                        </div>

                        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="bg-background border rounded-md px-3 py-2 font-mono text-sm flex-1">
                            {code}
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleCopyCode(code, item.id)}>
                            {copiedCodes[item.id] ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Code
                              </>
                            )}
                          </Button>
                        </div>

                        <div className="mt-2 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">How to redeem:</span> {instructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">What's Next?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your purchase details and redemption codes have also been sent to your email. If you have any issues with your
          codes, please contact our support team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild>
            <Link href="/products">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile">
              View Order History
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
