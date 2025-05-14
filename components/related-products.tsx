"use client"

import { useEffect, useState } from "react"
import { ProductGrid } from "@/components/product-grid"

interface RelatedProductsProps {
  productId: string
  category: string
}

export function RelatedProducts({ productId, category }: RelatedProductsProps) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch related products
    setLoading(true)
    setTimeout(() => {
      // Generate mock related products
      const mockProducts = Array.from({ length: 4 }, (_, i) => ({
        id: `related-${i}`,
        title: `Related ${category === "software" ? "Software" : "Game"} ${i + 1}`,
        image: `/placeholder.svg?height=300&width=300&text=Related+${i + 1}`,
        price: Math.floor(Math.random() * 60) + 20,
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0,
        platform: ["Steam", "Epic Games", "Origin", "Battle.net", "Windows"][Math.floor(Math.random() * 5)],
      }))

      setProducts(mockProducts)
      setLoading(false)
    }, 500)
  }, [productId, category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-muted animate-pulse h-[300px]"></div>
        ))}
      </div>
    )
  }

  return <ProductGrid products={products} />
}
