"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is an AI Audit?",
      answer: "It's a deep dive into your business processes. We show you where AI can save time, cut costs, and improve efficiency."
    },
    {
      question: "Do I need to be tech-savvy?",
      answer: "No. We handle everything for you. You don't need coding, API keys, or technical skills."
    },
    {
      question: "What do I get from the audit?",
      answer: "A detailed report with: workflow analysis, AI recommendations, ROI estimates, and a step-by-step roadmap."
    },
    {
      question: "How long does it take?",
      answer: "Most audits are delivered within 7 business days."
    },
    {
      question: "What happens after the audit?",
      answer: "You can implement the changes yourself or let us set up the AI agents and integrations for you."
    },
    {
      question: "Is my data safe?",
      answer: "Yes. We use enterprise-grade security, and your data is never shared or sold."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about our AI audits, implementations, and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-transparent backdrop-blur-sm rounded-xl border-2 border-gray-300/80 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-6 text-left flex items-center justify-between transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-navy-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-accent-blue" />
                    ) : (
                      <Plus className="w-5 h-5 text-accent-blue" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
