import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Briefcase, MapPin, Clock, DollarSign, Users, Coffee, Zap, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CareersPage() {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
      />

      <div className="space-y-12">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="relative h-[300px] md:h-[400px] w-full">
            <Image
              src="/placeholder.svg?height=400&width=1200&text=Join+Our+Team"
              alt="Join Our Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="container px-4 md:px-6">
                <div className="max-w-md space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">Join Our Team</h1>
                  <p className="text-muted-foreground text-lg">
                    Build your career at Zafago and help shape the future of digital distribution.
                  </p>
                  <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600">
                    <a href="#open-positions">View Open Positions</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Join Us */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Why Join Zafago?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation & Growth</h3>
                  <p className="text-muted-foreground">
                    Work on cutting-edge technology in a rapidly growing industry. We encourage creative thinking and
                    provide opportunities for professional development.
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
                  <h3 className="text-xl font-semibold mb-2">Collaborative Culture</h3>
                  <p className="text-muted-foreground">
                    Join a diverse team of passionate professionals who work together to solve complex challenges and
                    deliver exceptional results.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
                  <p className="text-muted-foreground">
                    We value your wellbeing and offer flexible work arrangements, generous time off, and programs to
                    support your physical and mental health.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Competitive Salary</h3>
              <p className="text-sm text-muted-foreground">
                Compensation packages that recognize your skills and experience
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Health Benefits</h3>
              <p className="text-sm text-muted-foreground">Comprehensive medical, dental, and vision coverage</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Flexible Hours</h3>
              <p className="text-sm text-muted-foreground">Work schedules that adapt to your life and productivity</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Remote Work</h3>
              <p className="text-sm text-muted-foreground">Options to work from home or our modern offices</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Additional Benefits</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>401(k) retirement plan with company matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Generous paid time off and holidays</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Parental leave for new parents</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Professional development stipend</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Lifestyle & Wellness</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Gym membership reimbursement</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Mental health resources and support</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Team building events and activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Free snacks and beverages in office</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div id="open-positions">
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Departments</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="pt-6">
              <div className="grid gap-4">
                {[
                  {
                    title: "Senior Frontend Developer",
                    department: "Engineering",
                    location: "Remote (US)",
                    type: "Full-time",
                    description:
                      "We're looking for an experienced frontend developer to help build and improve our user interfaces using React and Next.js.",
                  },
                  {
                    title: "Backend Engineer",
                    department: "Engineering",
                    location: "New York, NY",
                    type: "Full-time",
                    description:
                      "Join our backend team to develop and maintain our API services and infrastructure using Node.js and AWS.",
                  },
                  {
                    title: "Product Manager",
                    department: "Product",
                    location: "Remote (Worldwide)",
                    type: "Full-time",
                    description:
                      "Lead the development of new features and improvements to our platform, working closely with engineering, design, and marketing teams.",
                  },
                  {
                    title: "Digital Marketing Specialist",
                    department: "Marketing",
                    location: "Remote (US/Europe)",
                    type: "Full-time",
                    description:
                      "Drive our digital marketing efforts across various channels, including social media, email, and paid advertising.",
                  },
                  {
                    title: "Customer Support Representative",
                    department: "Support",
                    location: "Remote (Worldwide)",
                    type: "Full-time",
                    description:
                      "Provide exceptional support to our customers via email, chat, and phone, helping them resolve issues and maximize their experience.",
                  },
                  {
                    title: "UX/UI Designer",
                    department: "Product",
                    location: "San Francisco, CA",
                    type: "Full-time",
                    description:
                      "Create intuitive and engaging user experiences for our platform, working closely with product and engineering teams.",
                  },
                  {
                    title: "DevOps Engineer",
                    department: "Engineering",
                    location: "Remote (US)",
                    type: "Full-time",
                    description:
                      "Manage and improve our cloud infrastructure, CI/CD pipelines, and deployment processes.",
                  },
                  {
                    title: "Content Marketing Manager",
                    department: "Marketing",
                    location: "Remote (US/Europe)",
                    type: "Full-time",
                    description:
                      "Develop and execute our content strategy across blog, social media, and other channels to drive engagement and growth.",
                  },
                ].map((job, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <Badge>{job.department}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{job.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild className="md:self-start">
                          <Link href={`/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>Apply Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="engineering" className="pt-6">
              <div className="grid gap-4">
                {[
                  {
                    title: "Senior Frontend Developer",
                    department: "Engineering",
                    location: "Remote (US)",
                    type: "Full-time",
                    description:
                      "We're looking for an experienced frontend developer to help build and improve our user interfaces using React and Next.js.",
                  },
                  {
                    title: "Backend Engineer",
                    department: "Engineering",
                    location: "New York, NY",
                    type: "Full-time",
                    description:
                      "Join our backend team to develop and maintain our API services and infrastructure using Node.js and AWS.",
                  },
                  {
                    title: "DevOps Engineer",
                    department: "Engineering",
                    location: "Remote (US)",
                    type: "Full-time",
                    description:
                      "Manage and improve our cloud infrastructure, CI/CD pipelines, and deployment processes.",
                  },
                ].map((job, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <Badge>{job.department}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{job.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild className="md:self-start">
                          <Link href={`/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>Apply Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="product" className="pt-6">
              <div className="grid gap-4">
                {[
                  {
                    title: "Product Manager",
                    department: "Product",
                    location: "Remote (Worldwide)",
                    type: "Full-time",
                    description:
                      "Lead the development of new features and improvements to our platform, working closely with engineering, design, and marketing teams.",
                  },
                  {
                    title: "UX/UI Designer",
                    department: "Product",
                    location: "San Francisco, CA",
                    type: "Full-time",
                    description:
                      "Create intuitive and engaging user experiences for our platform, working closely with product and engineering teams.",
                  },
                ].map((job, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <Badge>{job.department}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{job.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild className="md:self-start">
                          <Link href={`/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>Apply Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="marketing" className="pt-6">
              <div className="grid gap-4">
                {[
                  {
                    title: "Digital Marketing Specialist",
                    department: "Marketing",
                    location: "Remote (US/Europe)",
                    type: "Full-time",
                    description:
                      "Drive our digital marketing efforts across various channels, including social media, email, and paid advertising.",
                  },
                  {
                    title: "Content Marketing Manager",
                    department: "Marketing",
                    location: "Remote (US/Europe)",
                    type: "Full-time",
                    description:
                      "Develop and execute our content strategy across blog, social media, and other channels to drive engagement and growth.",
                  },
                ].map((job, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <Badge>{job.department}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{job.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild className="md:self-start">
                          <Link href={`/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>Apply Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="support" className="pt-6">
              <div className="grid gap-4">
                {[
                  {
                    title: "Customer Support Representative",
                    department: "Support",
                    location: "Remote (Worldwide)",
                    type: "Full-time",
                    description:
                      "Provide exceptional support to our customers via email, chat, and phone, helping them resolve issues and maximize their experience.",
                  },
                ].map((job, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <Badge>{job.department}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{job.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild className="md:self-start">
                          <Link href={`/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>Apply Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Application Process */}
        <div className="bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Application Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Application Review</h3>
              <p className="text-sm text-muted-foreground">
                Our team reviews your application and resume to assess your qualifications.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <span className="text-lg font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Initial Interview</h3>
              <p className="text-sm text-muted-foreground">
                A video call with our recruiting team to discuss your experience and goals.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <span className="text-lg font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Technical Assessment</h3>
              <p className="text-sm text-muted-foreground">
                A skills assessment relevant to the position you're applying for.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <span className="text-lg font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">Final Interviews</h3>
              <p className="text-sm text-muted-foreground">
                Meet with team members and leadership to ensure a mutual fit.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-background rounded-lg text-center">
            <p className="text-muted-foreground">
              Our hiring process typically takes 2-3 weeks from application to offer. We strive to provide timely
              updates and feedback throughout the process.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Team Says</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Working at Zafago has been an incredible journey. The collaborative environment and opportunities for growth have helped me develop both professionally and personally.",
                name: "Alex Chen",
                role: "Senior Frontend Developer",
                image: "/placeholder.svg?height=100&width=100&text=AC",
                years: "2 years at Zafago",
              },
              {
                quote:
                  "What I love most about Zafago is the culture of innovation. We're encouraged to experiment, learn from failures, and continuously improve our products and processes.",
                name: "Maria Rodriguez",
                role: "Product Manager",
                image: "/placeholder.svg?height=100&width=100&text=MR",
                years: "3 years at Zafago",
              },
              {
                quote:
                  "The work-life balance at Zafago is exceptional. The flexible work arrangements allow me to be productive while also having time for my family and personal interests.",
                name: "James Wilson",
                role: "Customer Support Lead",
                image: "/placeholder.svg?height=100&width=100&text=JW",
                years: "1.5 years at Zafago",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden mb-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.years}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-6">
            Explore our open positions and take the first step toward an exciting career at Zafago.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <a href="#open-positions" className="flex items-center">
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "What is the interview process like?",
                answer:
                  "Our interview process typically includes an initial screening, a technical or skills assessment, and final interviews with team members and leadership. The entire process usually takes 2-3 weeks.",
              },
              {
                question: "Do you offer remote work options?",
                answer:
                  "Yes, many of our positions are remote-friendly. We have team members working from various locations around the world. Some positions may require specific working hours to align with team collaboration.",
              },
              {
                question: "What is the company culture like?",
                answer:
                  "We foster a collaborative, innovative, and inclusive culture. We value open communication, continuous learning, and work-life balance. Our team is passionate about digital entertainment and providing exceptional customer experiences.",
              },
              {
                question: "Do you offer internships or entry-level positions?",
                answer:
                  "Yes, we offer internships and entry-level positions in various departments. These opportunities are great for students or recent graduates looking to gain experience in the digital marketplace industry.",
              },
              {
                question: "How do you support professional development?",
                answer:
                  "We provide a professional development stipend, access to online learning platforms, opportunities to attend conferences, and internal mentorship programs to help our team members grow their skills and advance their careers.",
              },
              {
                question: "What benefits do you offer?",
                answer:
                  "We offer competitive salaries, health benefits, retirement plans, flexible work arrangements, paid time off, parental leave, and various wellness programs. Specific benefits may vary by location and position.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Have More Questions?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            If you have any questions about our open positions or the application process, please don't hesitate to
            reach out.
          </p>
          <Button asChild>
            <Link href="mailto:careers@zafago.com">Contact Recruiting Team</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
