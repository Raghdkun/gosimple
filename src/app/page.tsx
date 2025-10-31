'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations with enhanced effects
      const tl = gsap.timeline()
      
      tl.fromTo('.hero-logo', 
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: 'back.out(1.7)' }
      )
      .fromTo('.hero-title', 
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8'
      )
      .fromTo('.hero-subtitle', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6'
      )
      .fromTo('.hero-description', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4'
      )

      // Services section - gentle fade up
      gsap.fromTo('.service-card', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8, 
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Projects section - smooth slide in
      gsap.fromTo('.project-card', 
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 1, 
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Team section - gentle reveal
      gsap.fromTo('.team-member', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.7, 
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Process section - sequential fade in
      gsap.fromTo('.process-step', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.6, 
          stagger: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Section titles - smooth reveal
      gsap.fromTo('.section-title', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.section-title',
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      )


    }, [heroRef, servicesRef, projectsRef, teamRef, processRef, footerRef])

    return () => ctx.revert()
  }, [])

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="hero-logo mb-8">
            <Image 
              src="/logo.svg" 
              alt="GoSimple Logo" 
              width={160} 
              height={160} 
              className="mx-auto"
            />
          </div>
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
            GoSimple
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simplify Tech. Amplify Growth.
          </p>
          <p className="hero-description text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We partner with growing companies and ambitious leaders, helping them turn ideas and goals into clear, automated, and scalable systems.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="service-card bg-background border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Image src="/website-development.svg" alt="Website Development" width={32} height={32} className="service-icon" />
                </div>
                <CardTitle>Website & App Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We design and build custom websites and apps that match your business and your goals, from start to finish.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="service-card bg-background border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Image src="/automation-ai.svg" alt="Automation & AI" width={32} height={32} className="service-icon" />
                </div>
                <CardTitle>Automation & AI Assistants</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We create smart tools that handle repetitive tasks, save time, and keep your operations running smoothly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="service-card bg-background border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Image src="/saas-platform.svg" alt="SaaS Platform" width={32} height={32} className="service-icon" />
                </div>
                <CardTitle>SaaS Platform Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We turn your software idea into a powerful, scalable product, ready for users, growth, and launch.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="service-card bg-background border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Image src="/tech-strategy.svg" alt="Tech Strategy" width={32} height={32} className="service-icon" />
                </div>
                <CardTitle>Tech Strategy & Process Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We help you choose the right tools, map better workflows, and scale smarter, with clarity and confidence.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16">
            What We've Built
          </h2>
          <div className="space-y-12">
            {/* Trucking 360 Solutions */}
            <Card className="project-card bg-card border-border">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Project Image Placeholder</span>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex items-center gap-3 mb-4">
                      <CardTitle className="text-2xl">Trucking 360 Solutions</CardTitle>
                      <Badge variant="secondary">Next.js</Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      From copying data across platforms to chase KPIs, to having it all automated and delivered to the right platform automatically.
                    </CardDescription>
                    <div className="mt-6 space-y-3">
                      <div>
                        <h4 className="font-semibold text-primary">For Store Managers:</h4>
                        <p className="text-muted-foreground">Daily performance reports automatically via API and FTP, eliminating manual data pulling.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">For Accountants:</h4>
                        <p className="text-muted-foreground">Integrated POS directly with QuickBooks, ensuring clean, automated financial records.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">For Logistics Team:</h4>
                        <p className="text-muted-foreground">Real-time dashboard combining dispatch, hiring, and safety data.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* NVT Courses */}
            <Card className="project-card bg-card border-border">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Project Image Placeholder</span>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex items-center gap-3 mb-4">
                      <CardTitle className="text-2xl">NVT Courses - Self-Development Platform</CardTitle>
                      <Badge variant="secondary">Laravel</Badge>
                      <Badge variant="secondary">Vue.js</Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed mb-6">
                      A comprehensive course management system with AI-powered features and automated coaching.
                    </CardDescription>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">• Course Status Tracking with ratings</p>
                        <p className="text-sm text-muted-foreground">• Attendance & Clocking System</p>
                        <p className="text-sm text-muted-foreground">• AI-powered Assistant</p>
                        <p className="text-sm text-muted-foreground">• Dynamic SMS coaching via Twilio</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">• Reporting & Analytics Dashboard</p>
                        <p className="text-sm text-muted-foreground">• Role Assignment and management</p>
                        <p className="text-sm text-muted-foreground">• Activity Logging System</p>
                        <p className="text-sm text-muted-foreground">• Email Notification System</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Dashboard Project */}
            <Card className="project-card bg-card border-border">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Project Image Placeholder</span>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex items-center gap-3 mb-4">
                      <CardTitle className="text-2xl">Business Intelligence Dashboard</CardTitle>
                      <Badge variant="secondary">Laravel</Badge>
                      <Badge variant="secondary">Vue.js</Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed mb-6">
                      Automated SMS coaching, daily reports, and performance tracking with dynamic scorecards.
                    </CardDescription>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">• Data visualization</p>
                        <p className="text-sm text-muted-foreground">• Theme customization</p>
                        <p className="text-sm text-muted-foreground">• Driver login portal</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">• Dynamic ScoreCard</p>
                        <p className="text-sm text-muted-foreground">• Performance Tracking</p>
                        <p className="text-sm text-muted-foreground">• Roles and permissions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <Card key={member} className="team-member bg-background border-border text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Photo</span>
                  </div>
                  <CardTitle>Team Member {member}</CardTitle>
                  <CardDescription>Position Title</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Brief description of team member expertise and role in the company.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section ref={processRef} className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16">
            How We Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="process-step bg-card border-border text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <CardTitle>Discover</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We work with you to understand the big picture, your goals, gaps, and what's slowing you down.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="process-step bg-card border-border text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <CardTitle>Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We craft a scalable solution, tailored to your workflow.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="process-step bg-card border-border text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <CardTitle>Deliver</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We build it, launch it, and guide your team with full clarity.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/logo.svg" alt="GoSimple Logo" width={40} height={40} />
                <h3 className="text-2xl font-bold">GoSimple</h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                We believe work should be simple and smart, never complicated. 
                You bring the vision. We simplify the tech. You amplify your growth.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contact@gosimple.io
              </Button>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Website Development</li>
                <li>App Development</li>
                <li>SaaS Platforms</li>
                <li>Automation & AI</li>
                <li>Tech Strategy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Our Work</li>
                <li>Team</li>
                <li>Contact</li>
                <li>Portfolio</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 GoSimple. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home