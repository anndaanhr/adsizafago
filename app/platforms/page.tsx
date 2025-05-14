import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PlatformsPage() {
  // Platform data
  const platforms = [
    {
      id: "steam",
      name: "Steam",
      description: "Browse our collection of Steam games and software with instant key delivery.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-700"
        >
          <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"></path>
          <path d="M16.24 7.76a6 6 0 1 0-8.48 8.48"></path>
          <path d="M12 18v-4"></path>
          <path d="M8 10l4 4"></path>
          <path d="M16 10l-4 4"></path>
        </svg>
      ),
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-100",
      buttonColor: "text-blue-700 border-blue-200 hover:bg-blue-50",
      count: 1500,
    },
    {
      id: "epic",
      name: "Epic Games",
      description: "Get the latest Epic Games Store titles and exclusives at competitive prices.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-700"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      color: "bg-purple-50 border-purple-200",
      iconBg: "bg-purple-100",
      buttonColor: "text-purple-700 border-purple-200 hover:bg-purple-50",
      count: 850,
    },
    {
      id: "origin",
      name: "EA Origin",
      description: "Access EA's extensive catalog of games through Origin with instant delivery.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-700"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
      ),
      color: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-100",
      buttonColor: "text-orange-700 border-orange-200 hover:bg-orange-50",
      count: 650,
    },
    {
      id: "uplay",
      name: "Ubisoft Connect",
      description: "Find Ubisoft titles for Ubisoft Connect (formerly Uplay) at great prices.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500"
        >
          <path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c-1 .6-1.7 1.8-1.7 3s.7 2.4 1.7 3c-.3 1.2 0 2.5 1 3.4.8.8 2.1 1.2 3.3 1 .6 1 1.8 1.6 3 1.6s2.4-.6 3-1.7c1.2.3 2.5 0 3.4-1 .8-.8 1.2-2 1-3.3 1-.6 1.7-1.8 1.7-3s-.7-2.4-1.7-3c.3-1.2 0-2.5-1-3.4-.8-.8-2.1-1.2-3.3-1-.6-1-1.8-1.6-3-1.6Z"></path>
          <path d="M12 11v6"></path>
          <path d="M8 11v6"></path>
          <path d="M16 11v6"></path>
        </svg>
      ),
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-100",
      buttonColor: "text-blue-500 border-blue-200 hover:bg-blue-50",
      count: 450,
    },
    {
      id: "gog",
      name: "GOG.com",
      description: "DRM-free games from GOG.com with full offline support and no restrictions.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-indigo-700"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8"></path>
          <path d="M12 8v8"></path>
        </svg>
      ),
      color: "bg-indigo-50 border-indigo-200",
      iconBg: "bg-indigo-100",
      buttonColor: "text-indigo-700 border-indigo-200 hover:bg-indigo-50",
      count: 750,
    },
    {
      id: "xbox",
      name: "Xbox",
      description: "Xbox games, gift cards, and subscriptions for console and PC gaming.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-700"
        >
          <path d="M6.7 4.7C8.2 3.5 10 2.8 12 2.8s3.8.7 5.3 1.9c1.3 1 2.9 2.8 2.9 2.8s-3.6-1.8-4.8-1.8c-.5 0-.9.1-1.4.3-.7.3-1.4.9-2 1.5-.6-.6-1.3-1.2-2-1.5-.5-.2-.9-.3-1.4-.3-1.2 0-4.8 1.8-4.8 1.8s1.6-1.8 2.9-2.8Z"></path>
          <path d="m20 14.5-2.9-2.9c-2.3-2.3-6-2.3-8.3 0L6 14.5"></path>
          <path d="m4 9.2 2.9 2.9c2.3 2.3 6 2.3 8.3 0l2.8-2.9"></path>
          <path d="M4 14.5V9.2c0-1.4.5-2.7 1.4-3.7"></path>
          <path d="M20 14.5V9.2c0-1.4-.5-2.7-1.4-3.7"></path>
          <path d="M4 14.5c0 1.4.5 2.7 1.4 3.7l3.3 3.3c.7.7 1.6 1.2 2.6 1.3.5.1 1 .1 1.5 0 1-.1 1.9-.6 2.6-1.3l3.3-3.3c.9-1 1.4-2.3 1.4-3.7"></path>
        </svg>
      ),
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-100",
      buttonColor: "text-green-700 border-green-200 hover:bg-green-50",
      count: 550,
    },
    {
      id: "playstation",
      name: "PlayStation",
      description: "PlayStation games, PSN cards, and subscriptions for console gaming.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-800"
        >
          <path d="M6.5 19h11"></path>
          <path d="M17.5 19a3.5 3.5 0 0 0 0-7h-10a3.5 3.5 0 0 1 0-7h11"></path>
        </svg>
      ),
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-100",
      buttonColor: "text-blue-800 border-blue-200 hover:bg-blue-50",
      count: 600,
    },
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Platforms", href: "/platforms" },
        ]}
      />

      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Gaming Platforms</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our extensive collection of games across all major gaming platforms.
        </p>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {platforms.map((platform) => (
          <Card key={platform.id} className={`overflow-hidden border ${platform.color}`}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <div className={`p-3 rounded-full ${platform.iconBg} mb-4`}>{platform.icon}</div>
                <h2 className="text-xl font-bold mb-1">{platform.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{platform.description}</p>
                <div className="text-sm font-medium mb-4">{platform.count}+ Products Available</div>
                <Button className={`w-full ${platform.buttonColor}`} variant="outline" asChild>
                  <Link href={`/platforms/${platform.id}`}>Browse {platform.name}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Comparison */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Platform Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-left font-medium">Platform</th>
                <th className="p-3 text-left font-medium">Digital Only</th>
                <th className="p-3 text-left font-medium">Offline Play</th>
                <th className="p-3 text-left font-medium">Cloud Saves</th>
                <th className="p-3 text-left font-medium">Subscription</th>
                <th className="p-3 text-left font-medium">Cross-Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">Steam</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">No</td>
                <td className="p-3">Limited</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Epic Games</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">No</td>
                <td className="p-3">Limited</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Origin</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">EA Play</td>
                <td className="p-3">Limited</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Ubisoft Connect</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Ubisoft+</td>
                <td className="p-3">Limited</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">GOG</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes (DRM-free)</td>
                <td className="p-3">Yes</td>
                <td className="p-3">No</td>
                <td className="p-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Xbox</td>
                <td className="p-3">No</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Game Pass</td>
                <td className="p-3">Yes</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">PlayStation</td>
                <td className="p-3">No</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Yes</td>
                <td className="p-3">PS Plus</td>
                <td className="p-3">Limited</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform FAQ */}
      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Platform FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How do digital keys work?</h3>
            <p className="text-sm text-muted-foreground">
              When you purchase a digital key from Zafago, you'll receive a unique activation code that you can redeem
              on the corresponding platform. This will add the game or software to your library permanently.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use a Steam key on Epic Games Store?</h3>
            <p className="text-sm text-muted-foreground">
              No, platform keys are specific to their respective platforms. A Steam key can only be redeemed on Steam,
              an Epic key only on Epic Games Store, and so on.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Are there region restrictions for platform keys?</h3>
            <p className="text-sm text-muted-foreground">
              Some keys may have regional restrictions. We clearly mark any regional limitations on the product page.
              Most of our keys are global, but always check the product details before purchasing.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I redeem my key?</h3>
            <p className="text-sm text-muted-foreground">
              Each platform has its own redemption process. Generally, you'll need to log into your account on the
              platform, find the "Redeem" or "Activate Product" option, and enter your key. Detailed instructions are
              provided with your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
