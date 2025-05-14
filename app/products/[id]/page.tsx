"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ChevronLeft,
  Heart,
  Share,
  ShoppingCart,
  Check,
  Star,
  Shield,
  Clock,
  Globe,
  Tag,
  Gamepad,
  Monitor,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { mockProducts } from "@/lib/mock-data"

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user, openLoginModal } = useAuth()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isInCart, setIsInCart] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    // Fetch product data
    const fetchProduct = () => {
      try {
        const foundProduct = mockProducts.find((p) => p.id === id)
        if (foundProduct) {
          setProduct(foundProduct)

          // Get related products (same category, different product)
          const related = mockProducts
            .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
            .slice(0, 4)
          setRelatedProducts(related)

          // Check if product is in cart
          const storedCart = localStorage.getItem("zafago_cart")
          if (storedCart) {
            const parsedCart = JSON.parse(storedCart)
            setIsInCart(parsedCart.some((item) => item.id === foundProduct.id))
          }

          // Check if product is in wishlist
          const storedWishlist = localStorage.getItem("zafago_wishlist")
          if (storedWishlist) {
            const parsedWishlist = JSON.parse(storedWishlist)
            setIsInWishlist(parsedWishlist.includes(foundProduct.id))
          }
        } else {
          router.push("/404")
        }
      } catch (error) {
        console.error("Failed to fetch product", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id, router])

  const addToCart = () => {
    try {
      const storedCart = localStorage.getItem("zafago_cart")
      let cart = []

      if (storedCart) {
        cart = JSON.parse(storedCart)
      }

      // Check if product is already in cart
      const existingItemIndex = cart.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity += 1
      } else {
        // Add new item to cart
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          discount: product.discount || 0,
          image: product.image,
          platform: product.platform,
          quantity: 1,
        })
      }

      localStorage.setItem("zafago_cart", JSON.stringify(cart))
      setIsInCart(true)

      // Trigger storage event for header to update cart count
      window.dispatchEvent(new Event("storage"))

      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Failed to add to cart", error)
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleWishlist = () => {
    if (!user) {
      openLoginModal("Please sign in to add items to your wishlist.")
      return
    }

    try {
      const storedWishlist = localStorage.getItem("zafago_wishlist")
      let wishlist = []

      if (storedWishlist) {
        wishlist = JSON.parse(storedWishlist)
      }

      if (isInWishlist) {
        // Remove from wishlist
        wishlist = wishlist.filter((itemId) => itemId !== product.id)
        toast({
          title: "Removed from wishlist",
          description: `${product.title} has been removed from your wishlist.`,
        })
      } else {
        // Add to wishlist
        wishlist.push(product.id)
        toast({
          title: "Added to wishlist",
          description: `${product.title} has been added to your wishlist.`,
        })
      }

      localStorage.setItem("zafago_wishlist", JSON.stringify(wishlist))
      setIsInWishlist(!isInWishlist)
    } catch (error) {
      console.error("Failed to update wishlist", error)
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  const shareProduct = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Product link has been copied to clipboard.",
      })
    }
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

  if (!product) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Calculate discounted price
  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price.toFixed(2)

  // Get product images or use default
  const productImages = product.images || [product.image]

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/products">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {productImages.length > 1 && (
            <div className="flex space-x-2 overflow-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="mb-2">
                {product.platform}
              </Badge>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={toggleWishlist}>
                  <Heart className={`h-5 w-5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={shareProduct}>
                  <Share className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.sales / 10000}k+ sold)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">${discountedPrice}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  <Badge className="bg-green-500 hover:bg-green-600">-{product.discount}%</Badge>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Price includes taxes. Delivery calculated at checkout.</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">In stock - Ready to download instantly</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-sm">Official distributor - 100% secure purchase</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-purple-500" />
              <span className="text-sm">Global activation - No region restrictions</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button className="flex-1" size="lg" onClick={addToCart}>
              {isInCart ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/checkout">Buy Now</Link>
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Publisher</p>
                <p className="text-sm text-muted-foreground">{product.publisher}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Release Date</p>
                <p className="text-sm text-muted-foreground">{product.releaseDate}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Gamepad className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Genres</p>
                <p className="text-sm text-muted-foreground">{product.genres?.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Monitor className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Platform</p>
                <p className="text-sm text-muted-foreground">{product.platform}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="features"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Features
          </TabsTrigger>
          <TabsTrigger
            value="requirements"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            System Requirements
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-4">
          <div className="prose max-w-none dark:prose-invert">
            <p>{product.description}</p>
            {product.id === "game-1" && (
              <>
                <p>
                  THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden
                  Ring and become an Elden Lord in the Lands Between.
                </p>
                <h3>A Vast World Full of Excitement</h3>
                <p>
                  A vast world where open fields with a variety of situations and huge dungeons with complex and
                  three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and
                  overwhelming threats await you, leading to a high sense of accomplishment.
                </p>
                <h3>Create your Own Character</h3>
                <p>
                  In addition to customizing the appearance of your character, you can freely combine the weapons,
                  armor, and magic that you equip. You can develop your character according to your play style, such as
                  increasing your muscle strength to become a strong warrior, or mastering magic.
                </p>
                <h3>An Epic Drama Born from a Myth</h3>
                <p>
                  A multilayered story told in fragments. An epic drama in which the various thoughts of the characters
                  intersect in the Lands Between.
                </p>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="features" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {product.features?.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-start space-x-3">
                  <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{feature}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature === "Open World"
                        ? "Explore a vast seamless world with freedom to choose your path."
                        : feature === "Multiplayer"
                          ? "Play online with friends and foes for a dynamic experience."
                          : feature === "Controller Support"
                            ? "Full controller support for a comfortable gaming experience."
                            : feature === "Story Rich"
                              ? "Immerse yourself in a deep and engaging narrative."
                              : "Experience the best that gaming has to offer."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="requirements" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2">Minimum Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">OS:</span>
                  <span>Windows 10</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Processor:</span>
                  <span>Intel Core i5-8400 / AMD Ryzen 3 3300X</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Memory:</span>
                  <span>12 GB RAM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Graphics:</span>
                  <span>NVIDIA GeForce GTX 1060 3 GB / AMD Radeon RX 580 4 GB</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">DirectX:</span>
                  <span>Version 12</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage:</span>
                  <span>60 GB available space</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span>Broadband Internet connection</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Recommended Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">OS:</span>
                  <span>Windows 10/11</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Processor:</span>
                  <span>Intel Core i7-8700K / AMD Ryzen 5 3600X</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Memory:</span>
                  <span>16 GB RAM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Graphics:</span>
                  <span>NVIDIA GeForce GTX 1070 8 GB / AMD Radeon RX 5700 8 GB</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">DirectX:</span>
                  <span>Version 12</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage:</span>
                  <span>60 GB available space (SSD recommended)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span>Broadband Internet connection</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold">{product.rating}</div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on {Math.floor(product.sales / 100)} reviews</p>
                </div>
              </div>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=40&width=40&text=JD"
                        alt="John Doe"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
                <p className="text-sm">
                  Absolutely amazing game! The open world is breathtaking and the combat is challenging but rewarding.
                  I've spent over 100 hours exploring and still finding new areas and secrets.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=40&width=40&text=JS"
                        alt="Jane Smith"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">1 week ago</p>
                </div>
                <p className="text-sm">
                  The game is beautiful and the world design is incredible. Combat can be frustrating at times but
                  overall it's a masterpiece. Highly recommended for fans of challenging RPGs.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=40&width=40&text=MJ"
                        alt="Mike Johnson"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Mike Johnson</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">2 weeks ago</p>
                </div>
                <p className="text-sm">
                  One of the best games I've ever played. The lore is deep and mysterious, the world is vast and
                  beautiful, and the combat is challenging but fair. A true masterpiece!
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => {
            const relatedDiscountedPrice = relatedProduct.discount
              ? (relatedProduct.price - (relatedProduct.price * relatedProduct.discount) / 100).toFixed(2)
              : relatedProduct.price.toFixed(2)

            return (
              <Card key={relatedProduct.id} className="overflow-hidden">
                <Link href={`/products/${relatedProduct.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    {relatedProduct.discount > 0 && (
                      <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                        -{relatedProduct.discount}%
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">{relatedProduct.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline">{relatedProduct.platform}</Badge>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">${relatedDiscountedPrice}</span>
                        {relatedProduct.discount > 0 && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${relatedProduct.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
