"use client"

import { useEffect, useState } from "react"
import { BarChart, Users, ShoppingCart, DollarSign, Settings, Package, Check, X } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export default function AdminWithdrawalsPage() {
  const { toast } = useToast()
  const [withdrawals, setWithdrawals] = useState([])
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [currentWithdrawal, setCurrentWithdrawal] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    // In a real app, this would be an API call to get all withdrawal requests
    // For now, we'll use mock data
    const mockWithdrawals = [
      {
        id: "wth-001",
        sellerId: "seller-1",
        sellerName: "Demo Seller",
        sellerEmail: "seller@example.com",
        amount: 250.0,
        status: "pending",
        date: "2023-05-15",
        method: "PayPal",
        details: "seller@example.com",
      },
      {
        id: "wth-002",
        sellerId: "seller-2",
        sellerName: "Game Store Inc",
        sellerEmail: "store@example.com",
        amount: 175.5,
        status: "pending",
        date: "2023-05-14",
        method: "Bank Transfer",
        details: "XXXX-XXXX-XXXX-1234",
      },
      {
        id: "wth-003",
        sellerId: "seller-3",
        sellerName: "Software Solutions",
        sellerEmail: "software@example.com",
        amount: 500.0,
        status: "completed",
        date: "2023-05-10",
        method: "PayPal",
        details: "software@example.com",
      },
      {
        id: "wth-004",
        sellerId: "seller-1",
        sellerName: "Demo Seller",
        sellerEmail: "seller@example.com",
        amount: 125.0,
        status: "rejected",
        date: "2023-05-05",
        method: "Crypto",
        details: "0x1234567890abcdef",
        rejectionReason: "Invalid wallet address",
      },
    ]

    setWithdrawals(mockWithdrawals)
    setFilteredWithdrawals(mockWithdrawals)
  }, [])

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredWithdrawals(withdrawals)
    } else {
      setFilteredWithdrawals(withdrawals.filter((w) => w.status === statusFilter))
    }
  }, [statusFilter, withdrawals])

  const handleApproveWithdrawal = () => {
    if (!currentWithdrawal) return

    // Update withdrawal status
    const updatedWithdrawals = withdrawals.map((withdrawal) => {
      if (withdrawal.id === currentWithdrawal.id) {
        return {
          ...withdrawal,
          status: "completed",
        }
      }
      return withdrawal
    })

    setWithdrawals(updatedWithdrawals)

    // Close dialog
    setIsApproveDialogOpen(false)
    setCurrentWithdrawal(null)

    toast({
      title: "Withdrawal approved",
      description: "The withdrawal request has been approved and marked as completed.",
    })
  }

  const handleRejectWithdrawal = () => {
    if (!currentWithdrawal) return

    if (!rejectionReason) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for rejecting this withdrawal request.",
        variant: "destructive",
      })
      return
    }

    // Update withdrawal status
    const updatedWithdrawals = withdrawals.map((withdrawal) => {
      if (withdrawal.id === currentWithdrawal.id) {
        return {
          ...withdrawal,
          status: "rejected",
          rejectionReason: rejectionReason,
        }
      }
      return withdrawal
    })

    setWithdrawals(updatedWithdrawals)

    // Close dialog and reset form
    setIsRejectDialogOpen(false)
    setCurrentWithdrawal(null)
    setRejectionReason("")

    toast({
      title: "Withdrawal rejected",
      description: "The withdrawal request has been rejected.",
    })
  }

  const openApproveDialog = (withdrawal) => {
    setCurrentWithdrawal(withdrawal)
    setIsApproveDialogOpen(true)
  }

  const openRejectDialog = (withdrawal) => {
    setCurrentWithdrawal(withdrawal)
    setIsRejectDialogOpen(true)
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
    <DashboardLayout navItems={adminNavItems} userRole="admin">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Withdrawal Requests</h1>
          <p className="text-muted-foreground">Manage and process seller withdrawal requests</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500">
              Completed: {withdrawals.filter((w) => w.status === "completed").length}
            </Badge>
            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
              Pending: {withdrawals.filter((w) => w.status === "pending").length}
            </Badge>
            <Badge variant="destructive">Rejected: {withdrawals.filter((w) => w.status === "rejected").length}</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Requests</CardTitle>
            <CardDescription>Review and process seller withdrawal requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWithdrawals.length > 0 ? (
                  filteredWithdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell className="font-medium">{withdrawal.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{withdrawal.sellerName}</p>
                          <p className="text-sm text-muted-foreground">{withdrawal.sellerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{withdrawal.date}</TableCell>
                      <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <div>
                          <p>{withdrawal.method}</p>
                          <p className="text-sm text-muted-foreground">
                            {withdrawal.method === "PayPal" ? (
                              withdrawal.details
                            ) : (
                              <span>
                                {withdrawal.details.substring(0, 4)}...
                                {withdrawal.details.substring(withdrawal.details.length - 4)}
                              </span>
                            )}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {getStatusBadge(withdrawal.status)}
                          {withdrawal.rejectionReason && (
                            <p className="text-xs text-destructive mt-1">{withdrawal.rejectionReason}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {withdrawal.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openApproveDialog(withdrawal)}
                              className="text-green-500 hover:text-green-700 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Approve</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openRejectDialog(withdrawal)}
                              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No withdrawal requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Approve Confirmation Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Approval</DialogTitle>
            <DialogDescription>Are you sure you want to approve this withdrawal request?</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Seller</p>
                <p className="text-sm">{currentWithdrawal?.sellerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Amount</p>
                <p className="text-sm">${currentWithdrawal?.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm">{currentWithdrawal?.method}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Payment Details</p>
                <p className="text-sm">{currentWithdrawal?.details}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveWithdrawal} className="bg-green-500 hover:bg-green-600">
              Approve Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Withdrawal</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this withdrawal request.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium">Seller</p>
                <p className="text-sm">{currentWithdrawal?.sellerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Amount</p>
                <p className="text-sm">${currentWithdrawal?.amount.toFixed(2)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Rejection Reason</Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide a reason for rejection..."
                rows={3}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectWithdrawal}>
              Reject Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
