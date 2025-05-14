import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGrid } from "@/components/product-grid"
import { mockProducts } from "@/lib/mock-data"

export default function UplayPage() {
  // Filter products to show only Uplay platform
  const uplayProducts = mockProducts.filter((product) => product.platforms?.includes("Uplay"))

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Platforms", href: "/platforms" },
          { label: "Uplay", href: "/platforms/uplay" },
        ]}
      />
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Ubisoft Connect (Uplay)</h1>
        <p className="mt-2 text-muted-foreground">Browse our collection of games available on Ubisoft Connect.</p>
      </div>
      <ProductGrid products={uplayProducts} />
    </div>
  )
}
