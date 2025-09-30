export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">CRM Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Active Customers</h3>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
            <p className="text-3xl font-bold text-green-600">$12,500</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">New Leads</h3>
            <p className="text-3xl font-bold text-purple-600">8</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
            <p className="text-3xl font-bold text-orange-600">5</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              Add Lead
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              New Customer
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              Schedule Demo
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}