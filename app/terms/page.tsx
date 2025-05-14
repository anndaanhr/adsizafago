import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"

export default function TermsOfServicePage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Terms of Service", href: "/terms" },
        ]}
      />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: March 27, 2025</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            Welcome to Zafago. These Terms of Service ("Terms") govern your access to and use of the Zafago website,
            services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to
            be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account, making a purchase, or otherwise accessing or using our Services, you acknowledge
            that you have read, understood, and agree to be bound by these Terms. If you are using the Services on
            behalf of an organization, you represent and warrant that you have the authority to bind that organization
            to these Terms.
          </p>

          <h2>2. Account Registration</h2>
          <p>
            To access certain features of the Services, you may be required to register for an account. You agree to
            provide accurate, current, and complete information during the registration process and to update such
            information to keep it accurate, current, and complete. You are responsible for safeguarding your account
            credentials and for all activities that occur under your account. You agree to notify us immediately of any
            unauthorized use of your account.
          </p>

          <h2>3. Purchases and Payments</h2>
          <p>
            3.1. <strong>Digital Products</strong>: Zafago sells digital products, including but not limited to game
            codes, software licenses, and digital gift cards. All sales are final, and we do not offer refunds except as
            required by applicable law or as expressly stated in our Refund Policy.
          </p>
          <p>
            3.2. <strong>Pricing and Availability</strong>: All prices are shown in the currency indicated on the
            website. We reserve the right to change prices and availability of products at any time without notice.
          </p>
          <p>
            3.3. <strong>Payment Processing</strong>: We use third-party payment processors to process payments. By
            making a purchase, you agree to the terms and privacy policies of these payment processors.
          </p>

          <h2>4. Product Keys and Digital Codes</h2>
          <p>
            4.1. <strong>Delivery</strong>: Digital codes and product keys will be delivered to the email address
            associated with your account immediately after purchase, unless otherwise specified.
          </p>
          <p>
            4.2. <strong>Redemption</strong>: You are responsible for redeeming digital codes and product keys according
            to the instructions provided. We are not responsible for codes that expire before redemption or for any
            issues that arise during the redemption process with third-party platforms.
          </p>
          <p>
            4.3. <strong>Restrictions</strong>: Digital codes and product keys are for personal use only and may not be
            resold, transferred, or distributed without our express written permission.
          </p>

          <h2>5. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Services in any way that violates any applicable law or regulation</li>
            <li>
              Attempt to probe, scan, or test the vulnerability of our systems or networks or breach any security or
              authentication measures
            </li>
            <li>
              Attempt to access or search the Services by any means other than through our publicly supported interfaces
            </li>
            <li>Engage in any automated use of the system, such as using scripts to send comments or messages</li>
            <li>Interfere with, or disrupt, the access of any user, host, or network</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            6.1. <strong>Our Content</strong>: The Services and their original content, features, and functionality are
            owned by Zafago and are protected by international copyright, trademark, patent, trade secret, and other
            intellectual property or proprietary rights laws.
          </p>
          <p>
            6.2. <strong>Third-Party Content</strong>: The Services may display content from third parties, including
            other users and partners. Such content is the sole responsibility of the entity that makes it available.
          </p>

          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Services immediately, without prior notice or
            liability, for any reason, including, without limitation, if you breach these Terms. Upon termination, your
            right to use the Services will immediately cease.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, AND NON-INFRINGEMENT.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL ZAFAGO, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS,
            DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO
            ACCESS OR USE THE SERVICES.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
            Zafago is established, without regard to its conflict of law provisions.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
            provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
            will be determined at our sole discretion.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@zafago.com">legal@zafago.com</a>.
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
