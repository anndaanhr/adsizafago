"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CreditCard, ArrowRight, ShieldCheck, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CheckoutPage() {
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  // Mock cart items - in a real app, this would come from a cart state or API
  const cartItems = [
    {
      id: "1",
      title: "Elden Ring",
      image: "/placeholder.svg?height=100&width=100&text=Elden+Ring",
      price: 59.99,
      discount: 15,
      platform: "Steam",
      quantity: 1,
    },
    {
      id: "2",
      title: "Microsoft Office 2023",
      image: "/placeholder.svg?height=100&width=100&text=Office+2023",
      price: 149.99,
      discount: 20,
      platform: "Windows",
      quantity: 1,
    },
    {
      id: "3",
      title: "Steam Wallet $50",
      image: "/placeholder.svg?height=100&width=100&text=Steam+Wallet",
      price: 50.0,
      discount: 0,
      platform: "Steam",
      quantity: 1,
    },
  ]

  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price
    return total + itemPrice * item.quantity
  }, 0)

  const shipping = subtotal > 0 ? 4.99 : 0
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Account Information */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
                <p className="text-xs text-muted-foreground">Your digital codes will be sent to this email address</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input id="phone" type="tel" placeholder="(123) 456-7890" />
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                <Input id="address2" placeholder="Apt 4B" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select defaultValue="NY">
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="10001" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="US">
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <RadioGroup defaultValue="credit-card" value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-5 w-5" />
                  Credit / Debit Card
                </Label>
              </div>

              {paymentMethod === "credit-card" && (
                <div className="grid gap-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiration Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-on-card">Name on Card</Label>
                    <Input id="name-on-card" placeholder="John Doe" />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2 border rounded-md p-4 mt-3">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="cursor-pointer flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.5 8.25H4.5C3.67157 8.25 3 8.92157 3 9.75V18.75C3 19.5784 3.67157 20.25 4.5 20.25H19.5C20.3284 20.25 21 19.5784 21 18.75V9.75C21 8.92157 20.3284 8.25 19.5 8.25Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 15.75C7.5 15.75 8.25 15 9.75 15C11.25 15 12.75 16.5 14.25 16.5C15.75 16.5 16.5 15.75 16.5 15.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 8.25V6C16.5 4.34315 15.1569 3 13.5 3H6C4.34315 3 3 4.34315 3 6V8.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  PayPal
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-md p-4 mt-3">
                <RadioGroupItem value="crypto" id="crypto" />
                <Label htmlFor="crypto" className="cursor-pointer flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.5 2C9.5 2 10.5 3 12 3C13.5 3 14.5 2 14.5 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 22C9.5 22 10.5 21 12 21C13.5 21 14.5 22 14.5 22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 3.33782C4.40832 4.95683 2.75 7.73128 2.75 10.9C2.75 12.6175 3.67 14.0974 4.36 15.1174C4.79714 15.7638 5.18429 16.4102 5.52143 17.0566C5.89 17.7566 6.14429 18.4566 6.28571 19.1566C6.42714 19.8566 6.5 20.5566 6.5 21.2566"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 3.33782C19.5917 4.95683 21.25 7.73128 21.25 10.9C21.25 12.6175 20.33 14.0974 19.64 15.1174C19.2029 15.7638 18.8157 16.4102 18.4786 17.0566C18.11 17.7566 17.8557 18.4566 17.7143 19.1566C17.5729 19.8566 17.5 20.5566 17.5 21.2566"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12V16.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Cryptocurrency
                </Label>
              </div>
            </RadioGroup>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <p>Your payment information is secure and encrypted</p>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-20">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <Accordion type="single" collapsible defaultValue="items">
                  <AccordionItem value="items" className="border-none">
                    <AccordionTrigger className="py-2">{cartItems.length} items</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {cartItems.map((item) => {
                          const discountedPrice = item.discount
                            ? (item.price - (item.price * item.discount) / 100).toFixed(2)
                            : item.price.toFixed(2)

                          return (
                            <div key={item.id} className="flex gap-4">
                              <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                  {item.quantity}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">{item.title}</h4>
                                <div className="flex items-center gap-1 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {item.platform}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-sm font-medium">
                                ${discountedPrice}
                                {item.discount > 0 && (
                                  <span className="ml-2 text-xs text-muted-foreground line-through">
                                    ${item.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Items ({cartItems.reduce((count, item) => count + item.quantity, 0)})
                    </span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />
                  <div className="flex items-center justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout/complete">
                        Complete Order
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      You will receive your codes immediately after payment
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

