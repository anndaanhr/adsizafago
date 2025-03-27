"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Share2, Star, Shield, Clock, Award, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb } from "@/components/breadcrumb"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"
import { useToast } from "@/components/ui/use-toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock product data - in a real app, this would come from an API
  const product = {
    id,
    title: "Elden Ring",
    description:
      "Elden Ring is an action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment. The game was directed by Hidetaka Miyazaki and made in collaboration with fantasy novelist George R. R. Martin.",
    longDescription: `
      <p>ELDEN RING, developed by FromSoftware, Inc. and BANDAI NAMCO Entertainment Inc., is a fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R.R. Martin. Danger and discovery lurk around every corner in FromSoftware's largest game to-date.</p>
      <p>Hidetaka Miyazaki and George R.R. Martin – two forces who have brought their talent to the gaming industry – have joined together to create the world of ELDEN RING. The player will embark on a journey through a meticulously handcrafted world dripping in blood and deception brought upon by a variety of characters with their own unique motivations for helping or hindering the player's progress, adversaries with profound backgrounds, and fearsome creatures.</p>
      <p>Throughout their adventures, players will choose the fate of this cursed land by unraveling its secrets and myths. Traverse the breathtaking world on foot or on horseback, alone or online with other players, and fully immerse yourself in the grassy plains, suffocating swamps, spiraling mountains, foreboding castles and other sites of grandeur on a scale never seen before in a FromSoftware title.</p>
    `,
    image: "/placeholder.svg?height=600&width=600&text=Elden+Ring",
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Elden+Ring+1",
      "/placeholder.svg?height=600&width=600&text=Elden+Ring+2",
      "/placeholder.svg?height=600&width=600&text=Elden+Ring+3",
      "/placeholder.svg?height=600&width=600&text=Elden+Ring+4",
    ],
    price: 59.99,
    discount: 15,
    platform: "Steam",
    category: "games",
    releaseDate: "February 25, 2022",
    publisher: "Bandai Namco",
    developer: "FromSoftware",
    genre: ["Action RPG", "Open World"],
    rating: 4.8,
    reviewCount: 1243,
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        processor: "Intel Core i5-8400 or AMD Ryzen 3 3300X",
        memory: "12 GB RAM",
        graphics: "NVIDIA GeForce GTX 1060, 3 GB or AMD Radeon RX 580, 4 GB",
        storage: "60 GB available space",
      },
      recommended: {
        os: "Windows 10/11",
        processor: "Intel Core i7-8700K or AMD Ryzen 5 3600X",
        memory: "16 GB RAM",
        graphics: "NVIDIA GeForce GTX 1070, 8 GB or AMD Radeon RX Vega 56, 8 GB",
        storage: "60 GB available space (SSD recommended)",
      },
    },
  }

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price.toFixed(2)

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.title} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard.",
    })
  }

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/products?category=games" },
          { label: product.title, href: `/products/${id}` },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-destructive hover:bg-destructive">
                {product.discount}% OFF
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.gallery.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md border bg-background">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.platform}</Badge>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Publisher:</span>
              <span>{product.publisher}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Developer:</span>
              <span>{product.developer}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Release Date:</span>
              <span>{product.releaseDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Genre:</span>
              <div className="flex flex-wrap gap-1">
                {product.genre.map((genre, index) => (
                  <Badge key={index} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              {product.discount > 0 && (
                <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              )}
              <span className="text-3xl font-bold">${discountedPrice}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleWishlist}
                className={isWishlisted ? "text-destructive" : ""}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Secure Payment</p>
                <p className="text-muted-foreground">Protected by SSL</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Instant Delivery</p>
                <p className="text-muted-foreground">Code sent immediately</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">100% Authentic</p>
                <p className="text-muted-foreground">Official product keys</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="requirements">System Requirements</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: product.longDescription }}
          />
        </TabsContent>
        <TabsContent value="requirements" className="mt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Info className="mr-2 h-4 w-4" />
                Minimum Requirements
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">OS:</span>
                  <span>{product.systemRequirements.minimum.os}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Processor:</span>
                  <span>{product.systemRequirements.minimum.processor}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Memory:</span>
                  <span>{product.systemRequirements.minimum.memory}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Graphics:</span>
                  <span>{product.systemRequirements.minimum.graphics}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage:</span>
                  <span>{product.systemRequirements.minimum.storage}</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Info className="mr-2 h-4 w-4" />
                Recommended Requirements
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">OS:</span>
                  <span>{product.systemRequirements.recommended.os}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Processor:</span>
                  <span>{product.systemRequirements.recommended.processor}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Memory:</span>
                  <span>{product.systemRequirements.recommended.memory}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Graphics:</span>
                  <span>{product.systemRequirements.recommended.graphics}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Storage:</span>
                  <span>{product.systemRequirements.recommended.storage}</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <ProductReviews productId={id} />
        </TabsContent>
      </Tabs>

      <Separator className="my-12" />

      <section>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProducts productId={id} category={product.category} />
      </section>
    </div>
  )
}

