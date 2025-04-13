import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-6">Project Not Found</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        The project you're looking for doesn't exist or has been moved to a different location.
      </p>
      <Button asChild>
        <Link href="/#work" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
      </Button>
    </div>
  )
}
