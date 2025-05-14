import Link from "next/link"
import { ArrowLeft, Shield, Lock, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"

export default function SecurityPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Security", href: "/security" },
        ]}
      />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Security Measures</h1>
          <p className="text-muted-foreground">
            Learn about how we protect your data and ensure secure transactions on Zafago.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Data Protection</h3>
                  <p className="text-muted-foreground">
                    We employ industry-standard encryption protocols to protect your personal and financial information.
                    All data is encrypted both in transit and at rest using AES-256 encryption.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
                  <p className="text-muted-foreground">
                    We implement robust authentication mechanisms, including multi-factor authentication options, to
                    ensure that only authorized users can access accounts. Our password policies enforce strong
                    credentials.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Security</h3>
                  <p className="text-muted-foreground">
                    All payment processing is handled by trusted third-party payment processors that comply with PCI DSS
                    standards. We never store your complete credit card information on our servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fraud Prevention</h3>
                  <p className="text-muted-foreground">
                    We employ advanced fraud detection systems to monitor transactions and account activities for
                    suspicious behavior, protecting both our customers and our platform from fraudulent activities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Our Security Commitment</h2>
          <p>
            At Zafago, we prioritize the security of your personal information and transactions. We continuously update
            our security measures to address emerging threats and vulnerabilities. Our security practices include:
          </p>

          <ul>
            <li>Regular security audits and penetration testing by independent security experts</li>
            <li>Compliance with relevant data protection regulations, including GDPR and CCPA</li>
            <li>Continuous monitoring of our systems for unauthorized access attempts</li>
            <li>Employee training on security best practices and data handling procedures</li>
            <li>Secure development practices to minimize vulnerabilities in our code</li>
          </ul>

          <h2>SSL Encryption</h2>
          <p>
            Our website uses Secure Socket Layer (SSL) encryption technology to protect the transmission of all
            sensitive information. You can verify this by looking for the padlock icon in your browser's address bar and
            the "https://" prefix in our URL.
          </p>

          <h2>Account Security Tips</h2>
          <p>We recommend the following practices to help keep your Zafago account secure:</p>

          <ul>
            <li>Use a strong, unique password for your Zafago account</li>
            <li>Enable multi-factor authentication if available</li>
            <li>Never share your account credentials with others</li>
            <li>Be cautious of phishing attempts—we will never ask for your password via email</li>
            <li>Regularly review your account activity and transaction history</li>
            <li>Keep your device's operating system and browser updated</li>
            <li>Log out of your account when using shared or public computers</li>
          </ul>

          <h2>Reporting Security Issues</h2>
          <p>
            If you discover a security vulnerability on our platform or suspect unauthorized access to your account,
            please contact our security team immediately at <a href="mailto:security@zafago.com">security@zafago.com</a>
            .
          </p>

          <h2>Security Updates</h2>
          <p>
            We continuously review and update our security measures to ensure the highest level of protection for our
            users. This security page may be updated periodically to reflect changes in our security practices.
          </p>
        </div>

        <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Our Security Guarantee</h3>
              <p className="text-muted-foreground">
                We are committed to providing a secure platform for all our users. If you ever experience a security
                issue related to our platform, our dedicated security team will work with you to resolve it promptly and
                effectively.
              </p>
            </div>
          </div>
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
