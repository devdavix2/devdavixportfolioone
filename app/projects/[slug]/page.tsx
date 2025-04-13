"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Tag, User, Github, ExternalLink, ZoomIn } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import ImageModal from "@/components/image-modal"

// Project data
const projects = {
  moodyflicks: {
    title: "MoodyFlicks",
    description: "A movie recommendation platform that suggests films based on your current mood.",
    fullDescription: `
      MoodyFlicks is an innovative web application that helps users discover movies based on their current emotional state. The platform offers a simple and intuitive interface where users can select their mood from options like Cheerful, Reflective, Gloomy, Humorous, Adventurous, Romantic, Thrilling, or Relaxed.
      
      Key features include:
      - Mood-based movie recommendations
      - Personalized film suggestions
      - Clean, user-friendly interface
      - Responsive design for all devices
      - Integration with movie databases
      - Random mood selection option
      
      The application was built using React and Next.js with a focus on creating a seamless user experience. The styling was implemented with Tailwind CSS for a modern and responsive design.
    `,
    image: "/images/moodyflicks.png",
    category: "development",
    tags: ["React", "Next.js", "Tailwind CSS", "TMDB API"],
    client: "Personal Project",
    completedDate: "March 2023",
    liveSite: "https://moody-sigma.vercel.app/",
    repository: "https://github.com/devdavix2/moodyflicks",
  },
  "frontend-foundry": {
    title: "FrontEnd Foundry",
    description: "A comprehensive toolbox for front-end developers to streamline their workflow.",
    fullDescription: `
      FrontEnd Foundry is a powerful toolkit designed to help front-end developers streamline their workflow and deliver cutting-edge web experiences. The platform offers a collection of essential tools and resources that developers can use to improve their productivity and the quality of their work.
      
      Key features include:
      - Color contrast checker for accessibility compliance
      - CSS gradient generator
      - Responsive design builder
      - Media query generator
      - Font pairing suggestions
      - SVG optimization tools
      - Code snippet library
      - Performance optimization guides
      
      The application was built with React and TypeScript, with a focus on creating a developer-friendly interface. The dark theme provides a comfortable environment for developers who spend long hours coding.
    `,
    image: "/images/frontend-foundry.png",
    category: "development",
    tags: ["React", "TypeScript", "Tailwind CSS", "Web Tools"],
    client: "Developer Community",
    completedDate: "January 2023",
    liveSite: "https://front-end-foundry-oz4g.vercel.app/",
    repository: "https://github.com/devdavix2/frontend-foundry",
  },
  "naijaspark-quiz": {
    title: "NaijaSpark Quiz",
    description: "Nigeria's #1 quiz platform with thousands of questions about Nigerian culture and history.",
    fullDescription: `
      NaijaSpark Quiz is Nigeria's premier quiz platform, offering thousands of questions about Nigerian culture, history, geography, and current affairs. The platform aims to educate and entertain users while promoting knowledge about Nigeria.
      
      Key features include:
      - Extensive question database covering various aspects of Nigeria
      - Quiz generation based on different categories
      - User favorites system to save interesting questions
      - Statistics tracking for user performance
      - Offline mode for using the app without internet connection
      - Light/dark theme toggle for comfortable viewing
      - Mobile-responsive design
      
      The application was built using React and Next.js with a clean, intuitive interface. Local storage is utilized to save user preferences and favorites, while the statistics feature helps users track their learning progress.
    `,
    image: "/images/naijaspark-quiz.png",
    category: "development",
    tags: ["React", "Next.js", "API Integration", "LocalStorage"],
    client: "Educational Initiative",
    completedDate: "November 2022",
    liveSite: "https://naija-quizz-lr53.vercel.app/",
    repository: "https://github.com/devdavix2/naijaspark-quiz",
  },
  "brand-identity": {
    title: "D'KING EVENTS Brand Identity",
    description: "Complete brand identity design for an event planning and surprise vendor company.",
    fullDescription: `
      This comprehensive brand identity project was created for D'KING EVENTS AND SURPRISE, a premier event planning and surprise vendor company that delivers unforgettable experiences for outdoor and indoor celebrations.
      
      The project deliverables included:
      - Logo design with variations and construction guidelines
      - Brand profile and positioning statement
      - Typography selection with Source Sans Pro as the primary font
      - Color palette featuring mint green (#B4F4BA), golden yellow (#FFBF00), and deep green (#14621B)
      - Logo variations for different applications and backgrounds
      - Brand guidelines document
      - Business card and stationery design
      
      The brand identity was designed to convey celebration, joy, and premium service with the tagline "Cake is a love language" highlighting their specialty in cake-based surprises and events.
    `,
    image: "/images/dking-brand-guidelines.png",
    category: "design",
    tags: ["Branding", "Logo Design", "Typography", "Color Theory"],
    client: "D'KING EVENTS AND SURPRISE",
    completedDate: "February 2023",
    liveSite: null,
    repository: null,
    galleryImages: [
      "/images/dking-brand-guidelines.png",
      "/images/dking-logo-construction.png",
      "/images/dking-brand-profile.png",
      "/images/dking-typography.png",
      "/images/dking-colors.png",
      "/images/dking-variations.png",
    ],
  },
  "social-media-design": {
    title: "Social Media Design",
    description: "Creative social media designs for various brands including CANINO Foods and exchange platforms.",
    fullDescription: `
      This project involved creating engaging social media designs for multiple clients across different industries. The designs were created to increase brand visibility, engagement, and conversion rates on various social media platforms.
      
      The work included:
      
      1. CANINO Foods:
      - Product showcase designs for their health food products
      - Consistent gold/yellow branding across all posts
      - Clear product information and benefits highlighted
      - Contact information and call-to-action elements
      
      2. Boss Baby Exchange:
      - Cryptocurrency and gift card exchange service promotion
      - Bold, attention-grabbing designs with red and blue color schemes
      - Clear service offerings and competitive advantages
      - Coming soon announcements and service launch materials
      
      3. DareyMarts Exchange:
      - Financial services and currency exchange promotional materials
      - Consistent branding with orange color scheme
      - Service listing and benefits highlighted
      - Contact information and trust-building elements
      
      All designs were created with mobile-first viewing in mind, optimized for Instagram, Facebook, and other social platforms, and included QR codes for easy access to services.
    `,
    image: "/images/social-media-canino.png",
    category: "design",
    tags: ["Social Media", "Digital Marketing", "Photoshop", "Illustrator"],
    client: "Various Clients",
    completedDate: "2022-2023",
    liveSite: null,
    repository: null,
    galleryImages: [
      "/images/social-media-canino.png",
      "/images/social-media-bossbaby.png",
      "/images/social-media-dareymarts.png",
    ],
  },
  "logo-design": {
    title: "Bee's Delight Logo Design",
    description: "Logo design for a bakery brand with a playful and appetizing identity.",
    fullDescription: `
      This logo design project was created for Bee's Delight, a bakery brand that needed a playful yet professional visual identity. The client wanted a logo that would convey the sweetness of their products while incorporating a bee theme.
      
      The design process included:
      - Research into bakery and honey-themed branding
      - Concept sketches exploring different bee characters and typography styles
      - Color exploration focusing on warm, appetizing colors
      - Final design refinement and variations
      
      The final logo features a friendly cartoon bee character integrated with elegant typography. The color palette uses burgundy and red tones to convey warmth and appetite appeal. The playful script font for "Bee's" contrasts with the solid block letters of "DELIGHT" to create visual interest and hierarchy.
      
      The logo was delivered in multiple formats for different applications including print, digital, packaging, and signage.
    `,
    image: "/images/bees-delight-logo.png",
    category: "design",
    tags: ["Logo Design", "Brand Identity", "Illustrator", "Typography"],
    client: "Bee's Delight Bakery",
    completedDate: "December 2022",
    liveSite: null,
    repository: null,
  },
  "ecommerce-platform": {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with payment integration and admin dashboard.",
    fullDescription: `
      This comprehensive e-commerce platform was built to provide businesses with a complete solution for online sales. The project features a responsive storefront, secure payment processing with Stripe, and a powerful admin dashboard for managing products, orders, and customers.
      
      Key features include:
      - User authentication and account management
      - Product catalog with categories and search functionality
      - Shopping cart and checkout process
      - Order tracking and history
      - Admin dashboard with sales analytics
      - Inventory management system
      - Responsive design for all devices
    `,
    image: "/placeholder.svg?height=600&width=800",
    category: "development",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    client: "E-Shop Inc.",
    completedDate: "June 2023",
    liveSite: "https://example.com/ecommerce",
    repository: "https://github.com/devdavix2/ecommerce-platform",
  },
  "task-management-app": {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    fullDescription: `
      This task management application was designed to help teams collaborate effectively on projects. Built with React and Firebase, it provides real-time updates so team members always have the latest information.
      
      Key features include:
      - User authentication and team management
      - Project creation and organization
      - Task assignment and priority setting
      - Real-time updates and notifications
      - Progress tracking and reporting
      - Comment system for task discussions
      - Deadline reminders and calendar integration
    `,
    image: "/placeholder.svg?height=600&width=800",
    category: "development",
    tags: ["React", "Firebase", "Tailwind CSS"],
    client: "TaskMaster LLC",
    completedDate: "March 2023",
    liveSite: "https://example.com/taskmanager",
    repository: "https://github.com/devdavix2/task-management",
  },
  "portfolio-website": {
    title: "Portfolio Website",
    description: "A responsive portfolio website with 3D elements and animations.",
    fullDescription: `
      This portfolio website showcases the client's work with a modern, interactive design. Built with Next.js and Three.js, it features stunning 3D elements and smooth animations to create an engaging user experience.
      
      Key features include:
      - Interactive 3D elements using Three.js
      - Smooth animations with Framer Motion
      - Responsive design for all devices
      - Project showcase with detailed case studies
      - Contact form with email integration
      - Performance optimized loading and rendering
      - SEO-friendly structure
    `,
    image: "/placeholder.svg?height=600&width=800",
    category: "development",
    tags: ["Next.js", "Three.js", "Framer Motion"],
    client: "Creative Studio",
    completedDate: "January 2023",
    liveSite: "https://example.com/portfolio",
    repository: "https://github.com/devdavix2/portfolio-website",
  },
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = projects[slug as keyof typeof projects] || null

  if (!project) {
    notFound()
  }

  const {
    title,
    description,
    fullDescription,
    image,
    category,
    tags,
    client,
    completedDate,
    liveSite,
    repository,
    galleryImages,
  } = project

  const [modalOpen, setModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")

  const openModal = (imageSrc: string) => {
    setCurrentImage(imageSrc)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-8">
            <Link href="/#work" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </Button>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-400 mb-8">{description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`text-sm px-3 py-1 rounded-full ${
                  category === "development"
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative aspect-video w-full overflow-hidden rounded-lg mb-12 cursor-pointer group"
          onClick={() => openModal(image)}
        >
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <ZoomIn className="h-12 w-12 text-white" />
          </div>
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>

        {galleryImages && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openModal(img)}
                >
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <ZoomIn className="h-8 w-8 text-white" />
                  </div>
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${title} - Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <div className="prose prose-invert max-w-none">
              {fullDescription.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-300">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 h-fit">
            <h3 className="text-xl font-bold mb-6">Project Details</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Client</p>
                  <p className="text-gray-200">{client}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-gray-200">{completedDate}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Tag className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Category</p>
                  <p className="text-gray-200 capitalize">{category}</p>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                {liveSite && (
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                    asChild
                  >
                    <Link href={liveSite} target="_blank" className="flex items-center justify-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Site
                    </Link>
                  </Button>
                )}

                {repository && (
                  <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800" asChild>
                    <Link href={repository} target="_blank" className="flex items-center justify-center">
                      <Github className="mr-2 h-4 w-4" />
                      View Repository
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageModal isOpen={modalOpen} onClose={closeModal} imageSrc={currentImage} alt={title} />
    </main>
  )
}
