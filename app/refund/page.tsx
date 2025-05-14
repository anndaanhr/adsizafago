import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function RefundPolicyPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Refund Policy", href: "/refund" },
        ]}
      />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
          <p className="text-muted-foreground">Last updated: March 27, 2025</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            At Zafago, we strive to ensure your satisfaction with every purchase. This Refund Policy outlines the terms
            and conditions for refunds on digital products purchased through our platform.
          </p>

          <h2>Digital Product Refund Policy</h2>
          <p>
            Due to the nature of digital products, all sales are generally considered final once the digital code has
            been revealed or redeemed. However, we understand that issues can arise, and we're committed to resolving
            them fairly.
          </p>

          <h3>Eligible Refund Scenarios</h3>
          <p>We may provide refunds in the following situations:</p>
        </div>

        <div className="grid gap-4">
          <Card className="border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Non-Working Product Keys</h3>
                  <p className="text-muted-foreground">
                    If the digital code you received is invalid, already redeemed, or otherwise non-functional, we will
                    provide a replacement code or a full refund after verification.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Product Not as Described</h3>
                  <p className="text-muted-foreground">
                    If the product significantly differs from its description on our platform, you may be eligible for a
                    refund after our team reviews the case.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Duplicate Purchase</h3>
                  <p className="text-muted-foreground">
                    If you accidentally purchased the same product twice in a short timeframe, we may refund the
                    duplicate purchase if the code has not been revealed or redeemed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Technical Issues</h3>
                  <p className="text-muted-foreground">
                    If you experience technical issues with our platform that resulted in an unintended purchase, we
                    will review the case and may provide a refund.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h3>Non-Refundable Scenarios</h3>
          <p>Refunds are generally not provided in the following situations:</p>
        </div>

        <div className="grid gap-4">
          <Card className="border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Redeemed Codes</h3>
                  <p className="text-muted-foreground">
                    Once a digital code has been revealed and/or redeemed, we cannot provide a refund as the product has
                    been delivered and used.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Change of Mind</h3>
                  <p className="text-muted-foreground">
                    We do not provide refunds if you simply change your mind about a purchase or no longer want the
                    product.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Compatibility Issues</h3>
                  <p className="text-muted-foreground">
                    Refunds are not provided if your system does not meet the minimum requirements specified on the
                    product page or if you experience compatibility issues with your hardware or software.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Delayed Redemption</h3>
                  <p className="text-muted-foreground">
                    If you purchase a product but wait an extended period (more than 30 days) before attempting to
                    redeem it, we may not be able to provide a refund if issues arise.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Refund Process</h2>
          <p>If you believe you are eligible for a refund, please follow these steps:</p>
          <ol>
            <li>Contact our customer support team within 14 days of purchase.</li>
            <li>Provide your order number and details about the issue you're experiencing.</li>
            <li>Our team will review your request and respond within 2-3 business days.</li>
            <li>If approved, refunds will be processed to the original payment method used for the purchase.</li>
          </ol>

          <h2>Refund Timeframe</h2>
          <p>Once a refund is approved:</p>
          <ul>
            <li>
              Credit/debit card refunds typically take 5-10 business days to appear on your statement, depending on your
              card issuer.
            </li>
            <li>PayPal refunds are usually processed within 1-3 business days.</li>
            <li>Other payment methods may vary in processing time.</li>
          </ul>

          <h2>Special Circumstances</h2>
          <p>
            We understand that special circumstances may arise. If you have a unique situation not covered by this
            policy, please contact our customer support team, and we will review your case individually.
          </p>
        </div>

        <Card className="border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg mb-2">Important Note About Chargebacks</h3>
                <p className="text-muted-foreground">
                  We strongly encourage customers to contact our support team before initiating a chargeback with their
                  payment provider. Unauthorized chargebacks may result in account suspension and additional fees. We
                  are committed to resolving issues fairly and efficiently through our support channels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                <span>Frequently Asked Questions About Refunds</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <h3 className="font-medium">How long do I have to request a refund?</h3>
                <p className="text-muted-foreground">
                  We recommend requesting a refund within 14 days of purchase. Requests made after this period may still
                  be considered but are less likely to be approved.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Can I get a refund if I purchased the wrong product?</h3>
                <p className="text-muted-foreground">
                  If you purchased the wrong product and have not revealed or redeemed the code, we may be able to
                  provide a refund or exchange. Contact our support team as soon as possible.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">What information do I need to provide for a refund request?</h3>
                <p className="text-muted-foreground">
                  You should provide your order number, the email address used for the purchase, and a detailed
                  description of the issue you're experiencing. Screenshots or error messages are also helpful.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Can I get a partial refund?</h3>
                <p className="text-muted-foreground">
                  In some cases, we may offer partial refunds, particularly for bundles where only some items are
                  affected by issues. Each case is reviewed individually.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-muted p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Need Help with a Refund?</h2>
          <p className="text-muted-foreground mb-4">
            Our customer support team is ready to assist you with any questions about our refund policy or to help with
            a refund request.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
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
