"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useEffect, useState } from "react"
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Search,
  BarChart,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

export default function SellerProductsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "0",
    category: "",
    platform: "",
    stock: "1",
    image: "",
  })

  useEffect(() => {
    // In a real app, this would be an API call to get the seller's products
    // For now, we'll use mock data
    const mockProducts = [
      {
        id: "prod-001",
        title: "Cyberpunk 2077",
        description: "An open-world, action-adventure RPG set in Night City",
        price: 59.99,
        discount: 10,
        category: "rpg",
        platform: "PC",
        stock: 15,
        image: "/images/cyberpunk.png",
        sales: 120,
      },
      {
        id: "prod-002",
        title: "Elden Ring",
        description: "An action RPG developed by FromSoftware",
        price: 69.99,
        discount: 0,
        category: "rpg",
        platform: "PC",
        stock: 8,
        image: "/images/elden.png",
        sales: 85,
      },
      {
        id: "prod-003",
        title: "Microsoft Office 2021",
        description: "Productivity suite for Windows and Mac",
        price: 149.99,
        discount: 15,
        category: "software",
        platform: "PC",
        stock: 25,
        image: "/images/microsoftoffice.png",
        sales: 210,
      },
    ]

    setProducts(mockProducts)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      discount: "0",
      category: "",
      platform: "",
      stock: "1",
      image: "",
    })
  }

  const handleAddProduct = () => {
    // Validate form
    if (!formData.title || !formData.price || !formData.category || !formData.platform) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new product
    const newProduct = {
      id: `prod-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      discount: Number.parseInt(formData.discount),
      category: formData.category,
      platform: formData.platform,
      stock: Number.parseInt(formData.stock),
      image: formData.image || "/placeholder.svg",
      sales: 0,
    }

    // Add to products array
    setProducts([...products, newProduct])

    // Close dialog and reset form
    setIsAddProductOpen(false)
    resetForm()

    toast({
      title: "Product added",
      description: "Your product has been added successfully.",
    })
  }

  const handleEditProduct = () => {
    if (!currentProduct) return

    // Validate form
    if (!formData.title || !formData.price || !formData.category || !formData.platform) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update product
    const updatedProducts = products.map((product) => {
      if (product.id === currentProduct.id) {
        return {
          ...product,
          title: formData.title,
          description: formData.description,
          price: Number.parseFloat(formData.price),
          discount: Number.parseInt(formData.discount),
          category: formData.category,
          platform: formData.platform,
          stock: Number.parseInt(formData.stock),
          image: formData.image || product.image,
        }
      }
      return product
    })

    setProducts(updatedProducts)

    // Close dialog and reset form
    setIsEditProductOpen(false)
    setCurrentProduct(null)
    resetForm()

    toast({
      title: "Product updated",
      description: "Your product has been updated successfully.",
    })
  }

  const handleDeleteProduct = () => {
    if (!currentProduct) return

    // Remove product
    const updatedProducts = products.filter((product) => product.id !== currentProduct.id)
    setProducts(updatedProducts)

    // Close dialog
    setIsDeleteDialogOpen(false)
    setCurrentProduct(null)

    toast({
      title: "Product deleted",
      description: "Your product has been deleted successfully.",
    })
  }

  const openEditDialog = (product) => {
    setCurrentProduct(product)
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      discount: product.discount.toString(),
      category: product.category,
      platform: product.platform,
      stock: product.stock.toString(),
      image: product.image,
    })
    setIsEditProductOpen(true)
  }

  const openDeleteDialog = (product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.platform.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout navItems={sellerNavItems} userRole="seller">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">Manage your product listings</p>
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Fill in the details to add a new product to your store.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter product title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="29.99"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your product..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="rpg">RPG</SelectItem>
                        <SelectItem value="simulation">Simulation</SelectItem>
                        <SelectItem value="strategy">Strategy</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform *</Label>
                    <Select value={formData.platform} onValueChange={(value) => handleSelectChange("platform", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PC">PC</SelectItem>
                        <SelectItem value="PlayStation">PlayStation</SelectItem>
                        <SelectItem value="Xbox">Xbox</SelectItem>
                        <SelectItem value="Nintendo">Nintendo</SelectItem>
                        <SelectItem value="Mobile">Mobile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="1"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>You have {products.length} products in your store</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell className="capitalize">{product.category}</TableCell>
                      <TableCell>{product.platform}</TableCell>
                      <TableCell>
                        {product.discount > 0 ? (
                          <div>
                            <span className="font-medium">
                              ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium">${product.price.toFixed(2)}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={product.stock < 5 ? "text-destructive font-medium" : ""}>{product.stock}</span>
                      </TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(product)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the details of your product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Product Title *</Label>
                <Input id="edit-title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price ($) *</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="rpg">RPG</SelectItem>
                    <SelectItem value="simulation">Simulation</SelectItem>
                    <SelectItem value="strategy">Strategy</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-platform">Platform *</Label>
                <Select value={formData.platform} onValueChange={(value) => handleSelectChange("platform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PC">PC</SelectItem>
                    <SelectItem value="PlayStation">PlayStation</SelectItem>
                    <SelectItem value="Xbox">Xbox</SelectItem>
                    <SelectItem value="Nintendo">Nintendo</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-stock">Stock Quantity *</Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  min="1"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-discount">Discount (%)</Label>
                <Input
                  id="edit-discount"
                  name="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentProduct?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
