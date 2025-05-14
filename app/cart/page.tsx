"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { user, syncUserData } = useAuth()
  const router = useRouter()

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

  // Update cart in localStorage and user data when cart items change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("zafago_cart", JSON.stringify(cartItems))

      // If user is logged in, update their cart in user data
      if (user) {
        const updatedUser = { ...user, cart: cartItems }
        localStorage.setItem("zafago_user", JSON.stringify(updatedUser))
        syncUserData()
      }
    }
  }, [cartItems, isLoading, user, syncUserData])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))

    toast({
      title: "Cart updated",
      description: "Item quantity has been updated.",
    })
  }

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))

    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    })
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.setItem("zafago_cart", JSON.stringify([]))

    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price
    return total + itemPrice * item.quantity
  }, 0)

  const shipping = subtotal > 0 ? 4.99 : 0
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    router.push("/checkout")
  }

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
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg border">
              <div className="p-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                </h2>
                <Button variant="outline" size="sm" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
              <Separator />

              <div className="divide-y">
                {cartItems.map((item) => {
                  const discountedPrice = item.discount
                    ? (item.price - (item.price * item.discount) / 100).toFixed(2)
                    : item.price.toFixed(2)

                  return (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            item.image ||
                            `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(item.title.charAt(0)) || "/placeholder.svg"}`
                          }
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {item.platform}
                              </Badge>
                              {item.discount > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.discount}% OFF
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0 text-right">
                            <div className="font-medium">
                              ${discountedPrice}
                              {item.discount > 0 && (
                                <span className="ml-2 text-xs text-muted-foreground line-through">
                                  ${item.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <div className="h-8 px-3 flex items-center justify-center border-y">{item.quantity}</div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          <div>
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
                        <p className="text-xs text-muted-foreground">≈ Rp {(total * 15500).toLocaleString("id-ID")}</p>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="text-xs text-center text-muted-foreground">Secure checkout powered by Stripe</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
