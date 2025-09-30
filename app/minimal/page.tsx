"use client";

export default function MinimalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          🎉 Finstone AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Minimal test page - if you see this, everything is working!
        </p>
        <div className="space-y-4">
          <a 
            href="/" 
            className="block bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Go to Main Website
          </a>
          <a 
            href="/simple" 
            className="block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Go to Simple Page
          </a>
          <a 
            href="/crm" 
            className="block bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Go to CRM Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}





















