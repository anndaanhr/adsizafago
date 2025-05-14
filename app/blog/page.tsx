import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BlogPage() {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Zafago Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            News, updates, guides, and insights from the Zafago team.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search articles..." className="pl-10 py-6 text-lg" />
        </div>

        {/* Featured Post */}
        <div className="relative rounded-xl overflow-hidden border">
          <div className="relative h-[400px] w-full">
            <Image
              src="/placeholder.svg?height=400&width=1200&text=Featured+Post"
              alt="Featured Post"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="p-6 md:p-8 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  <Badge variant="outline">Gaming</Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  The Future of Digital Game Distribution: Trends to Watch in 2025
                </h2>
                <p className="text-muted-foreground mb-4 max-w-3xl">
                  Explore the emerging trends that are shaping the future of digital game distribution, from cloud
                  gaming to blockchain integration and beyond.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>March 25, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Alex Johnson</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/blog/future-of-digital-game-distribution">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="gaming">Gaming</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "The Future of Digital Game Distribution: Trends to Watch in 2025",
                  excerpt:
                    "Explore the emerging trends that are shaping the future of digital game distribution, from cloud gaming to blockchain integration and beyond.",
                  image: "/placeholder.svg?height=300&width=600&text=Future+of+Gaming",
                  date: "March 25, 2025",
                  author: "Alex Johnson",
                  category: "Gaming",
                  slug: "future-of-digital-game-distribution",
                },
                {
                  title: "How to Choose the Right Software License for Your Needs",
                  excerpt:
                    "A comprehensive guide to understanding different software license types and how to select the best option for your personal or business requirements.",
                  image: "/placeholder.svg?height=300&width=600&text=Software+Licenses",
                  date: "March 20, 2025",
                  author: "Sarah Chen",
                  category: "Software",
                  slug: "choose-right-software-license",
                },
                {
                  title: "Step-by-Step Guide: Redeeming Game Codes on Different Platforms",
                  excerpt:
                    "Learn how to redeem digital game codes on Steam, Epic Games, Origin, and other popular gaming platforms with our detailed walkthrough.",
                  image: "/placeholder.svg?height=300&width=600&text=Game+Codes+Guide",
                  date: "March 15, 2025",
                  author: "Michael Rodriguez",
                  category: "Guides",
                  slug: "redeeming-game-codes-guide",
                },
                {
                  title: "Zafago Announces Partnership with Major Game Publishers",
                  excerpt:
                    "We're excited to announce new partnerships with leading game publishers, expanding our catalog with hundreds of new titles at competitive prices.",
                  image: "/placeholder.svg?height=300&width=600&text=Partnership+Announcement",
                  date: "March 10, 2025",
                  author: "Emily Patel",
                  category: "News",
                  slug: "partnership-announcement",
                },
                {
                  title: "The Rise of Indie Games: Supporting Small Developers",
                  excerpt:
                    "Discover how indie games are transforming the gaming landscape and how digital distribution platforms are helping small developers reach global audiences.",
                  image: "/placeholder.svg?height=300&width=600&text=Indie+Games",
                  date: "March 5, 2025",
                  author: "David Kim",
                  category: "Gaming",
                  slug: "rise-of-indie-games",
                },
                {
                  title: "Zafago's 5th Anniversary: Our Journey and Vision for the Future",
                  excerpt:
                    "As we celebrate our 5th anniversary, we reflect on our journey, milestones, challenges, and our vision for the future of digital distribution.",
                  image: "/placeholder.svg?height=300&width=600&text=5th+Anniversary",
                  date: "February 28, 2025",
                  author: "Alex Johnson",
                  category: "Company",
                  slug: "5th-anniversary-journey",
                },
              ].map((post, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/blog/${post.slug}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </TabsContent>

          {/* Other tab contents would follow the same pattern */}
          <TabsContent value="gaming" className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Gaming articles will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="software" className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Software articles will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Guide articles will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="news" className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">News articles will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="company" className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Company articles will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
