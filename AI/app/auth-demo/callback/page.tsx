export default function AuthCallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">🎉 Authentication Successful!</h1>
        <p className="text-gray-600 mb-4">Google login worked! Redirecting to main page...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">You can close this tab and go back to the main page</p>
      </div>
    </div>
  );
}





















