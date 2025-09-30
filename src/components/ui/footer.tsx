"use client";

import Link from "next/link";

export function Footer() {
  const footerLinks = {
    services: [
      { title: "AI Agents", href: "#ai-agents" },
      { title: "AI Audit", href: "#audit" },
      { title: "Pricing", href: "/pricing" }
    ],
    company: [
      { title: "Contact", href: "/resources/faq#contact" },
      { title: "Help Center", href: "/resources/faq" }
    ],
    legal: [
      { title: "Terms of Service", href: "/terms-of-service" },
      { title: "Privacy Policy", href: "/privacy-policy" }
    ]
  };

  return (
    <footer id="contact" className="relative py-16 w-full" style={{background: 'linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235))'}}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-bold text-2xl text-gray-900">Finstone AI</span>
            </Link>
            <div className="text-sm text-gray-500">
              © 2024 Finstone AI. All rights reserved.
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
