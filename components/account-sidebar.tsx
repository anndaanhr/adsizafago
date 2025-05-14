"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, Package, Heart, CreditCard, Bell, Settings, LogOut, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"

export function AccountSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const menuItems = [
    {
      title: "Account",
      items: [
        {
          label: "Profile",
          href: "/account",
          icon: User,
        },
        {
          label: "Orders",
          href: "/account/orders",
          icon: Package,
        },
        {
          label: "Wishlist",
          href: "/account/wishlist",
          icon: Heart,
        },
        {
          label: "Payment Methods",
          href: "/account/payment",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          label: "Notifications",
          href: "/account/notifications",
          icon: Bell,
        },
        {
          label: "Security",
          href: "/account/security",
          icon: ShieldCheck,
        },
        {
          label: "Preferences",
          href: "/account/settings",
          icon: Settings,
        },
      ],
    },
  ]

  return (
    <Card className="p-4">
      <div className="space-y-6">
        {menuItems.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{section.title}</h3>
            <nav className="flex flex-col space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}

        <div className="pt-4">
          <Button variant="destructive" className="w-full" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </Card>
  )
}
