"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
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
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function CheckoutPage() {
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      // Store the current path to redirect back after login
      localStorage.setItem("zafago_redirect_after_login", "/checkout")
      // Redirect to login page
      router.push("/login")
      return
    }

    // Load cart items if user is logged in
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem("zafago_cart")
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart)
          setCartItems(parsedCart)
        }
      } catch (error) {
        console.error("Failed to parse cart", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [user, router])

  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price
    return total + itemPrice * item.quantity
  }, 0)

  const shipping = subtotal > 0 ? 4.99 : 0
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  // Handle form submission
  const handleCheckout = (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    // Store order in localStorage for the complete page to access
    const order = {
      items: cartItems,
      subtotal,
      shipping,
      tax,
      total,
      date: new Date().toISOString(),
      orderNumber: "ZAF-" + Math.floor(100000 + Math.random() * 900000),
    }
    localStorage.setItem("zafago_current_order", JSON.stringify(order))

    // If user is logged in, add to their order history
    if (user) {
      try {
        // Get existing users
        const storedUsers = localStorage.getItem("zafago_users")
        if (storedUsers) {
          const users = JSON.parse(storedUsers)
          const userIndex = users.findIndex((u) => u.id === user.id)

          if (userIndex !== -1) {
            // Add order to user's orders
            const newOrder = {
              id: order.orderNumber,
              date: order.date,
              total: order.total,
              status: "completed",
              items: cartItems.map((item) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                discount: item.discount,
                platform: item.platform,
                quantity: item.quantity,
              })),
            }

            if (!users[userIndex].orders) {
              users[userIndex].orders = []
            }

            users[userIndex].orders.push(newOrder)
            localStorage.setItem("zafago_users", JSON.stringify(users))

            // Update current user
            const updatedUser = { ...user }
            if (!updatedUser.orders) {
              updatedUser.orders = []
            }
            updatedUser.orders.push(newOrder)
            localStorage.setItem("zafago_user", JSON.stringify(updatedUser))
          }
        }
      } catch (error) {
        console.error("Failed to update order history", error)
      }
    }

    // Clear the cart
    localStorage.setItem("zafago_cart", JSON.stringify([]))

    // Store the payment method for the complete page
    localStorage.setItem("zafago_payment_method", paymentMethod)

    // Redirect to complete page
    window.location.href = "/checkout/complete"
  }

  // If not logged in, the useEffect will handle redirection
  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleCheckout}>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Account Information */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" required defaultValue={user?.name?.split(" ")[0] || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required defaultValue={user?.name?.split(" ")[1] || ""} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                    defaultValue={user?.email || ""}
                  />
                  <p className="text-xs text-muted-foreground">Your digital codes will be sent to this email address</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                </div>
              </div>
            </div>

            {/* Rest of the checkout form remains the same */}
            {/* Billing Information */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                  <Input id="address2" placeholder="Apt 4B" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select defaultValue="LA">
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LA">Lampung</SelectItem>
                        <SelectItem value="JK">Jakarta</SelectItem>
                        <SelectItem value="JB">West Java</SelectItem>
                        <SelectItem value="JT">Central Java</SelectItem>
                        <SelectItem value="JI">East Java</SelectItem>
                        <SelectItem value="YO">Yogyakarta</SelectItem>
                        <SelectItem value="BA">Bali</SelectItem>
                        <SelectItem value="SU">North Sumatra</SelectItem>
                        <SelectItem value="SS">South Sumatra</SelectItem>
                        <SelectItem value="KS">South Kalimantan</SelectItem>
                        <SelectItem value="KT">East Kalimantan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="ID">
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ID">Indonesia</SelectItem>
                      <SelectItem value="MY">Malaysia</SelectItem>
                      <SelectItem value="SG">Singapore</SelectItem>
                      <SelectItem value="TH">Thailand</SelectItem>
                      <SelectItem value="PH">Philippines</SelectItem>
                      <SelectItem value="VN">Vietnam</SelectItem>
                      <SelectItem value="MM">Myanmar</SelectItem>
                      <SelectItem value="LA">Laos</SelectItem>
                      <SelectItem value="KH">Cambodia</SelectItem>
                      <SelectItem value="BN">Brunei</SelectItem>
                      <SelectItem value="TL">Timor-Leste</SelectItem>
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
                      <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" placeholder="John Doe" required />
                    </div>
                  </div>
                )}

                {/* OVO Payment Method */}
                <div className="flex items-center space-x-2 border rounded-md p-4 mt-3">
                  <RadioGroupItem value="ovo" id="ovo" />
                  <Label htmlFor="ovo" className="cursor-pointer flex items-center gap-2">
                    <div className="flex items-center justify-center h-5 w-5 bg-purple-600 text-white rounded-sm font-bold text-xs">
                      OVO
                    </div>
                    OVO
                  </Label>
                </div>

                {paymentMethod === "ovo" && (
                  <div className="grid gap-4 pl-6 mt-3">
                    <div className="space-y-2">
                      <Label htmlFor="ovo-number">OVO Phone Number</Label>
                      <Input id="ovo-number" placeholder="08123456789" required />
                      <p className="text-xs text-muted-foreground">
                        Enter the phone number registered with your OVO account
                      </p>
                    </div>
                  </div>
                )}

                {/* GoPay Payment Method */}
                <div className="flex items-center space-x-2 border rounded-md p-4 mt-3">
                  <RadioGroupItem value="gopay" id="gopay" />
                  <Label htmlFor="gopay" className="cursor-pointer flex items-center gap-2">
                    <div className="flex items-center justify-center h-5 w-5 bg-green-500 text-white rounded-sm font-bold text-xs">
                      GP
                    </div>
                    GoPay
                  </Label>
                </div>

                {paymentMethod === "gopay" && (
                  <div className="grid gap-4 pl-6 mt-3">
                    <div className="space-y-2">
                      <Label htmlFor="gopay-number">GoPay Phone Number</Label>
                      <Input id="gopay-number" placeholder="08123456789" required />
                      <p className="text-xs text-muted-foreground">
                        Enter the phone number registered with your GoPay account
                      </p>
                    </div>
                  </div>
                )}

                {/* DANA Payment Method */}
                <div className="flex items-center space-x-2 border rounded-md p-4 mt-3">
                  <RadioGroupItem value="dana" id="dana" />
                  <Label htmlFor="dana" className="cursor-pointer flex items-center gap-2">
                    <div className="flex items-center justify-center h-5 w-5 bg-blue-500 text-white rounded-sm font-bold text-xs">
                      DA
                    </div>
                    DANA
                  </Label>
                </div>

                {paymentMethod === "dana" && (
                  <div className="grid gap-4 pl-6 mt-3">
                    <div className="space-y-2">
                      <Label htmlFor="dana-number">DANA Phone Number</Label>
                      <Input id="dana-number" placeholder="08123456789" required />
                      <p className="text-xs text-muted-foreground">
                        Enter the phone number registered with your DANA account
                      </p>
                    </div>
                  </div>
                )}

                {/* ShopeePay Payment Method */}
                <div className="flex items-center space-x-2 border rounded-md p-4 mt-3">
                  <RadioGroupItem value="shopeepay" id="shopeepay" />
                  <Label htmlFor="shopeepay" className="cursor-pointer flex items-center gap-2">
                    <div className="flex items-center justify-center h-5 w-5 bg-orange-500 text-white rounded-sm font-bold text-xs">
                      SP
                    </div>
                    ShopeePay
                  </Label>
                </div>

                {paymentMethod === "shopeepay" && (
                  <div className="grid gap-4 pl-6 mt-3">
                    <div className="space-y-2">
                      <Label htmlFor="shopeepay-number">ShopeePay Phone Number</Label>
                      <Input id="shopeepay-number" placeholder="08123456789" required />
                      <p className="text-xs text-muted-foreground">
                        Enter the phone number registered with your ShopeePay account
                      </p>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Payment Method */}
                <div className="flex items-center space-x-2 border rounded-md p-4 mt-3">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Label htmlFor="bank-transfer" className="cursor-pointer flex items-center gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2 9V8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8V9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4 7L5.33333 3.4C5.44221 3.14819 5.70603 3 6 3H18C18.294 3 18.5578 3.14819 18.6667 3.4L20 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path d="M12 7V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path
                        d="M4 10V16C4 16.5523 4.44772 17 5 17H19C19.5523 17 20 16.5523 20 16V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M9 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M15 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Bank Transfer
                  </Label>
                </div>

                {paymentMethod === "bank-transfer" && (
                  <div className="grid gap-4 pl-6 mt-3">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Select Bank</Label>
                      <Select defaultValue="bca">
                        <SelectTrigger id="bank-name">
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bca">BCA</SelectItem>
                          <SelectItem value="bni">BNI</SelectItem>
                          <SelectItem value="bri">BRI</SelectItem>
                          <SelectItem value="mandiri">Mandiri</SelectItem>
                          <SelectItem value="cimb">CIMB Niaga</SelectItem>
                          <SelectItem value="permata">Permata Bank</SelectItem>
                          <SelectItem value="bsi">Bank Syariah Indonesia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Bank Transfer Instructions</h4>
                      <ol className="text-sm space-y-2 list-decimal pl-4">
                        <li>Complete your order and note your order number</li>
                        <li>Transfer the exact amount to the bank account shown below</li>
                        <li>Include your order number in the transfer description</li>
                        <li>Your order will be processed once payment is confirmed</li>
                      </ol>

                      <div className="mt-4 p-3 bg-background rounded border">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">Bank Name:</div>
                          <div className="font-medium">Bank Central Asia (BCA)</div>

                          <div className="text-muted-foreground">Account Number:</div>
                          <div className="font-medium">8730456219</div>

                          <div className="text-muted-foreground">Account Name:</div>
                          <div className="font-medium">PT Zafago Digital Indonesia</div>

                          <div className="text-muted-foreground">Amount:</div>
                          <div className="font-medium">
                            ${total.toFixed(2)} (Rp {(total * 15500).toLocaleString("id-ID")})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* QRIS Payment Method */}
                <div className="flex items-center space-x-2 border rounded-md p-4 mt-3">
                  <RadioGroupItem value="qris" id="qris" />
                  <Label htmlFor="qris" className="cursor-pointer flex items-center gap-2">
                    <div className="flex items-center justify-center h-5 w-5 bg-red-500 text-white rounded-sm font-bold text-xs">
                      QR
                    </div>
                    QRIS (All E-wallets)
                  </Label>
                </div>

                {paymentMethod === "qris" && (
                  <div className="grid gap-4 pl-6 mt-3">
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">QRIS Payment Instructions</h4>
                      <p className="text-sm mb-4">
                        Scan the QR code below using any QRIS-supported e-wallet app (OVO, GoPay, DANA, LinkAja,
                        ShopeePay, etc.)
                      </p>

                      <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-md inline-block">
                          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                            <p className="text-xs text-center text-gray-500">
                              QR code will be generated after order confirmation
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-center text-muted-foreground">
                        Amount: ${total.toFixed(2)} (Rp {(total * 15500).toLocaleString("id-ID")})
                      </p>
                    </div>
                  </div>
                )}

                {/* PayPal Payment Method */}
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

                {/* Cryptocurrency Payment Method */}
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
                <Checkbox id="terms" required />
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

                  {cartItems.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Your cart is empty</p>
                      <Button variant="outline" className="mt-4" asChild>
                        <Link href="/products">Browse Products</Link>
                      </Button>
                    </div>
                  ) : (
                    <>
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
                                        src={
                                          item.image ||
                                          `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(item.title) || "/placeholder.svg"}`
                                        }
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
                          <div className="text-right">
                            <span>${total.toFixed(2)}</span>
                            <p className="text-xs text-muted-foreground">
                              ≈ Rp {(total * 15500).toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full" size="lg" type="submit">
                            Complete Order
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <p className="text-xs text-center text-muted-foreground mt-2">
                            You will receive your codes immediately after payment
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>Secure Checkout</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
