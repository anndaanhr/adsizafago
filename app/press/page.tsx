import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PressPage() {
  // Mock press releases
  const pressReleases = [
    {
      id: 1,
      title: "Zafago Announces Partnership with Major Publishers",
      date: "May 10, 2025",
      excerpt:
        "Zafago is excited to announce new partnerships with major game publishers to bring exclusive deals to our customers.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Partnership",
    },
    {
      id: 2,
      title: "Zafago Expands Digital Game Catalog with 500+ New Titles",
      date: "April 22, 2025",
      excerpt: "Our digital game catalog has expanded with over 500 new titles across multiple platforms and genres.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Product",
    },
    {
      id: 3,
      title: "Zafago Launches New Mobile App for iOS and Android",
      date: "March 15, 2025",
      excerpt:
        "Shop for your favorite games on the go with our new mobile app, now available for iOS and Android devices.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Technology",
    },
    {
      id: 4,
      title: "Zafago Reports Record Growth in Q1 2025",
      date: "April 5, 2025",
      excerpt:
        "Zafago has reported record growth in Q1 2025, with a 45% increase in sales compared to the same period last year.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Business",
    },
    {
      id: 5,
      title: "Zafago Introduces New Loyalty Program for Gamers",
      date: "February 28, 2025",
      excerpt:
        "Our new loyalty program rewards gamers with points for every purchase, which can be redeemed for discounts and exclusive items.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Product",
    },
  ]

  // Media kit resources
  const mediaResources = [
    {
      id: 1,
      title: "Company Logos",
      description: "Download Zafago logos in various formats and resolutions.",
      format: "ZIP (10MB)",
      link: "#",
    },
    {
      id: 2,
      title: "Brand Guidelines",
      description: "Our official brand guidelines for proper logo usage and brand representation.",
      format: "PDF (5MB)",
      link: "#",
    },
    {
      id: 3,
      title: "Product Images",
      description: "High-resolution images of our products and services.",
      format: "ZIP (25MB)",
      link: "#",
    },
    {
      id: 4,
      title: "Executive Headshots",
      description: "Professional photos of Zafago's executive team.",
      format: "ZIP (15MB)",
      link: "#",
    },
    {
      id: 5,
      title: "Company Fact Sheet",
      description: "Key facts and figures about Zafago's business and operations.",
      format: "PDF (2MB)",
      link: "#",
    },
  ]

  // Press contacts
  const pressContacts = [
    {
      name: "Media Inquiries",
      email: "press@zafago.com",
      phone: "+1 (555) 123-4567",
    },
    {
      name: "Investor Relations",
      email: "investors@zafago.com",
      phone: "+1 (555) 987-6543",
    },
    {
      name: "Partnership Opportunities",
      email: "partnerships@zafago.com",
      phone: "+1 (555) 456-7890",
    },
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Press", href: "/press" },
        ]}
      />

      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold">Press Center</h1>
        <p className="mt-2 text-muted-foreground">
          Find the latest news, media resources, and contact information for Zafago.
        </p>
      </div>

      <Tabs defaultValue="press-releases" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
          <TabsTrigger value="media-kit">Media Kit</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="press-releases">
          <div className="grid grid-cols-1 gap-6">
            {pressReleases.map((release) => (
              <Card key={release.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={release.image || "/placeholder.svg"}
                      alt={release.title}
                      className="w-full h-full object-cover aspect-video md:aspect-auto"
                    />
                  </div>
                  <CardContent className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-muted-foreground">{release.date}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{release.category}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">{release.title}</h2>
                    <p className="mb-4 text-muted-foreground">{release.excerpt}</p>
                    <Button variant="outline" size="sm">
                      Read Full Release
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media-kit">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaResources.map((resource) => (
              <Card key={resource.id}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                  <p className="mb-3 text-muted-foreground">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{resource.format}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={resource.link}>Download</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Usage Guidelines</h3>
            <p className="mb-4">
              All materials provided in our media kit are for press and media purposes only. Please refer to our brand
              guidelines for proper usage of our logos and other assets. For any questions regarding usage, please
              contact our press team.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 Zafago. All rights reserved. All trademarks are property of their respective owners.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {pressContacts.map((contact, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">{contact.name}</h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
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
                        className="text-muted-foreground"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                      <a href={`mailto:${contact.email}`} className="hover:underline">
                        {contact.email}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
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
                        className="text-muted-foreground"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>{contact.phone}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Press Inquiry Form</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input id="name" type="text" className="w-full p-2 border rounded-md" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input id="email" type="email" className="w-full p-2 border rounded-md" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="organization" className="text-sm font-medium">
                    Organization
                  </label>
                  <input
                    id="organization"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your organization"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Inquiry subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-2 border rounded-md h-32"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button type="submit">Submit Inquiry</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
