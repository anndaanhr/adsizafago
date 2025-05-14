"use client"
import Link from "next/link"
import Image from "next/image"
import { Package, Heart, Edit, ShoppingCart, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AccountSidebar } from "@/components/account-sidebar"

export default function AccountPage() {
  // Mock user data - in a real app, this would come from an API or auth provider
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
    memberSince: "January 2023",
    verified: true,
  }

  // Mock recent orders - in a real app, this would come from an API
  const recentOrders = [
    {
      id: "ZAF-123456",
      date: "2023-03-15",
      total: 59.99,
      status: "completed",
      items: [
        {
          title: "Elden Ring",
          platform: "Steam",
        },
      ],
    },
    {
      id: "ZAF-123455",
      date: "2023-02-28",
      total: 149.99,
      status: "completed",
      items: [
        {
          title: "Microsoft Office 2023",
          platform: "Windows",
        },
      ],
    },
    {
      id: "ZAF-123454",
      date: "2023-02-10",
      total: 29.99,
      status: "completed",
      items: [
        {
          title: "Minecraft",
          platform: "Java Edition",
        },
      ],
    },
  ]

  // Mock wishlist items - in a real app, this would come from an API
  const wishlistItems = [
    {
      id: "1",
      title: "Cyberpunk 2077",
      image: "/placeholder.svg?height=100&width=100&text=Cyberpunk",
      price: 49.99,
      discount: 30,
      platform: "Epic Games",
    },
    {
      id: "2",
      title: "Adobe Photoshop (1 Year)",
      image: "/placeholder.svg?height=100&width=100&text=Photoshop",
      price: 239.99,
      discount: 15,
      platform: "Windows/Mac",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <AccountSidebar />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 pt-6">
              {/* User Profile Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-xl">{user.name}</h3>
                        {user.verified && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-green-500/10 text-green-500 border-green-500/20"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{user.email}</p>
                      <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/account/edit-profile">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Your most recent purchases</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/account/orders">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <Link href={`/account/orders/${order.id}`} className="font-medium hover:underline">
                                Order #{order.id}
                              </Link>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()} • ${order.total.toFixed(2)}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {order.items.map((item, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {item.title} ({item.platform})
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Badge
                            className={
                              order.status === "completed"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            }
                            variant="outline"
                          >
                            {order.status === "completed" ? "Completed" : "Processing"}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <ShoppingCart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <h3 className="font-medium mb-1">No orders yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">You haven't made any purchases yet.</p>
                        <Button asChild>
                          <Link href="/products">Start Shopping</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Account Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingCart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Orders</p>
                        <p className="text-2xl font-bold">{recentOrders.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Wishlist Items</p>
                        <p className="text-2xl font-bold">{wishlistItems.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member For</p>
                        <p className="text-2xl font-bold">1 year</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and manage your previous orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Order history would go here - simplified for this example */}
                  <div className="space-y-6">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">Order #{order.id}</h3>
                              <Badge
                                className={
                                  order.status === "completed"
                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                }
                                variant="outline"
                              >
                                {order.status === "completed" ? "Completed" : "Processing"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()} • ${order.total.toFixed(2)}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/account/orders/${order.id}`}>View Details</Link>
                          </Button>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs">
                                  {item.platform.substring(0, 2)}
                                </div>
                                <span>{item.title}</span>
                              </div>
                              <Badge variant="outline">{item.platform}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>Products you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                              {item.title}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{item.platform}</Badge>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                {item.discount > 0 && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${item.price.toFixed(2)}
                                  </span>
                                )}
                                <span className="font-medium">
                                  ${(item.price - (item.price * item.discount) / 100).toFixed(2)}
                                </span>
                                {item.discount > 0 && (
                                  <Badge variant="destructive" className="text-xs">
                                    {item.discount}% OFF
                                  </Badge>
                                )}
                              </div>
                              <Button size="sm">Add to Cart</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <h3 className="font-medium mb-1">Your wishlist is empty</h3>
                      <p className="text-sm text-muted-foreground mb-4">Save items you're interested in for later.</p>
                      <Button asChild>
                        <Link href="/products">Browse Products</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
