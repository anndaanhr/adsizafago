import Link from "next/link"
import { Search, HelpCircle, FileText, MessageCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HelpCenterPage() {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Help Center", href: "/help" },
        ]}
      />

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and learn how to get the most out of Zafago.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search for help articles..." className="pl-10 py-6 text-lg" />
        </div>

        <Tabs defaultValue="popular" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>
          <TabsContent value="popular" className="pt-6">
            <div className="grid gap-4">
              {[
                "How do I redeem a game code?",
                "What payment methods do you accept?",
                "How long does digital delivery take?",
                "Can I get a refund for my purchase?",
                "How do I contact customer support?",
                "Is my payment information secure?",
                "What should I do if my code doesn't work?",
                "Do you offer discounts for bulk purchases?",
              ].map((question, index) => (
                <Link
                  key={index}
                  href={`/faq#q${index + 1}`}
                  className="p-4 border rounded-lg hover:bg-muted transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{question}</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="account" className="pt-6">
            <div className="grid gap-4">
              {[
                "How do I create an account?",
                "How do I reset my password?",
                "Can I change my email address?",
                "How do I update my payment information?",
                "How do I delete my account?",
                "What happens to my purchases if I delete my account?",
                "How do I manage my notification settings?",
                "How do I view my purchase history?",
              ].map((question, index) => (
                <Link
                  key={index}
                  href={`/faq#account${index + 1}`}
                  className="p-4 border rounded-lg hover:bg-muted transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{question}</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="orders" className="pt-6">
            <div className="grid gap-4">
              {[
                "Where can I find my order confirmation?",
                "How do I check the status of my order?",
                "I didn't receive my digital code, what should I do?",
                "Can I purchase a game as a gift for someone else?",
                "How do I redeem a gift card?",
                "Can I cancel my order?",
                "How long are digital codes valid for?",
                "What regions are your game keys valid in?",
              ].map((question, index) => (
                <Link
                  key={index}
                  href={`/faq#orders${index + 1}`}
                  className="p-4 border rounded-lg hover:bg-muted transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{question}</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="technical" className="pt-6">
            <div className="grid gap-4">
              {[
                "What are the system requirements for games?",
                "How do I install a game after purchasing?",
                "My game is not working properly, what should I do?",
                "How do I update my game?",
                "Can I transfer my game to another account?",
                "What do I do if I encounter a technical issue?",
                "How do I check if my computer can run a specific game?",
                "Do you provide technical support for games?",
              ].map((question, index) => (
                <Link
                  key={index}
                  href={`/faq#tech${index + 1}`}
                  className="p-4 border rounded-lg hover:bg-muted transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{question}</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Guides & Tutorials</h3>
              <p className="text-muted-foreground mb-4">
                Step-by-step instructions for common tasks and processes on Zafago.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/guides">View Guides</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">FAQs</h3>
              <p className="text-muted-foreground mb-4">
                Find answers to the most frequently asked questions about our services.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/faq">View FAQs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Contact Support</h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-primary/5 rounded-lg p-8 border border-primary/20 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our customer support team is available 24/7 to assist you with any questions or issues you may have.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
