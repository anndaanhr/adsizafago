import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users, Award, Target, Sparkles, Clock, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      />

      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About Zafago</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted destination for digital games, software, and digital products at competitive prices.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              At Zafago, our mission is to provide gamers and software users with instant access to authentic digital
              products at competitive prices. We believe that everyone should have affordable access to the digital
              content they love, without compromising on quality or security.
            </p>
            <h2 className="text-3xl font-bold mt-8">Our Vision</h2>
            <p className="text-muted-foreground">
              We envision a world where digital distribution is seamless, secure, and accessible to all. We strive to be
              the most trusted marketplace for digital products, known for our exceptional customer service, competitive
              pricing, and commitment to authenticity.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Zafago+Team"
              alt="Zafago team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Zafago was founded in 2020 in Lampung, Indonesia by a group of passionate gamers and tech enthusiasts who
              were frustrated with the existing digital marketplace options in Southeast Asia. They envisioned a
              platform that would prioritize customer experience, offer competitive pricing, and ensure the authenticity
              of every digital product sold while supporting the growing digital economy in Indonesia and the broader
              Southeast Asian region.
            </p>
            <p>
              Starting with a small catalog of game keys from our headquarters in Lampung, Zafago quickly gained a
              reputation for reliability and excellent customer service throughout Indonesia. As word spread, our user
              base grew across Southeast Asia, allowing us to expand our offerings to include software licenses, digital
              gift cards, and other digital products while maintaining our Indonesian roots and values.
            </p>
            <p>
              Today, Zafago serves customers throughout Southeast Asia from our main office in Lampung, Indonesia,
              partnering with leading publishers and developers to provide instant access to thousands of digital
              products. We're proud to be an Indonesian company contributing to the region's digital economy. Despite
              our growth, we remain committed to our founding principles: authenticity, competitive pricing, and
              exceptional customer service with a distinctly Indonesian approach to hospitality.
            </p>
            <p>
              Our journey is just beginning, and we're excited to continue innovating and expanding our offerings to
              meet the evolving needs of our customers. Whether you're a casual gamer, a software professional, or
              someone looking for the perfect digital gift, Zafago is here to serve you.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                  <p className="text-muted-foreground">
                    We guarantee that every digital code and license sold on our platform is 100% authentic and sourced
                    from authorized distributors and publishers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                  <p className="text-muted-foreground">
                    Our customers are at the heart of everything we do. We're committed to providing exceptional service
                    and support at every step of your journey with us.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
                  <p className="text-muted-foreground">
                    We work hard to offer the best possible prices on all our products, making digital entertainment and
                    productivity tools accessible to everyone.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
                  <p className="text-muted-foreground">
                    We understand the excitement of a new purchase. That's why we strive to deliver your digital codes
                    instantly after payment confirmation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously improve our platform and services, embracing new technologies and trends to provide
                    the best possible experience for our users.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                  <p className="text-muted-foreground">
                    We serve customers worldwide, breaking down geographical barriers to provide global access to
                    digital entertainment and productivity tools.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Indonesian Heritage */}
        <div className="bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-3xl font-bold mb-6">Our Indonesian Heritage</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Founded and headquartered in the beautiful province of Lampung, Indonesia, Zafago is proud of its
                Indonesian roots. Our company culture embraces the warmth, hospitality, and innovative spirit that
                Indonesia is known for.
              </p>
              <p className="text-muted-foreground">
                We're committed to supporting the growth of Indonesia's digital economy by providing reliable digital
                distribution services, creating tech jobs in Lampung and beyond, and showcasing Indonesian talent on the
                global stage.
              </p>
              <p className="text-muted-foreground">
                Our understanding of the local market allows us to better serve customers throughout Indonesia and
                Southeast Asia with payment methods, customer service, and product selections tailored to regional
                preferences.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=500&text=Zafago+Lampung+Office"
                alt="Zafago Lampung Office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Budi Santoso",
                role: "Founder & CEO",
                bio: "Budi founded Zafago in Lampung with a vision to revolutionize digital distribution in Indonesia. With over 15 years of experience in e-commerce and gaming, he leads our strategic direction with a focus on Southeast Asian markets.",
                image: "/placeholder.svg?height=300&width=300&text=Budi",
              },
              {
                name: "Dewi Wijaya",
                role: "Chief Technology Officer",
                bio: "Dewi oversees all technical aspects of Zafago from our Lampung headquarters. Her background in cybersecurity and experience with Indonesian digital infrastructure ensures our platform remains secure and reliable for all users in the region.",
                image: "/placeholder.svg?height=300&width=300&text=Dewi",
              },
              {
                name: "Arief Pratama",
                role: "Chief Operating Officer",
                bio: "Arief manages our day-to-day operations and partnerships with publishers throughout Southeast Asia. His industry connections in Indonesia and beyond have been instrumental in expanding our product catalog to serve local needs.",
                image: "/placeholder.svg?height=300&width=300&text=Arief",
              },
              {
                name: "Emily Patel",
                role: "Head of Customer Experience",
                bio: "Emily leads our customer support team, ensuring that every user receives prompt and helpful assistance. She's passionate about creating positive customer experiences.",
                image: "/placeholder.svg?height=300&width=300&text=Emily",
              },
              {
                name: "David Kim",
                role: "Chief Marketing Officer",
                bio: "David drives our marketing strategies and brand development. His creative approach has helped establish Zafago as a recognized name in digital distribution.",
                image: "/placeholder.svg?height=300&width=300&text=David",
              },
              {
                name: "Lisa Thompson",
                role: "Head of Business Development",
                bio: "Lisa focuses on expanding our partnerships and exploring new business opportunities. Her strategic vision helps Zafago stay ahead in a competitive market.",
                image: "/placeholder.svg?height=300&width=300&text=Lisa",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500K+</div>
              <p className="text-muted-foreground">Satisfied Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Digital Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Publisher Partnerships</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-4">Recognition & Awards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background p-4 rounded-lg text-center">
                <p className="font-medium">Best Digital Marketplace 2023</p>
                <p className="text-sm text-muted-foreground">Digital Commerce Awards</p>
              </div>
              <div className="bg-background p-4 rounded-lg text-center">
                <p className="font-medium">Excellence in Customer Service 2022</p>
                <p className="text-sm text-muted-foreground">E-Commerce Excellence Awards</p>
              </div>
              <div className="bg-background p-4 rounded-lg text-center">
                <p className="font-medium">Top 50 Tech Startups 2021</p>
                <p className="text-sm text-muted-foreground">Tech Innovators Magazine</p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us / Careers CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-6">
            We're always looking for talented individuals who share our passion for digital entertainment and
            exceptional customer service. Explore career opportunities at Zafago and be part of our exciting journey.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/careers" className="flex items-center">
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Have questions about Zafago or want to learn more about our services? Our team is here to help.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
