import { ArcGalleryHero } from "@/components/ui/arc-gallery-hero-component";
import { useIntersectionObserver } from "./use-intersection-observer";

export function CompanyLogosArc() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.2 });
  // Company logos from your public folder
  const companyLogos = [
    '/slack.png',
    '/hubspot.jpg',
    '/salesforce.png',
    '/notion.jpg',
    '/chat.jpg',
    '/outlook.png',
    '/gmail.jpg',
    '/excel.jpg',
    '/airtable.jpg',
    '/stripe.png',
    '/+.jpg',
  ];

  return (
    <div ref={ref} className="w-full py-4">
      {/* Integration Text */}
      <div 
        className={`text-center mb-3 px-4 transition-all duration-1000 ease-out ${
          isIntersecting 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Integrates with all your apps
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
          Connect Finstone to your favorite tools and services. Our AI agents work seamlessly across your entire tech stack.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
          Browse all integrations
        </button>
      </div>
      
      <div 
        className={`transition-all duration-1200 ease-out delay-300 ${
          isIntersecting 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}
      >
        <ArcGalleryHero 
          images={companyLogos}
          startAngle={30}
          endAngle={150}
          radiusLg={800}
          radiusMd={600}
          radiusSm={450}
          cardSizeLg={120}
          cardSizeMd={100}
          cardSizeSm={80}
        />
      </div>
    </div>
  );
}
