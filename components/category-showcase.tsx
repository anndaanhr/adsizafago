import Link from "next/link"
import { ArrowRight, Gamepad2, MonitorPlay, Gift, CreditCard } from "lucide-react"

export function CategoryShowcase() {
  const categories = [
    {
      title: "Games",
      description: "Digital game codes for Steam, Epic, and more",
      image: "/placeholder.svg?height=300&width=300&text=Games",
      href: "/products?category=games",
      color: "bg-blue-500/10 dark:bg-blue-500/20",
      textColor: "text-blue-500",
      icon: Gamepad2,
    },
    {
      title: "Software",
      description: "Operating systems, office suites, and creative tools",
      image: "/placeholder.svg?height=300&width=300&text=Software",
      href: "/products?category=software",
      color: "bg-purple-500/10 dark:bg-purple-500/20",
      textColor: "text-purple-500",
      icon: MonitorPlay,
    },
    {
      title: "Gift Cards",
      description: "Top up your wallet on various platforms",
      image: "/placeholder.svg?height=300&width=300&text=Gift+Cards",
      href: "/products?category=wallet",
      color: "bg-green-500/10 dark:bg-green-500/20",
      textColor: "text-green-500",
      icon: Gift,
    },
    {
      title: "Subscriptions",
      description: "Game passes and premium memberships",
      image: "/placeholder.svg?height=300&width=300&text=Subscriptions",
      href: "/products?category=subscription",
      color: "bg-amber-500/10 dark:bg-amber-500/20",
      textColor: "text-amber-500",
      icon: CreditCard,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => {
        const Icon = category.icon

        return (
          <Link
            key={category.title}
            href={category.href}
            className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
          >
            <div className="flex flex-col h-full">
              <div
                className={`absolute top-0 right-0 h-24 w-24 -mr-8 -mt-8 rounded-full ${category.color} blur-2xl opacity-70 transition-opacity group-hover:opacity-100`}
              />

              <div className={`relative h-12 w-12 ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${category.textColor}`} />
              </div>

              <h3 className={`text-xl font-semibold mb-2 ${category.textColor}`}>{category.title}</h3>
              <p className="text-muted-foreground text-sm flex-1">{category.description}</p>

              <div className="mt-4 flex items-center text-sm font-medium">
                <span className={`${category.textColor}`}>Browse {category.title}</span>
                <ArrowRight
                  className={`ml-1 h-4 w-4 ${category.textColor} transition-transform group-hover:translate-x-1`}
                />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
