"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { useState, useEffect } from "react";

export default function PrivacyPolicy() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235))',
        position: 'relative'
      }}
    >
      {/* Override any component backgrounds */}
      <style jsx global>{`
        body {
          background: linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235)) !important;
        }
        .min-h-screen {
          background: linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235)) !important;
        }
      `}</style>
      
      {/* Navigation Header */}
      <Header isScrolled={isScrolled} />
      
      {/* Main Content */}
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-8 shadow-lg">
            <h1 className="text-4xl font-bold text-navy-900 mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: December 2024</p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-navy-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">We collect information you provide directly to us, such as when you:</p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Create an account or use our services</li>
                <li>Fill out forms on our website</li>
                <li>Contact us for support or inquiries</li>
                <li>Subscribe to our newsletter or waitlist</li>
                <li>Participate in surveys or feedback forms</li>
              </ul>
              
              <p className="text-gray-700 mb-4">The types of information we may collect include:</p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, company information</li>
                <li><strong>Business Data:</strong> Information about your business processes, workflows, and operations</li>
                <li><strong>Usage Data:</strong> Information about how you use our services and website</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
              </ul>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Develop new products and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Service Providers:</strong> With third-party vendors who assist us in operating our services</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of assets</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Consent:</strong> When you have given us explicit consent to share your information</li>
              </ul>
              
              <p className="text-gray-700 mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-6">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-700 mb-6">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Opt out of certain communications and data processing</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
              </ul>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-6">
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our services.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">8. Third-Party Services</h2>
              <p className="text-gray-700 mb-6">
                Our services may contain links to third-party websites or integrate with third-party services. This privacy policy does not apply to those third-party services, and we are not responsible for their privacy practices. We encourage you to review their privacy policies.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700 mb-6">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-6">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new privacy policy on this page and updating the "Last updated" date. We encourage you to review this privacy policy periodically.
              </p>

              <h2 className="text-2xl font-semibold text-navy-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> contact@finstonelab.com</p>
                <p className="text-gray-700"><strong>Website:</strong> finstonelab.com</p>
                <p className="text-gray-700"><strong>Data Protection Officer:</strong> privacy@finstonelab.com</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  This Privacy Policy is effective as of the date listed above and will remain in effect except with respect to any changes in its provisions in the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
