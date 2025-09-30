'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { ShiningText } from "@/components/ui/shining-text"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { Star } from "lucide-react"
 
export function SplineSceneBasic() {
  return (
    <div className="w-full max-w-none h-[80vh] relative overflow-hidden">
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <div className="mb-8">
            <div className="mb-8">
              <div className="group rounded-full border border-gray-500 bg-transparent text-base transition-all ease-in hover:cursor-pointer hover:bg-gray-50 inline-block">
                <AnimatedShinyText 
                  className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-gray-600 hover:duration-300 text-sm font-medium text-black"
                  shimmerWidth={150}
                >
                  <Star className="w-3 h-3 mr-1.5" />
                  Trusted by $2M-$50M Businesses
                </AnimatedShinyText>
              </div>
            </div>
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <ShiningText text="The most efficient Hire You'll Ever Make Isn't Human." />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-black max-w-2xl mb-8 leading-relaxed">
            Finstone helps you plug in AI employees or run a full financial systems audit. 
            Save time, cut costs, and scale profitably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => document.getElementById('ai-agents')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Explore AI Agents
            </button>
            <button 
              onClick={() => window.open('https://calendly.com/finstone', '_blank')}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Book My Audit
            </button>
          </div>
        </div>

        {/* Right content - Transparent 3D Scene */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
