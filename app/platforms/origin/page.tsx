import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGrid } from "@/components/product-grid"
import { mockProducts } from "@/lib/mock-data"

export default function OriginPage() {
  // Filter products to show only Origin platform
  const originProducts = mockProducts.filter((product) => product.platforms?.includes("Origin"))

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Platforms", href: "/platforms" },
          { label: "Origin", href: "/platforms/origin" },
        ]}
      />
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">EA Origin</h1>
        <p className="mt-2 text-muted-foreground">Browse our collection of games available on EA's Origin platform.</p>
      </div>
      <ProductGrid products={originProducts} />
    </div>
  )
}
