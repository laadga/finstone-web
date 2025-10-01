import Link from 'next/link';

export default function AuthCallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">🎉 Google Login Success!</h1>
        <p className="text-gray-600 mb-4">Authentication completed successfully!</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Go to Main Page
        </Link>
      </div>
    </div>
  );
}
