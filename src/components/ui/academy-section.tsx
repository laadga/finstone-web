import React from "react";
import { GraduationCap, Users, BookOpen, Trophy, ArrowRight } from "lucide-react";

interface AcademySectionProps {
  categoryName: string;
}

export const AcademySection = ({ categoryName }: AcademySectionProps) => {
  const content = {
    title: "Finstone Academy",
    description: "Join our exclusive Whop community and master AI automation across all business functions with comprehensive courses, expert mentorship, and peer networking.",
    features: [
      "AI Fundamentals & Automation",
      "Cross-Department Mastery",
      "Hands-on Projects & Labs",
      "Expert Mentorship Program"
    ]
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-blue-200/40 p-8 mb-8">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-200/20 to-purple-200/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-indigo-400/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-300/20 to-pink-300/20 rounded-full translate-y-12 -translate-x-12"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full"></div>
      
      {/* Content Container */}
      <div className="relative z-10">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{content.title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">{content.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-all duration-200 cursor-pointer group bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-200/30 hover:bg-white/40">
          <span className="font-semibold text-sm">Join Academy</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            Course Features
          </h3>
          <div className="space-y-3">
            {content.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-700 bg-white/30 rounded-lg p-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex-shrink-0"></div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            Community Benefits
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700 bg-white/30 rounded-lg p-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="font-medium">Exclusive Whop Community Access</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 bg-white/30 rounded-lg p-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="font-medium">Live Q&A Sessions</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 bg-white/30 rounded-lg p-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="font-medium">Peer Networking</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 bg-white/30 rounded-lg p-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="font-medium">Certification Programs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-md">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-lg">Ready to Level Up?</p>
            <p className="text-gray-600 font-medium">Join thousands of professionals already learning</p>
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform">
          Start Learning
        </button>
      </div>
      </div>
    </div>
  );
};
