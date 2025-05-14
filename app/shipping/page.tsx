import { Breadcrumb } from "@/components/breadcrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ShippingPage() {
  // Shipping methods
  const shippingMethods = [
    {
      name: "Standard Shipping",
      time: "3-5 business days",
      price: "$4.99",
      description: "Our most economical shipping option for physical merchandise.",
    },
    {
      name: "Express Shipping",
      time: "2-3 business days",
      price: "$9.99",
      description: "Faster delivery for when you need your items sooner.",
    },
    {
      name: "Next Day Shipping",
      time: "1 business day",
      price: "$19.99",
      description: "Get your items delivered the next business day when ordered before 2 PM.",
    },
    {
      name: "Digital Delivery",
      time: "Instant",
      price: "Free",
      description: "Immediate delivery of digital products to your email or account.",
    },
  ]

  // International shipping rates
  const internationalRates = [
    { region: "Canada", standard: "$9.99", express: "$24.99", time: "5-10 business days" },
    { region: "Europe", standard: "$14.99", express: "$34.99", time: "7-14 business days" },
    { region: "Asia", standard: "$19.99", express: "$39.99", time: "10-15 business days" },
    { region: "Australia/NZ", standard: "$24.99", express: "$44.99", time: "10-15 business days" },
    { region: "Rest of World", standard: "$29.99", express: "$49.99", time: "14-21 business days" },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can use this number to track your package on our website or directly on the carrier's website.",
    },
    {
      question: "Do you ship to PO boxes?",
      answer:
        "Yes, we ship to PO boxes for standard shipping only. Express and Next Day shipping options require a physical address for delivery.",
    },
    {
      question: "What happens if I'm not home when my package arrives?",
      answer:
        "For packages requiring signature, the carrier will leave a notice and attempt delivery again. For packages not requiring signature, they will be left at your door or with your building's package reception area.",
    },
    {
      question: "Are there any restrictions on international shipping?",
      answer:
        "Yes, some products may not be available for international shipping due to regional restrictions or licensing agreements. Additionally, customers are responsible for any customs fees, taxes, or duties that may apply.",
    },
    {
      question: "How are digital products delivered?",
      answer:
        "Digital products are delivered instantly to your email address and are also available in your account dashboard. No physical shipping is involved for digital items.",
    },
    {
      question: "What if my package is lost or damaged?",
      answer:
        "If your package is lost or arrives damaged, please contact our customer support within 7 days of the expected delivery date. We'll work with the shipping carrier to resolve the issue and send a replacement if necessary.",
    },
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shipping", href: "/shipping" },
        ]}
      />

      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Shipping Information</h1>
        <p className="mt-2 text-muted-foreground">Learn about our shipping methods, delivery times, and policies.</p>
      </div>

      {/* Digital vs Physical Products */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Digital vs. Physical Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
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
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" x2="12" y1="22" y2="12"></line>
                </svg>
                <h3 className="text-lg font-semibold">Digital Products</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Instant delivery via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Available immediately in your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>No shipping fees or delays</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Global availability with no restrictions</span>
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
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
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                  <path d="m3.3 7 8.7 5 8.7-5"></path>
                  <path d="M12 22V12"></path>
                </svg>
                <h3 className="text-lg font-semibold">Physical Products</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Multiple shipping options available</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Tracking information provided</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Secure packaging for safe delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>International shipping available</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Methods */}
      <h2 className="text-2xl font-semibold mb-4">Shipping Methods</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {shippingMethods.map((method, index) => (
          <Card key={index}>
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg mb-2">{method.name}</h3>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Delivery Time:</span>
                <span className="font-medium">{method.time}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-muted-foreground">Cost:</span>
                <span className="font-medium">{method.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Domestic vs International */}
      <Tabs defaultValue="domestic" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="domestic">Domestic Shipping</TabsTrigger>
          <TabsTrigger value="international">International Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="domestic">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3">Domestic Shipping Information</h3>
              <p className="mb-4">
                We ship to all 50 states, including Alaska and Hawaii, as well as U.S. territories. Delivery times are
                calculated from the date your order ships, not the order date.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Shipping Carriers</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>USPS</li>
                    <li>FedEx</li>
                    <li>UPS</li>
                    <li>DHL (select areas)</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Order Processing</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Orders placed before 2 PM EST ship same day</li>
                    <li>Orders placed after 2 PM EST ship next business day</li>
                    <li>Weekend orders ship on Monday</li>
                    <li>Holiday orders may experience slight delays</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Note: Delivery times may be affected by weather conditions, carrier delays, or other unforeseen
                circumstances.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="international">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3">International Shipping Information</h3>
              <p className="mb-4">
                We ship to over 180 countries worldwide. International customers may be subject to import duties, taxes,
                and customs clearance fees, which are not included in the shipping cost and are the responsibility of
                the recipient.
              </p>

              <div className="overflow-x-auto mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead>Standard Shipping</TableHead>
                      <TableHead>Express Shipping</TableHead>
                      <TableHead>Estimated Delivery</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {internationalRates.map((rate, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{rate.region}</TableCell>
                        <TableCell>{rate.standard}</TableCell>
                        <TableCell>{rate.express}</TableCell>
                        <TableCell>{rate.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-600"
                  >
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" x2="12" y1="9" y2="13"></line>
                    <line x1="12" x2="12.01" y1="17" y2="17"></line>
                  </svg>
                  Important Information
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Some products may not be available for international shipping due to regional restrictions</li>
                  <li>Digital products are available worldwide with no shipping restrictions</li>
                  <li>International tracking is provided for all shipments</li>
                  <li>Customs clearance may delay delivery by 1-5 business days</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                For specific questions about shipping to your country, please contact our customer support team.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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

      {/* Contact for Shipping Questions */}
      <Card className="bg-primary/5 border-primary">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Have more shipping questions?</h3>
              <p className="text-muted-foreground">
                Our customer support team is ready to assist you with any shipping inquiries.
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
    </div>
  )
}
