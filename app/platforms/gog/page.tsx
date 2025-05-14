import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGrid } from "@/components/product-grid"
import { mockProducts } from "@/lib/mock-data"

export default function GOGPage() {
  // Filter products to show only GOG platform
  const gogProducts = mockProducts.filter((product) => product.platforms?.includes("GOG"))

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Platforms", href: "/platforms" },
          { label: "GOG", href: "/platforms/gog" },
        ]}
      />
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">GOG.com</h1>
        <p className="mt-2 text-muted-foreground">Browse our collection of DRM-free games available on GOG.com.</p>
      </div>
      <ProductGrid products={gogProducts} />
    </div>
  )
}
