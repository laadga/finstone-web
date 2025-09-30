"use client";

import { ActionSearchBarDemo } from "@/components/ui/action-search-demo";

export default function SearchDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-800 mb-4">Action Search Bar Demo</h1>
          <p className="text-gray-600">Experience the power of intelligent command search</p>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm border border-orange-200/30 rounded-2xl p-8">
          <ActionSearchBarDemo />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Click in the search box and start typing to see the magic happen
          </p>
        </div>
      </div>
    </div>
  );
}











