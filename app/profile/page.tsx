"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Package, Heart, Settings, User, LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    newsletter: false,
    darkMode: false,
  })

  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Load user data
    setProfile({
      name: user.name || "",
      email: user.email || "",
      avatar: user.avatar || "/placeholder.svg?height=100&width=100",
    })

    setSettings({
      notifications: user.settings?.notifications || true,
      newsletter: user.settings?.newsletter || false,
      darkMode: user.settings?.darkMode || false,
    })

    // Load orders
    if (user.orders) {
      setOrders(user.orders)
    }

    // Load wishlist
    const storedWishlist = localStorage.getItem("zafago_wishlist")
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist", error)
      }
    }

    setIsLoading(false)
  }, [user, router])

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully.",
    })
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 space-y-4">
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image src={profile.avatar || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h3 className="font-medium">Account</h3>
            </div>
            <div className="p-2">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeTab === "wishlist" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="hidden">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal information here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden border">
                      <Image
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Profile Picture</h3>
                      <p className="text-sm text-muted-foreground">
                        This will be displayed on your profile and in comments.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Change
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>

                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Order History</h2>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                          <Badge>{order.status}</Badge>
                        </div>
                        <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total</span>
                            <span className="font-medium">${order.total.toFixed(2)}</span>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Items</h4>
                            <ul className="space-y-1">
                              {order.items.map((item, index) => (
                                <li key={index} className="text-sm">
                                  {item.title || `Product #${item}`}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                    <Button asChild>
                      <a href="/products">Browse Products</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="wishlist" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Wishlist</h2>
              </div>

              {wishlist.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {wishlist.map((item) => (
                    <Card key={item}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                            <Image src="/placeholder.svg" alt="Product" fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium line-clamp-1">{item}</h3>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground mb-4">
                      Save items you're interested in for later by adding them to your wishlist.
                    </p>
                    <Button asChild>
                      <a href="/products">Browse Products</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Settings</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your account preferences and settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about orders, deals, and updates.
                        </p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={settings.notifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive our newsletter with deals, new releases, and gaming news.
                        </p>
                      </div>
                      <Switch
                        id="newsletter"
                        checked={settings.newsletter}
                        onCheckedChange={(checked) => setSettings({ ...settings, newsletter: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Use dark mode by default when visiting our site.
                        </p>
                      </div>
                      <Switch
                        id="darkMode"
                        checked={settings.darkMode}
                        onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                      />
                    </div>

                    <Button onClick={handleSaveSettings} className="mt-4">
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Manage your account settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

