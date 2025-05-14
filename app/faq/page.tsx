import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FAQPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Help Center", href: "/help" },
          { label: "FAQs", href: "/faq" },
        ]}
      />

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Zafago, our products, and services.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search FAQs..." className="pl-10 py-6 text-lg" />
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" id="q1">
                <AccordionTrigger>What is Zafago?</AccordionTrigger>
                <AccordionContent>
                  Zafago is a digital marketplace specializing in digital game codes, software licenses, and other
                  digital products. We provide instant delivery of authentic digital codes at competitive prices.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" id="q2">
                <AccordionTrigger>How does Zafago work?</AccordionTrigger>
                <AccordionContent>
                  Zafago works by connecting customers with authentic digital products. You browse our catalog, make a
                  purchase, and receive your digital code instantly via email and in your account dashboard. You can
                  then redeem the code on the respective platform (Steam, Epic Games, etc.) to access your product.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" id="q3">
                <AccordionTrigger>Are the products on Zafago legitimate?</AccordionTrigger>
                <AccordionContent>
                  Yes, all products sold on Zafago are 100% legitimate and sourced from authorized distributors and
                  publishers. We guarantee the authenticity of every digital code and license key sold on our platform.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" id="q4">
                <AccordionTrigger>Which regions do you support?</AccordionTrigger>
                <AccordionContent>
                  We support customers from most countries worldwide. However, some products may have regional
                  restrictions imposed by the publishers. The regional availability of each product is clearly indicated
                  on the product page.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" id="q5">
                <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                <AccordionContent>
                  You can contact our customer support team through our Contact Us page, by emailing support@zafago.com,
                  or by using the live chat feature on our website. Our support team is available 24/7 to assist you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="account" className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="account-1" id="account1">
                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  To create an account, click on the "Sign In / Register" button in the top right corner of the website.
                  Then select the "Register" tab and fill out the registration form with your name, email address, and
                  password. You can also register using your Google or Facebook account.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="account-2" id="account2">
                <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                <AccordionContent>
                  If you've forgotten your password, click on the "Sign In" button, then select "Forgot password?" link.
                  Enter your email address, and we'll send you a password reset link. Follow the instructions in the
                  email to create a new password.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="account-3" id="account3">
                <AccordionTrigger>Can I change my email address?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can change your email address in your account settings. Go to your account dashboard, select
                  "Settings," and update your email address. You'll need to verify the new email address before the
                  change takes effect.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="account-4" id="account4">
                <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                <AccordionContent>
                  To delete your account, go to your account settings and select the "Security" tab. At the bottom of
                  the page, you'll find the option to delete your account. Please note that account deletion is
                  permanent and will remove all your data from our system, including your purchase history.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="account-5" id="account5">
                <AccordionTrigger>What happens to my purchases if I delete my account?</AccordionTrigger>
                <AccordionContent>
                  If you delete your account, you will no longer have access to your purchase history or digital codes
                  through our platform. However, any products you've already redeemed on external platforms (like Steam
                  or Epic Games) will remain in your library on those platforms.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="orders" className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="orders-1" id="orders1">
                <AccordionTrigger>How do I check my order status?</AccordionTrigger>
                <AccordionContent>
                  You can check your order status by logging into your account and navigating to the "Orders" section in
                  your account dashboard. Here, you'll find a list of all your orders and their current status.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="orders-2" id="orders2">
                <AccordionTrigger>How long does digital delivery take?</AccordionTrigger>
                <AccordionContent>
                  Digital delivery is typically instant for most products. After your payment is confirmed, the digital
                  code will be displayed on the order confirmation page and sent to your email. In rare cases, manual
                  verification may be required, which can take up to 24 hours.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="orders-3" id="orders3">
                <AccordionTrigger>I didn't receive my digital code, what should I do?</AccordionTrigger>
                <AccordionContent>
                  If you haven't received your digital code, first check your spam or junk folder. You can also find all
                  your purchased codes in your account dashboard under "Orders." If you still can't locate your code,
                  please contact our customer support team immediately.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="orders-4" id="orders4">
                <AccordionTrigger>Can I purchase a game as a gift for someone else?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can purchase digital products as gifts. During checkout, you'll have the option to send the
                  digital code to a different email address. You can also include a personalized message for the
                  recipient.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="orders-5" id="orders5">
                <AccordionTrigger>How do I redeem a game code?</AccordionTrigger>
                <AccordionContent>
                  The redemption process varies depending on the platform. For Steam codes, open the Steam client, click
                  on "Games" in the top menu, select "Activate a Product on Steam," and follow the instructions. For
                  other platforms, we provide detailed redemption instructions with your purchase.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="payment" className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="payment-1" id="payment1">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept various payment methods, including credit/debit cards (Visa, Mastercard, American Express),
                  PayPal, Apple Pay, Google Pay, and select cryptocurrencies. Available payment methods may vary based
                  on your location.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment-2" id="payment2">
                <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, your payment information is secure. We use industry-standard encryption and security measures to
                  protect your data. We do not store your complete credit card information on our servers. All payment
                  processing is handled by trusted third-party payment processors that comply with PCI DSS standards.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment-3" id="payment3">
                <AccordionTrigger>Can I get a refund for my purchase?</AccordionTrigger>
                <AccordionContent>
                  Our refund policy varies depending on the product and circumstances. Generally, we do not offer
                  refunds for digital products once the code has been revealed or redeemed. However, if you encounter
                  issues with a code or if it doesn't work as described, please contact our customer support team for
                  assistance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment-4" id="payment4">
                <AccordionTrigger>Do you charge any additional fees?</AccordionTrigger>
                <AccordionContent>
                  No, we do not charge any hidden fees. The price you see is the price you pay. However, depending on
                  your payment method and location, your bank or payment provider might apply additional fees or
                  currency conversion charges.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment-5" id="payment5">
                <AccordionTrigger>What currencies do you accept?</AccordionTrigger>
                <AccordionContent>
                  We primarily display prices in USD, but we accept payments in various currencies. The exact currency
                  will be determined based on your location and payment method. Currency conversion, if necessary, is
                  handled by your payment provider.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="technical" className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tech-1" id="tech1">
                <AccordionTrigger>What are the system requirements for games?</AccordionTrigger>
                <AccordionContent>
                  System requirements vary for each game. You can find detailed system requirements on each product page
                  under the "System Requirements" tab. These requirements specify the minimum and recommended hardware
                  and software needed to run the game properly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-2" id="tech2">
                <AccordionTrigger>My game code doesn't work, what should I do?</AccordionTrigger>
                <AccordionContent>
                  If your game code doesn't work, first verify that you're redeeming it on the correct platform and
                  following the proper redemption process. Check for any typing errors if you're entering the code
                  manually. If the issue persists, please contact our customer support team with your order number and
                  details of the problem.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-3" id="tech3">
                <AccordionTrigger>Can I transfer my game to another account?</AccordionTrigger>
                <AccordionContent>
                  Once a digital code has been redeemed on a platform (like Steam, Epic Games, etc.), it is typically
                  linked to that account permanently and cannot be transferred. This is a restriction imposed by the
                  platform providers, not by Zafago.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-4" id="tech4">
                <AccordionTrigger>Do you provide technical support for games?</AccordionTrigger>
                <AccordionContent>
                  We provide support for issues related to code redemption and purchase verification. For technical
                  issues with the game itself (gameplay, performance, bugs, etc.), you should contact the game's
                  publisher or developer directly, as they are better equipped to assist with game-specific technical
                  problems.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-5" id="tech5">
                <AccordionTrigger>How do I check if my computer can run a specific game?</AccordionTrigger>
                <AccordionContent>
                  You can check if your computer meets the minimum requirements by comparing your system specifications
                  with the game's system requirements listed on the product page. There are also third-party tools like
                  "Can You Run It" that can automatically scan your system and compare it to the game's requirements.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-4">
            Our customer support team is ready to assist you with any questions you may have.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
