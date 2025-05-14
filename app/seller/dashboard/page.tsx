"use client"

import { useEffect, useState } from "react"
import { BarChart, Package, DollarSign, ShoppingCart, TrendingUp, Users, Clock, AlertCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

// Navigation items for seller dashboard
const sellerNavItems = [
  {
    title: "Dashboard",
    href: "/seller/dashboard",
    icon: BarChart,
  },
  {
    title: "Products",
    href: "/seller/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/seller/orders",
    icon: ShoppingCart,
  },
  {
    title: "Sales Reports",
    href: "/seller/reports",
    icon: TrendingUp,
  },
  {
    title: "Withdrawals",
    href: "/seller/withdrawals",
    icon: DollarSign,
  },
  {
    title: "Settings",
    href: "/seller/settings",
    icon: Users,
  },
]

export default function SellerDashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalSales: 0,
    pendingOrders: 0,
    balance: 0,
    recentSales: [],
    lowStockProducts: [],
  })

  useEffect(() => {
    // In a real app, this would be an API call to get the seller's dashboard data
    // For now, we'll use mock data
    const mockDashboardData = {
      totalProducts: 12,
      totalSales: 1250.75,
      pendingOrders: 3,
      balance: user?.balance || 0,
      recentSales: [
        { id: "ord-001", product: "Cyberpunk 2077", amount: 59.99, date: "2023-05-15" },
        { id: "ord-002", product: "Elden Ring", amount: 69.99, date: "2023-05-14" },
        { id: "ord-003", product: "Microsoft Office", amount: 149.99, date: "2023-05-13" },
      ],
      lowStockProducts: [
        { id: "prod-001", name: "Cyberpunk 2077", stock: 2 },
        { id: "prod-002", name: "Elden Ring", stock: 3 },
      ],
    }

    setDashboardData(mockDashboardData)
  }, [user])

  const requestWithdrawal = () => {
    toast({
      title: "Withdrawal requested",
      description: "Your withdrawal request has been submitted for approval.",
    })
  }

  return (
    <DashboardLayout navItems={sellerNavItems} userRole="seller">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}! Here's an overview of your store.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active listings in your store</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.totalSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Lifetime sales amount</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Orders awaiting processing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.balance.toFixed(2)}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">Available for withdrawal</p>
                <Button size="sm" onClick={requestWithdrawal} disabled={dashboardData.balance <= 0}>
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>Your most recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentSales.length > 0 ? (
                  dashboardData.recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{sale.product}</p>
                        <p className="text-sm text-muted-foreground">Order #{sale.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm font-medium">${sale.amount}</p>
                          <p className="text-xs text-muted-foreground">{sale.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent sales</p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Low Stock Alert</CardTitle>
              <CardDescription>Products that need restocking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.lowStockProducts.length > 0 ? (
                  dashboardData.lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{product.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-1" />
                          <p className="text-sm font-medium text-destructive">{product.stock} left</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">All products are well-stocked</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
