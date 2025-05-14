import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Separator } from "@/components/ui/separator"

export default function LicensesPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Licenses", href: "/licenses" },
        ]}
      />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Licenses</h1>
          <p className="text-muted-foreground">
            Information about the licenses for software and digital products sold on Zafago.
          </p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Software Licenses</h2>
          <p>
            Zafago is an authorized reseller of digital products and software licenses. When you purchase software
            through our platform, you are purchasing a license to use the software according to the terms set by the
            software publisher or developer. Zafago does not own or create the software we sell, and the use of the
            software is governed by the End User License Agreement (EULA) provided by the software publisher.
          </p>

          <h3>Types of Licenses</h3>
          <p>We offer various types of software licenses, including but not limited to:</p>

          <h4>1. Single-User Licenses</h4>
          <p>
            These licenses allow the software to be installed and used on a single device by a single user. Some
            publishers may allow installation on multiple devices as long as the software is only used by one person at
            a time.
          </p>

          <h4>2. Multi-User Licenses</h4>
          <p>
            These licenses allow the software to be installed and used on multiple devices by multiple users
            simultaneously. The number of allowed users is specified in the license terms.
          </p>

          <h4>3. Subscription Licenses</h4>
          <p>
            These licenses grant access to the software for a specific period (e.g., monthly, annually). Continued use
            of the software requires renewal of the subscription.
          </p>

          <h4>4. Perpetual Licenses</h4>
          <p>
            These licenses allow indefinite use of the specific version of the software purchased. They may or may not
            include updates or support beyond a certain period.
          </p>

          <h4>5. Volume Licenses</h4>
          <p>
            These are designed for organizations and allow installation of the software on multiple devices within the
            organization, often at a discounted rate compared to purchasing individual licenses.
          </p>

          <Separator className="my-8" />

          <h2>Game Licenses</h2>
          <p>
            When you purchase a game through Zafago, you are typically purchasing a license key or digital code that
            grants you access to download and play the game on a specific platform (e.g., Steam, Epic Games, Origin).
            Your use of the game is subject to the terms and conditions set by both the game publisher and the platform
            provider.
          </p>

          <h3>Platform-Specific Information</h3>

          <h4>Steam</h4>
          <p>
            Games purchased for Steam require a Steam account. By redeeming a Steam key, you agree to the{" "}
            <a href="https://store.steampowered.com/subscriber_agreement/" target="_blank" rel="noopener noreferrer">
              Steam Subscriber Agreement
            </a>
            .
          </p>

          <h4>Epic Games</h4>
          <p>
            Games purchased for the Epic Games Store require an Epic Games account. By redeeming an Epic Games key, you
            agree to the{" "}
            <a href="https://www.epicgames.com/store/en-US/eula" target="_blank" rel="noopener noreferrer">
              Epic Games Store End User License Agreement
            </a>
            .
          </p>

          <h4>Origin / EA App</h4>
          <p>
            Games purchased for Origin or the EA App require an EA account. By redeeming an EA key, you agree to the{" "}
            <a href="https://terms.ea.com/" target="_blank" rel="noopener noreferrer">
              EA User Agreement
            </a>
            .
          </p>

          <h4>Ubisoft Connect</h4>
          <p>
            Games purchased for Ubisoft Connect require a Ubisoft account. By redeeming a Ubisoft key, you agree to the{" "}
            <a href="https://legal.ubi.com/termsofuse/" target="_blank" rel="noopener noreferrer">
              Ubisoft Terms of Use
            </a>
            .
          </p>

          <Separator className="my-8" />

          <h2>Digital Content Licenses</h2>
          <p>
            Other digital content sold on Zafago, such as digital gift cards, in-game currency, and subscription codes,
            are subject to the terms and conditions set by the respective service providers. By purchasing and redeeming
            these products, you agree to comply with these terms.
          </p>

          <h2>License Verification</h2>
          <p>
            All licenses sold on Zafago are sourced from authorized distributors and publishers. We guarantee the
            authenticity and legitimacy of all license keys and digital codes sold on our platform. If you encounter any
            issues with a license key or digital code purchased from Zafago, please contact our customer support team
            immediately.
          </p>

          <h2>License Transfer and Resale</h2>
          <p>
            The transfer and resale of license keys and digital codes purchased from Zafago are generally prohibited
            unless explicitly permitted by the publisher or developer. Unauthorized resale of license keys may result in
            the deactivation of the license without refund.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about the licenses for products sold on Zafago, please contact our customer
            support team at <a href="mailto:support@zafago.com">support@zafago.com</a>.
          </p>
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
