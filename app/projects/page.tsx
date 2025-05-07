"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, Code, Figma, Github, Layers, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, PerspectiveCamera } from "@react-three/drei"
import TechSphere from "@/components/tech-sphere"
import ProjectCard from "@/components/project-card"
import SkillCard from "@/components/skill-card"
import ContactForm from "@/components/contact-form"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const collaborateRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
    // Add a default value to prevent undefined errors
    defaultValue: 0,
  })

  const opacity = useTransform(scrollYProgress || 0, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress || 0, [0, 0.5], [1, 0.8])
  const position = useTransform(scrollYProgress || 0, [0, 1], [0, -100])

  // Smooth scrolling function
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    // Preload images for better performance
    try {
      const profileImg1 = new Image()
      profileImg1.src = "/images/profile1.png"
      const profileImg2 = new Image()
      profileImg2.src = "/images/profile2.png"
    } catch (error) {
      console.error("Error preloading images:", error)
    }

    // Simple function to handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === "#about" && aboutRef.current) {
        scrollToSection(aboutRef)
      } else if (hash === "#skills" && skillsRef.current) {
        scrollToSection(skillsRef)
      } else if (hash === "#work" && workRef.current) {
        scrollToSection(workRef)
      } else if (hash === "#collaborate" && collaborateRef.current) {
        scrollToSection(collaborateRef)
      } else if (hash === "#contact" && contactRef.current) {
        scrollToSection(contactRef)
      }
    }

    // Run on initial load
    handleHashChange()

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
     
     <main className="flex min-h-screen flex-col bg-black text-white">

          <div className="flex items-start mt-12 mb-4 px-16">
          <Button variant="outline" asChild className="mb-8">
                <Link href="/#home" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>
              </Button>
                      
          </div>
  

      {/* Projects Section */}
      <section id="work" ref={workRef} className="w-full py-20 px-12 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A showcase of my work across web development and graphic design projects.
            </p>
          </motion.div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Code className="h-5 w-5 text-cyan-400 mr-2" />
              Web Development
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                title="MoodyFlicks"
                description="A movie recommendation platform that suggests films based on your current mood."
                tags={["React", "Next.js", "Tailwind CSS", "TMDB API"]}
                image="/images/moodyflicks.png"
                category="development"
                slug="moodyflicks"
                liveUrl="https://moody-sigma.vercel.app/"
              />
              <ProjectCard
                title="FrontEnd Foundry"
                description="A comprehensive toolbox for front-end developers to streamline their workflow."
                tags={["React", "TypeScript", "Tailwind CSS", "Web Tools"]}
                image="/images/frontend-foundry.png"
                category="development"
                slug="frontend-foundry"
                liveUrl="https://front-end-foundry-oz4g.vercel.app/"
              />
              <ProjectCard
                title="NaijaSpark Quiz"
                description="Nigeria's #1 quiz platform with thousands of questions about Nigerian culture and history."
                tags={["React", "Next.js", "API Integration", "LocalStorage"]}
                image="/images/naijaspark-quiz.png"
                category="development"
                slug="naijaspark-quiz"
                liveUrl="https://naija-quizz-lr53.vercel.app/"
              />
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Code className="h-5 w-5 text-cyan-400 mr-2" />
              Visual BrandIng Design
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                title="Brand Identity"
                description="Complete brand identity design for D'KING EVENTS AND SURPRISE, an event planning company."
                tags={["Branding", "Logo Design", "Typography", "Color Theory"]}
                image="/images/dking-brand-guidelines.png"
                category="design"
                slug="brand-identity"
                          />
                            <ProjectCard
                title="Brand Identity"
                description="Complete brand identity design for D'KING EVENTS AND SURPRISE, an event planning company."
                tags={["Branding", "Logo Design", "Typography", "Color Theory"]}
                image="/images/dking-brand-guidelines.png"
                category="design"
                slug="brand-identity"
                          />
                            <ProjectCard
                title="Brand Identity"
                description="Complete brand identity design for D'KING EVENTS AND SURPRISE, an event planning company."
                tags={["Branding", "Logo Design", "Typography", "Color Theory"]}
                image="/images/dking-brand-guidelines.png"
                category="design"
                slug="brand-identity"
                          />
                      </div>
                      </div>
                     
            <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Code className="h-5 w-5 text-cyan-400 mr-2" />
Social Media Design
                      </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                title="Social Media Design"
                description="Creative social media designs for various brands including CANINO Foods and exchange platforms."
                tags={["Social Media", "Digital Marketing", "Photoshop", "Illustrator"]}
                image="/images/social-media-canino.png"
                category="design"
                slug="social-media-design"
                          />
                           <ProjectCard
                title="Social Media Design"
                description="Creative social media designs for various brands including CANINO Foods and exchange platforms."
                tags={["Social Media", "Digital Marketing", "Photoshop", "Illustrator"]}
                image="/images/social-media-canino.png"
                category="design"
                slug="social-media-design"
                          />
                           <ProjectCard
                title="Social Media Design"
                description="Creative social media designs for various brands including CANINO Foods and exchange platforms."
                tags={["Social Media", "Digital Marketing", "Photoshop", "Illustrator"]}
                image="/images/social-media-canino.png"
                category="design"
                slug="social-media-design"
                          />
                      </div>
                  </div>
                  


                  <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Code className="h-5 w-5 text-cyan-400 mr-2" />
              Logo Design
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
              <ProjectCard
                title="Logo Design"
                description="Logo design for Bee's Delight, a bakery brand with a playful and appetizing identity."
                tags={["Logo Design", "Brand Identity", "Illustrator", "Typography"]}
                image="/images/bees-delight-logo.png"
                category="design"
                slug="logo-design"
                          />
                                  
              <ProjectCard
                title="Logo Design"
                description="Logo design for Bee's Delight, a bakery brand with a playful and appetizing identity."
                tags={["Logo Design", "Brand Identity", "Illustrator", "Typography"]}
                image="/images/bees-delight-logo.png"
                category="design"
                slug="logo-design"
                          />
                                  
              <ProjectCard
                title="Logo Design"
                description="Logo design for Bee's Delight, a bakery brand with a playful and appetizing identity."
                tags={["Logo Design", "Brand Identity", "Illustrator", "Typography"]}
                image="/images/bees-delight-logo.png"
                category="design"
                slug="logo-design"
                          />
                          
            </div>
          </div>
        </div>
       
      </section>

    </main>
  )
}

