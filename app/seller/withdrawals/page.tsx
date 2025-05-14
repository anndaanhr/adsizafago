"use client"

import { useEffect, useState } from "react"
import { BarChart, Package, DollarSign, ShoppingCart, TrendingUp, Users, Clock, Plus } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

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

export default function SellerWithdrawalsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [withdrawals, setWithdrawals] = useState([])
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [balance, setBalance] = useState(0)
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentDetails, setPaymentDetails] = useState("")

  useEffect(() => {
    // In a real app, this would be an API call to get the seller's withdrawals and balance
    // For now, we'll use mock data
    const mockWithdrawals = [
      {
        id: "wth-001",
        amount: 250.0,
        status: "completed",
        date: "2023-05-01",
        method: "PayPal",
        details: "seller@example.com",
      },
      {
        id: "wth-002",
        amount: 175.5,
        status: "pending",
        date: "2023-05-15",
        method: "Bank Transfer",
        details: "XXXX-XXXX-XXXX-1234",
      },
    ]

    setWithdrawals(mockWithdrawals)
    setBalance(user?.balance || 1250.75) // Mock balance
  }, [user])

  const handleRequestWithdrawal = () => {
    // Validate form
    if (!withdrawalAmount || !paymentMethod || !paymentDetails) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(withdrawalAmount)

    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      })
      return
    }

    if (amount > balance) {
      toast({
        title: "Insufficient balance",
        description: "Your withdrawal amount exceeds your available balance.",
        variant: "destructive",
      })
      return
    }

    // Create new withdrawal request
    const newWithdrawal = {
      id: `wth-${Date.now()}`,
      amount: amount,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      method: paymentMethod,
      details: paymentDetails,
    }

    // Add to withdrawals array
    setWithdrawals([newWithdrawal, ...withdrawals])

    // Update balance
    setBalance(balance - amount)

    // Close dialog and reset form
    setIsRequestDialogOpen(false)
    setWithdrawalAmount("")
    setPaymentMethod("")
    setPaymentDetails("")

    toast({
      title: "Withdrawal requested",
      description: "Your withdrawal request has been submitted for approval.",
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Pending
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <DashboardLayout navItems={sellerNavItems} userRole="seller">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Withdrawals</h1>
            <p className="text-muted-foreground">Manage your earnings and withdrawal requests</p>
          </div>
          <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Request Withdrawal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Withdrawal</DialogTitle>
                <DialogDescription>Enter the details to request a withdrawal of your earnings.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <span className="text-sm text-muted-foreground">Available: ${balance.toFixed(2)}</span>
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    max={balance}
                    step="0.01"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-details">
                    {paymentMethod === "PayPal"
                      ? "PayPal Email"
                      : paymentMethod === "Bank Transfer"
                        ? "Bank Account Details"
                        : paymentMethod === "Crypto"
                          ? "Wallet Address"
                          : "Payment Details"}
                  </Label>
                  <Input
                    id="payment-details"
                    value={paymentDetails}
                    onChange={(e) => setPaymentDetails(e.target.value)}
                    placeholder="Enter payment details"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRequestWithdrawal}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Available for withdrawal</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {withdrawals
                  .filter((w) => w.status === "pending")
                  .reduce((sum, w) => sum + w.amount, 0)
                  .toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {withdrawals
                  .filter((w) => w.status === "completed")
                  .reduce((sum, w) => sum + w.amount, 0)
                  .toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Lifetime withdrawals</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
            <CardDescription>View all your withdrawal requests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.length > 0 ? (
                  withdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell className="font-medium">{withdrawal.id}</TableCell>
                      <TableCell>{withdrawal.date}</TableCell>
                      <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                      <TableCell>{withdrawal.method}</TableCell>
                      <TableCell>
                        {withdrawal.method === "PayPal" ? (
                          withdrawal.details
                        ) : (
                          <span className="text-muted-foreground">
                            {withdrawal.details.substring(0, 4)}...
                            {withdrawal.details.substring(withdrawal.details.length - 4)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No withdrawal history
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
