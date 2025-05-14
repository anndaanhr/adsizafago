import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGrid } from "@/components/product-grid"
import { mockProducts } from "@/lib/mock-data"

export default function PlayStationPage() {
  // Filter products to show only PlayStation platform
  const playstationProducts = mockProducts.filter((product) => product.platforms?.includes("PlayStation"))

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Platforms", href: "/platforms" },
          { label: "PlayStation", href: "/platforms/playstation" },
        ]}
      />
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">PlayStation Games</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our collection of games and gift cards for PlayStation consoles.
        </p>
      </div>
      <ProductGrid products={playstationProducts} />
    </div>
  )
}
