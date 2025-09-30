export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ✅ Test Page Working!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          If you can see this, the server is working properly.
        </p>
        <div className="space-y-4">
          <a 
            href="/" 
            className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Main Website
          </a>
          <a 
            href="/crm" 
            className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to CRM Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}