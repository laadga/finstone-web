"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { useState } from "react";

export function SaaSWaitlistForm() {
  const [email, setEmail] = useState("");

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle waitlist signup
    console.log("Waitlist signup:", email);
    setEmail("");
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">SaaS Platform Waitlist</h2>
          <p className="text-gray-600">Be the first to know when our AI Agent Platform launches!</p>
        </div>
        <form onSubmit={handleWaitlistSubmit} className="space-y-4 max-w-md mx-auto">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Join Waitlist
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </section>
  );
}
