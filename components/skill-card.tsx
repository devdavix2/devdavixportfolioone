"use client"

import { motion } from "framer-motion"

interface SkillCardProps {
  name: string
  level: number
  color?: "cyan" | "purple"
}

export default function SkillCard({ name, level, color = "cyan" }: SkillCardProps) {
  const gradientColors = {
    cyan: "from-cyan-500 to-blue-600",
    purple: "from-purple-500 to-pink-600",
  }

  return (
    <div className="bg-gray-800/50 p-3 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-xs text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-full rounded-full bg-gradient-to-r ${gradientColors[color]}`}
        />
      </div>
    </div>
  )
}
