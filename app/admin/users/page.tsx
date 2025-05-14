"use client"

import { useEffect, useState } from "react"
import { BarChart, Users, ShoppingCart, DollarSign, Settings, Package, Search, Ban, CheckCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Navigation items for admin dashboard
const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: BarChart,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Transactions",
    href: "/admin/transactions",
    icon: ShoppingCart,
  },
  {
    title: "Withdrawals",
    href: "/admin/withdrawals",
    icon: DollarSign,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState([])
  const [sellers, setSellers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false)
  const [isUnbanDialogOpen, setIsUnbanDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [banReason, setBanReason] = useState("")
  const [activeTab, setActiveTab] = useState("buyers")

  useEffect(() => {
    // In a real app, this would be an API call to get all users
    // For now, we'll use mock data
    const mockUsers = [
      {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        joinDate: "2023-01-15",
        orders: 12,
        totalSpent: 750.25,
        status: "active",
      },
      {
        id: "user-2",
        name: "Jane Smith",
        email: "jane@example.com",
        joinDate: "2023-02-20",
        orders: 8,
        totalSpent: 450.75,
        status: "active",
      },
      {
        id: "user-3",
        name: "Bob Johnson",
        email: "bob@example.com",
        joinDate: "2023-03-10",
        orders: 5,
        totalSpent: 320.5,
        status: "banned",
        banReason: "Payment fraud",
      },
    ]

    const mockSellers = [
      {
        id: "seller-1",
        name: "Demo Seller",
        email: "seller@example.com",
        storeName: "Demo Game Store",
        joinDate: "2023-01-10",
        products: 15,
        totalSales: 2500.75,
        status: "active",
      },
      {
        id: "seller-2",
        name: "Game Store Inc",
        email: "store@example.com",
        storeName: "Game Store Inc",
        joinDate: "2023-02-05",
        products: 25,
        totalSales: 4750.5,
        status: "active",
      },
      {
        id: "seller-3",
        name: "Software Solutions",
        email: "software@example.com",
        storeName: "Software Solutions",
        joinDate: "2023-03-15",
        products: 8,
        totalSales: 1200.25,
        status: "banned",
        banReason: "Counterfeit products",
      },
    ]

    setUsers(mockUsers)
    setSellers(mockSellers)
  }, [])

  const handleBanUser = () => {
    if (!currentUser) return

    if (!banReason) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for banning this user.",
        variant: "destructive",
      })
      return
    }

    if (activeTab === "buyers") {
      // Update user status
      const updatedUsers = users.map((user) => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            status: "banned",
            banReason: banReason,
          }
        }
        return user
      })

      setUsers(updatedUsers)
    } else {
      // Update seller status
      const updatedSellers = sellers.map((seller) => {
        if (seller.id === currentUser.id) {
          return {
            ...seller,
            status: "banned",
            banReason: banReason,
          }
        }
        return seller
      })

      setSellers(updatedSellers)
    }

    // Close dialog and reset form
    setIsBanDialogOpen(false)
    setCurrentUser(null)
    setBanReason("")

    toast({
      title: "User banned",
      description: "The user has been banned from the platform.",
    })
  }

  const handleUnbanUser = () => {
    if (!currentUser) return

    if (activeTab === "buyers") {
      // Update user status
      const updatedUsers = users.map((user) => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            status: "active",
            banReason: undefined,
          }
        }
        return user
      })

      setUsers(updatedUsers)
    } else {
      // Update seller status
      const updatedSellers = sellers.map((seller) => {
        if (seller.id === currentUser.id) {
          return {
            ...seller,
            status: "active",
            banReason: undefined,
          }
        }
        return seller
      })

      setSellers(updatedSellers)
    }

    // Close dialog
    setIsUnbanDialogOpen(false)
    setCurrentUser(null)

    toast({
      title: "User unbanned",
      description: "The user has been unbanned and can now access the platform.",
    })
  }

  const openBanDialog = (user) => {
    setCurrentUser(user)
    setIsBanDialogOpen(true)
  }

  const openUnbanDialog = (user) => {
    setCurrentUser(user)
    setIsUnbanDialogOpen(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "banned":
        return <Badge variant="destructive">Banned</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.storeName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || seller.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout navItems={adminNavItems} userRole="admin">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage buyers and sellers on the platform</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="buyers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buyers">Buyers</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
          </TabsList>
          <TabsContent value="buyers">
            <Card>
              <CardHeader>
                <CardTitle>Buyers</CardTitle>
                <CardDescription>Manage customer accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>{user.orders}</TableCell>
                          <TableCell>${user.totalSpent.toFixed(2)}</TableCell>
                          <TableCell>
                            <div>
                              {getStatusBadge(user.status)}
                              {user.banReason && <p className="text-xs text-destructive mt-1">{user.banReason}</p>}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {user.status === "active" ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openBanDialog(user)}
                                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                              >
                                <Ban className="h-4 w-4" />
                                <span className="sr-only">Ban</span>
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openUnbanDialog(user)}
                                className="text-green-500 hover:text-green-700 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Unban</span>
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sellers">
            <Card>
              <CardHeader>
                <CardTitle>Sellers</CardTitle>
                <CardDescription>Manage seller accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Total Sales</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSellers.length > 0 ? (
                      filteredSellers.map((seller) => (
                        <TableRow key={seller.id}>
                          <TableCell className="font-medium">{seller.name}</TableCell>
                          <TableCell>{seller.storeName}</TableCell>
                          <TableCell>{seller.email}</TableCell>
                          <TableCell>{seller.joinDate}</TableCell>
                          <TableCell>{seller.products}</TableCell>
                          <TableCell>${seller.totalSales.toFixed(2)}</TableCell>
                          <TableCell>
                            <div>
                              {getStatusBadge(seller.status)}
                              {seller.banReason && <p className="text-xs text-destructive mt-1">{seller.banReason}</p>}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {seller.status === "active" ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openBanDialog(seller)}
                                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                              >
                                <Ban className="h-4 w-4" />
                                <span className="sr-only">Ban</span>
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openUnbanDialog(seller)}
                                className="text-green-500 hover:text-green-700 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Unban</span>
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                          No sellers found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ban User Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              This will prevent the user from accessing the platform. Please provide a reason.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm">{currentUser?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm">{currentUser?.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ban-reason">Ban Reason</Label>
              <Textarea
                id="ban-reason"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="Provide a reason for banning this user..."
                rows={3}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBanDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBanUser}>
              Ban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unban User Dialog */}
      <Dialog open={isUnbanDialogOpen} onOpenChange={setIsUnbanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unban User</DialogTitle>
            <DialogDescription>This will restore the user's access to the platform.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm">{currentUser?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm">{currentUser?.email}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Ban Reason</p>
                <p className="text-sm text-destructive">{currentUser?.banReason}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUnbanDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-500 hover:bg-green-600" onClick={handleUnbanUser}>
              Unban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
