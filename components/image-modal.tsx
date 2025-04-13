"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt: string
}

export default function ImageModal({ isOpen, onClose, imageSrc, alt }: ImageModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="relative w-full h-full max-h-[90vh]">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={alt}
            width={1200}
            height={800}
            className="object-contain max-h-[90vh]"
            priority
          />
        </div>
      </div>
    </div>
  )
}
