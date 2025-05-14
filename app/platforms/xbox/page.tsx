import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGrid } from "@/components/product-grid"
import { mockProducts } from "@/lib/mock-data"

export default function XboxPage() {
  // Filter products to show only Xbox platform
  const xboxProducts = mockProducts.filter((product) => product.platforms?.includes("Xbox"))

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Platforms", href: "/platforms" },
          { label: "Xbox", href: "/platforms/xbox" },
        ]}
      />
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Xbox Games</h1>
        <p className="mt-2 text-muted-foreground">Browse our collection of games and gift cards for Xbox consoles.</p>
      </div>
      <ProductGrid products={xboxProducts} />
    </div>
  )
}
