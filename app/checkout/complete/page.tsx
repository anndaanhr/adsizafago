"use client"

import { useState } from "react"
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
  const [copiedCodes, setCopiedCodes] = useState<Record<string, boolean>>({})

  // Mock order data - in a real app, this would come from an API
  const orderNumber = "ZAF-" + Math.floor(100000 + Math.random() * 900000)
  const orderDate = new Date().toLocaleDateString()

  // Mock purchased items with redemption codes
  const purchasedItems = [
    {
      id: "1",
      title: "Elden Ring",
      image: "/placeholder.svg?height=100&width=100&text=Elden+Ring",
      platform: "Steam",
      code: "ELDR-5XTR2-9BNHJ-KL45P",
      instructions:
        "Redeem on Steam: Open Steam client, click 'Games' menu, select 'Activate a Product on Steam', and follow the instructions.",
    },
    {
      id: "2",
      title: "Microsoft Office 2023",
      image: "/placeholder.svg?height=100&width=100&text=Office+2023",
      platform: "Windows",
      code: "MSOF-X72KP-QR9TH-JM3WZ",
      instructions:
        "Visit office.com/setup, sign in with your Microsoft account, enter your product key, and follow the instructions to download and install.",
    },
    {
      id: "3",
      title: "Steam Wallet $50",
      image: "/placeholder.svg?height=100&width=100&text=Steam+Wallet",
      platform: "Steam",
      code: "STWL-7YHN2-XC4VB-9KL3M",
      instructions:
        "Redeem on Steam: Open Steam client, click on your username, select 'Account details', click 'Add funds to your Steam Wallet', select 'Redeem a Steam Gift Card or Wallet Code', and enter your code.",
    },
  ]

  const handleCopyCode = (code: string, id: string) => {
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
    // Create a text file with all codes
    const codesText = purchasedItems
      .map((item) => `${item.title} (${item.platform}): ${item.code}\n${item.instructions}\n\n`)
      .join("")

    const blob = new Blob([codesText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `zafago-codes-${orderNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Codes downloaded",
      description: "Your redemption codes have been downloaded as a text file.",
    })
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
                <h2 className="font-semibold">Order #{orderNumber}</h2>
                <p className="text-sm text-muted-foreground">Placed on {orderDate}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleDownloadCodes}>
                <Download className="mr-2 h-4 w-4" />
                Download All Codes
              </Button>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Your Digital Products</h3>

              {purchasedItems.map((item) => (
                <div key={item.id} className="bg-muted p-4 rounded-lg">
                  <div className="flex gap-4 items-start">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge variant="outline">{item.platform}</Badge>
                      </div>

                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                        <div className="bg-background border rounded-md px-3 py-2 font-mono text-sm flex-1">
                          {item.code}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleCopyCode(item.code, item.id)}>
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
                          <span className="font-medium">How to redeem:</span> {item.instructions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            <Link href="/account/orders">
              View Order History
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

