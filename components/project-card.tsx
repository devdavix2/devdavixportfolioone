"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  category: "development" | "design"
  slug: string
  liveUrl?: string
}

export default function ProjectCard({
  title = "",
  description = "",
  tags = [],
  image = "/placeholder.svg",
  category = "development",
  slug = "",
  liveUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
      {liveUrl && (
        <Link
          href={liveUrl}
          target="_blank"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-800/80 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      )}

      <Link href={`/projects/${slug}`}>
        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${
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

          <motion.div
            className="absolute bottom-4 right-4"
            animate={{
              x: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            initial={{ x: 10, opacity: 0 }}
          >
            <div
              className={`p-2 rounded-full ${
                category === "development" ? "bg-cyan-500/20 text-cyan-400" : "bg-purple-500/20 text-purple-400"
              }`}
            >
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </motion.div>
        </div>
      </Link>
    </div>
  )
}
