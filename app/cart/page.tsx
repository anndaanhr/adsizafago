"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState([])
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Load cart items from localStorage
  useEffect(() => {
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
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("zafago_cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isLoading])

  const updateQuantity = (itemId, newQuantity) => {
    try {
      // If quantity is less than 1, remove the item
      if (newQuantity < 1) {
        removeItem(itemId)
        return
      }

      const updatedCart = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))

      setCartItems(updatedCart)
      localStorage.setItem("zafago_cart", JSON.stringify(updatedCart))

      // Trigger storage event for header to update cart count
      window.dispatchEvent(new Event("storage"))
    } catch (error) {
      console.error("Failed to update quantity", error)
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      })
    }
  }

  const removeItem = (itemId) => {
    try {
      const updatedCart = cartItems.filter((item) => item.id !== itemId)
      setCartItems(updatedCart)
      localStorage.setItem("zafago_cart", JSON.stringify(updatedCart))

      // Trigger storage event for header to update cart count
      window.dispatchEvent(new Event("storage"))

      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      })
    } catch (error) {
      console.error("Failed to remove item from cart", error)
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  const clearCart = () => {
    setCartItems([])
    setCouponApplied(false)
    setCouponDiscount(0)
    localStorage.setItem("zafago_cart", JSON.stringify([]))

    // Trigger storage event for header to update cart count
    window.dispatchEvent(new Event("storage"))

    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setCouponApplied(true)
      setCouponDiscount(10)
      toast({
        title: "Coupon applied",
        description: "10% discount has been applied to your order.",
      })
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive",
      })
    }
  }

  // Calculate totals
  const calculateItemTotal = (item) => {
    const discountedPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price
    return discountedPrice * item.quantity
  }

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  const discount = couponApplied ? subtotal * (couponDiscount / 100) : 0
  const total = subtotal - discount

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                <Separator />
                {cartItems.map((item) => {
                  const discountedPrice = item.discount
                    ? (item.price - (item.price * item.discount) / 100).toFixed(2)
                    : item.price.toFixed(2)

                  return (
                    <div key={item.id} className="py-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                item.image ||
                                `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(item.title)}`
                              }
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                              {item.title}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{item.platform}</Badge>
                              <p className="text-sm text-muted-foreground md:hidden">
                                ${discountedPrice}
                                {item.discount > 0 && (
                                  <span className="ml-2 text-muted-foreground line-through">
                                    ${item.price.toFixed(2)}
                                  </span>
                                )}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 h-auto p-0 text-sm text-destructive hover:text-destructive/80 md:hidden"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Remove
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-2 text-center hidden md:block">
                          <div>
                            ${discountedPrice}
                            {item.discount > 0 && (
                              <div className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease</span>
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase</span>
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-2 text-right flex items-center justify-between md:justify-end">
                          <span className="font-medium">${calculateItemTotal(item).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/80 hidden md:inline-flex"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                      {cartItems.indexOf(item) < cartItems.length - 1 && <Separator className="mt-6" />}
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-between bg-muted p-6 rounded-b-lg">
                <Button variant="outline" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button variant="ghost" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                    </span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex items-center justify-between text-green-500">
                      <span>Discount ({couponDiscount}%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <Separator />
                  <div className="flex items-center justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Apply Coupon</span>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Input
                          type="text"
                          placeholder="Coupon code"
                          className="rounded-r-none"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          className="rounded-l-none"
                          onClick={applyCoupon}
                          disabled={couponApplied || !couponCode}
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Try "DISCOUNT10" for 10% off your order</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

