import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" },
        ]}
      />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 27, 2025</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            At Zafago, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or make purchases through our platform. Please read
            this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not
            access the site.
          </p>

          <h2>1. Collection of Your Information</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>

          <h3>1.1. Personal Data</h3>
          <p>
            Personally identifiable information that you voluntarily provide when registering for our platform or
            purchasing products, such as your:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing information</li>
            <li>Payment details (processed securely through our payment processors)</li>
          </ul>

          <h3>1.2. Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access our platform, such as your IP address, browser
            type, operating system, access times, and the pages you have viewed directly before and after accessing the
            platform.
          </p>

          <h3>1.3. Financial Data</h3>
          <p>
            Financial information, such as data related to your payment method (e.g., valid credit card number, card
            brand, expiration date) that we may collect when you purchase, order, return, exchange, or request
            information about our services. We store only very limited, if any, financial information that we collect.
            Otherwise, all financial information is stored by our payment processors.
          </p>

          <h3>1.4. Data From Social Networks</h3>
          <p>
            User information from social networking sites, such as name, your social network username, location, gender,
            birth date, email address, profile picture, and public data for contacts, if you connect your account to
            such social networks.
          </p>

          <h2>2. Use of Your Information</h2>
          <p>We may use information collected about you for the following purposes:</p>
          <ul>
            <li>To create and manage your account</li>
            <li>To process and fulfill your orders</li>
            <li>
              To send you administrative information, such as order confirmations and updates to terms and policies
            </li>
            <li>To respond to your comments, questions, and requests</li>
            <li>To personalize your experience and deliver content and product offerings relevant to your interests</li>
            <li>To send you marketing and promotional communications (with your consent)</li>
            <li>To monitor and analyze usage and trends to improve our platform and services</li>
            <li>To protect our platform, users, and the public</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be
            disclosed as follows:
          </p>

          <h3>3.1. By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate
            or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we
            may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>

          <h3>3.2. Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, including
            payment processing, data analysis, email delivery, hosting services, customer service, and marketing
            assistance.
          </p>

          <h3>3.3. Marketing Communications</h3>
          <p>
            With your consent, or with an opportunity for you to withdraw consent, we may share your information with
            third parties for marketing purposes.
          </p>

          <h3>3.4. Business Transfers</h3>
          <p>
            If we or our assets are acquired by another company, that company will possess the personal information
            collected by us and will assume the rights and obligations regarding your personal information as described
            in this Privacy Policy.
          </p>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that despite our efforts, no security measures are perfect or impenetrable, and no method of data
            transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>5. Your Rights Regarding Your Information</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access the personal information we have about you</li>
            <li>The right to request that we correct or update any personal information we have about you</li>
            <li>The right to request that we delete any personal information we have about you</li>
            <li>The right to object to the processing of your personal information</li>
            <li>The right to request that we restrict the processing of your personal information</li>
            <li>The right to data portability</li>
          </ul>

          <h2>6. Cookies and Web Beacons</h2>
          <p>
            We may use cookies, web beacons, tracking pixels, and other tracking technologies on our platform to help
            customize the platform and improve your experience. For more information on how we use cookies, please refer
            to our Cookie Policy.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our platform is not intended for use by children under the age of 13. We do not knowingly collect or solicit
            personal information from children under 13. If we learn we have collected personal information from a child
            under 13, we will delete that information as quickly as possible.
          </p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time in order to reflect, for example, changes to our
            practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by
            an updated "Last updated" date. Your continued use of the platform after the effective date of the revised
            privacy policy constitutes your acceptance of the revised policy.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:privacy@zafago.com">privacy@zafago.com</a>
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
