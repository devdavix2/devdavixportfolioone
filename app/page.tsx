"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Code, Figma, Github, Layers, Mail, Twitter } from "lucide-react"
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
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      {/* Hero Section */}
      <section
        ref={targetRef}
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
              <TechSphere />
            </Float>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        <motion.div style={{ opacity, scale, y: position }} className="z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="px-4 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              WELCOME TO MY PORTFOLIO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          >
            Hi there, I&apos;m DevDavix!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Full Stack Developer & Graphic Designer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
              onClick={() => scrollToSection(workRef)}
            >
              Explore My Work <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="w-full py-20 px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-30"></div>
            <div className="relative bg-black/80 p-1 rounded-lg">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image src="/images/profile1.png" alt="Obi Chinonso - DevDavix" fill className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 md:w-64 md:h-64">
              <div className="relative w-full h-full">
                <Image
                  src="/images/profile2.png"
                  alt="Obi Chinonso - DevDavix"
                  fill
                  className="object-cover rounded-lg border-4 border-black"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-2">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mb-6"></div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-300">I am Obi Chinonso, known online as DevDavix.</h3>
            <p className="text-gray-400 mb-6">
              I thrive at the crossroads of design and code, where creativity meets functionality. My passion lies in
              crafting robust, user-centric web applications alongside my creative vision in graphic design.
            </p>
            <p className="text-gray-400 mb-8">
              With years of experience in both fields, I've developed a unique approach that combines technical
              precision with artistic flair. I believe that great products are born when aesthetics and functionality
              work in perfect harmony.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                <Github className="mr-2 h-4 w-4" />
                <Link href="https://github.com/devdavix2" target="_blank">
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                <Twitter className="mr-2 h-4 w-4" />
                <Link href="https://twitter.com/devdavix" target="_blank">
                  Twitter
                </Link>
              </Button>
              <Button variant="outline" className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10">
                <Mail className="mr-2 h-4 w-4" />
                <Link href="mailto:devdavixx@gmail.com">Email</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Tech Stack & Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My toolkit spans both development and design, allowing me to create comprehensive solutions from concept
              to deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <div className="flex items-center mb-6">
                  <Code className="h-8 w-8 text-cyan-400 mr-3" />
                  <h3 className="text-xl font-semibold">Development Skills</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SkillCard name="HTML" level={95} />
                  <SkillCard name="CSS" level={90} />
                  <SkillCard name="JavaScript" level={85} />
                  <SkillCard name="React" level={80} />
                  <SkillCard name="Node.js" level={75} />
                  <SkillCard name="Express" level={70} />
                  <SkillCard name="MongoDB" level={65} />
                  <SkillCard name="MySQL" level={60} />
                  <SkillCard name="Git" level={80} />
                  <SkillCard name="VS Code" level={90} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <div className="flex items-center mb-6">
                  <Layers className="h-8 w-8 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold">Design Skills</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SkillCard name="Photoshop" level={90} color="purple" />
                  <SkillCard name="Illustrator" level={85} color="purple" />
                  <SkillCard name="Figma" level={80} color="purple" />
                  <SkillCard name="XD" level={75} color="purple" />
                  <SkillCard name="InDesign" level={70} color="purple" />
                  <SkillCard name="After Effects" level={65} color="purple" />
                  <SkillCard name="UI Design" level={85} color="purple" />
                  <SkillCard name="Typography" level={80} color="purple" />
                  <SkillCard name="Color Theory" level={85} color="purple" />
                  <SkillCard name="Responsive Design" level={90} color="purple" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" ref={workRef} className="w-full py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Portfolio & Projects</h2>
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

          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Figma className="h-5 w-5 text-purple-400 mr-2" />
              Graphic Design
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
                title="Social Media Design"
                description="Creative social media designs for various brands including CANINO Foods and exchange platforms."
                tags={["Social Media", "Digital Marketing", "Photoshop", "Illustrator"]}
                image="/images/social-media-canino.png"
                category="design"
                slug="social-media-design"
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

      {/* Collaboration Section */}
      <section
        id="collaborate"
        ref={collaborateRef}
        className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Collaborations & Open Source</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6"></div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gray-800 text-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-white">Let&apos;s Create Together</h3>
              <p className="text-gray-400 mb-6">
                I'm looking to collaborate on projects that push the boundaries of design and innovation. Let's create
                something impactful together! Whether you need a website, brand identity, or custom design work, I'm
                here to help bring your vision to life.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                  onClick={() => scrollToSection(contactRef)}
                >
                  Start a Project
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Github className="mr-2 h-4 w-4" />
                  <Link href="https://github.com/devdavix2" target="_blank">
                    View GitHub
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="w-full py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gray-800 h-full">
                <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gray-800 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <p className="text-gray-200">devdavixx@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-800 p-3 rounded-full mr-4">
                      <Twitter className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Twitter</p>
                      <p className="text-gray-200">@devdavix</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-800 p-3 rounded-full mr-4">
                      <Github className="h-6 w-6 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">GitHub</p>
                      <p className="text-gray-200">github.com/devdavix2</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gray-800">
                <h3 className="text-2xl font-semibold mb-6 text-white">Send a Message</h3>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Obi Chinonso - DevDavix. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-1"> All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-1">Designing the future, one pixel and line of code at a time.</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(skillsRef)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection(workRef)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </main>
  )
}
