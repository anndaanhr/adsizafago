import { Breadcrumb } from "@/components/breadcrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReturnsPage() {
  // Return policy steps
  const returnSteps = [
    {
      title: "Contact Customer Support",
      description: "Reach out to our customer support team within 14 days of purchase to initiate a return request.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
    },
    {
      title: "Provide Order Details",
      description: "Share your order number, purchase date, and reason for return with our support team.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" x2="8" y1="13" y2="13"></line>
          <line x1="16" x2="8" y1="17" y2="17"></line>
          <line x1="10" x2="8" y1="9" y2="9"></line>
        </svg>
      ),
    },
    {
      title: "Receive Confirmation",
      description: "Our team will review your request and send a confirmation email with next steps.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      ),
    },
    {
      title: "Refund Processing",
      description:
        "Once approved, your refund will be processed to your original payment method within 5-7 business days.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
          <line x1="2" x2="22" y1="10" y2="10"></line>
        </svg>
      ),
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "What is your return policy for digital products?",
      answer:
        "For digital products, we offer a 14-day return period if the product has not been activated or downloaded. Once a digital key has been revealed, downloaded, or activated, it cannot be returned due to the nature of digital goods.",
    },
    {
      question: "How long does it take to process a refund?",
      answer:
        "Once your return is approved, refunds typically take 5-7 business days to process back to your original payment method. The exact timing may depend on your payment provider or bank.",
    },
    {
      question: "Can I exchange a product instead of returning it?",
      answer:
        "Yes, we offer exchanges for products of equal or greater value. If you choose a product of greater value, you'll need to pay the difference. Contact our customer support to arrange an exchange.",
    },
    {
      question: "Do you offer refunds for subscription services?",
      answer:
        "For subscription services, you can request a refund within 14 days of the initial purchase or renewal. Partial refunds may be provided for unused subscription periods at our discretion.",
    },
    {
      question: "What if I received a defective product?",
      answer:
        "If you received a defective product, please contact our customer support immediately. We'll either provide a replacement or issue a full refund, depending on product availability.",
    },
    {
      question: "Can I return a gift card?",
      answer:
        "Gift cards and store credits are non-refundable and cannot be returned for cash value. However, they can be used to purchase any product on our platform.",
    },
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Returns", href: "/returns" },
        ]}
      />

      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Returns & Refunds</h1>
        <p className="mt-2 text-muted-foreground">
          Learn about our return policy and how to request a refund for your purchase.
        </p>
      </div>

      {/* Return Policy Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Return Policy Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              At Zafago, we want you to be completely satisfied with your purchase. If you're not happy with your order,
              we offer a straightforward return policy to ensure your shopping experience remains positive.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Digital Products</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>14-day return period</li>
                  <li>Product must not be activated or downloaded</li>
                  <li>Once a key is revealed, it cannot be returned</li>
                  <li>Refund to original payment method</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Physical Products</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>30-day return period</li>
                  <li>Product must be in original packaging</li>
                  <li>Return shipping costs may apply</li>
                  <li>Refund or exchange available</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Return Process */}
      <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {returnSteps.map((step, index) => (
          <Card key={index} className="border-t-4 border-t-primary">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">{step.icon}</div>
                <h3 className="font-semibold mb-2">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Initiate Return */}
      <Card className="mb-8 bg-primary/5 border-primary">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready to initiate a return?</h3>
              <p className="text-muted-foreground">
                Our customer support team is here to help you with your return request.
              </p>
            </div>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/help">View Help Center</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="mb-8">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Additional Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">Additional Information</h3>
          <p className="mb-4">
            For any questions or concerns about our return policy, please don't hesitate to contact our customer support
            team. We're committed to providing excellent service and ensuring your satisfaction with every purchase.
          </p>
          <p className="text-sm text-muted-foreground">
            This return policy was last updated on May 1, 2025. Zafago reserves the right to modify this policy at any
            time. Any changes will be effective immediately upon posting on this page.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
