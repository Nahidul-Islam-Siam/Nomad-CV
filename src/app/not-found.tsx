import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function notFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1eb] relative overflow-hidden">
      {/* Large 404 background text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[20rem] md:text-[25rem] lg:text-[30rem] font-bold text-white/20 select-none leading-none">
          404
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">Page not found</h1>

        <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md mx-auto">
          Maecenas interdum, metus ut rhoncus dignissim, lorem mi convallis nisl, sit amet facilisis nisl nulla non
          odio. Praesellus mauris quam, ullamcorper.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
        >
          Go to Home
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  )
}
