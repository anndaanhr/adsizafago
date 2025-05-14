"use client"

import { useEffect, useState } from "react"
import { BarChart, Users, ShoppingCart, DollarSign, AlertTriangle, Settings, Package } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

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

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalSales: 0,
    pendingWithdrawals: 0,
    recentTransactions: [],
    flaggedAccounts: [],
  })

  useEffect(() => {
    // In a real app, this would be an API call to get the admin dashboard data
    // For now, we'll use mock data
    const mockDashboardData = {
      totalUsers: 1250,
      totalSellers: 45,
      totalProducts: 875,
      totalSales: 25750.5,
      pendingWithdrawals: 5,
      recentTransactions: [
        { id: "txn-001", user: "John Doe", product: "Cyberpunk 2077", amount: 59.99, date: "2023-05-15" },
        { id: "txn-002", user: "Jane Smith", product: "Elden Ring", amount: 69.99, date: "2023-05-14" },
        { id: "txn-003", user: "Bob Johnson", product: "Microsoft Office", amount: 149.99, date: "2023-05-13" },
      ],
      flaggedAccounts: [
        {
          id: "user-001",
          name: "Suspicious User",
          email: "suspicious@example.com",
          type: "buyer",
          reason: "Multiple chargebacks",
        },
        {
          id: "seller-002",
          name: "Questionable Seller",
          email: "questionable@example.com",
          type: "seller",
          reason: "Product complaints",
        },
      ],
    }

    setDashboardData(mockDashboardData)
  }, [])

  return (
    <DashboardLayout navItems={adminNavItems} userRole="admin">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}! Here's an overview of the platform.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalUsers}</div>
              <p className="text-xs text-muted-foreground">{dashboardData.totalSellers} sellers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active listings on the platform</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.totalSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Lifetime platform sales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.pendingWithdrawals}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
                <Button size="sm" variant="outline" onClick={() => (window.location.href = "/admin/withdrawals")}>
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest purchases on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentTransactions.length > 0 ? (
                  dashboardData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{transaction.product}</p>
                        <p className="text-sm text-muted-foreground">by {transaction.user}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm font-medium">${transaction.amount}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent transactions</p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Flagged Accounts</CardTitle>
                <CardDescription>Accounts that require attention</CardDescription>
              </div>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.flaggedAccounts.length > 0 ? (
                  dashboardData.flaggedAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium leading-none">{account.name}</p>
                          <Badge variant={account.type === "seller" ? "outline" : "secondary"}>{account.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{account.email}</p>
                        <p className="text-xs text-destructive">{account.reason}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => (window.location.href = `/admin/users/${account.id}`)}
                      >
                        Review
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No flagged accounts</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
