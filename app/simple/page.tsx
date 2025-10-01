export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          🚀 Finstone AI - Simple Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">✅ Server Working</h2>
            <p className="text-gray-600">
              The Next.js server is running successfully on port 3003.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🎨 Styling Working</h2>
            <p className="text-gray-600">
              Tailwind CSS is working properly with gradients and styling.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🔗 Navigation</h2>
            <div className="space-y-2">
              <a href="/crm" className="block text-blue-600 hover:text-blue-800">CRM Dashboard</a>
              <a href="/test" className="block text-blue-600 hover:text-blue-800">Test Page</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔧 Debug Info</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Current time: {new Date().toLocaleString()}</p>
            <p>• Server port: 3003</p>
            <p>• Page: /simple</p>
            <p>• Status: ✅ Working</p>
          </div>
        </div>
      </div>
    </div>
  );
}





















