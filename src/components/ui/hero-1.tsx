"use client";

import * as React from "react";
import { Paperclip, Sparkles } from "lucide-react";
import { Header } from "@/components/ui/header";

const Hero1 = () => {
  return (
    <div className="min-h-screen text-navy-900 flex flex-col relative overflow-x-hidden" style={{background: 'linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235))'}}>
      {/* Header */}
      <Header isScrolled={false} />
      
      {/* Decorative Elements */}
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-40rem] right-[-30rem] z-[0] blur-[4rem] skew-[-40deg] opacity-30">
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-blue-200 to-blue-400"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-blue-200 to-blue-400"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-blue-200 to-blue-400"></div>
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-50rem] right-[-50rem] z-[0] blur-[4rem] skew-[-40deg] opacity-30">
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-blue-200 to-blue-400"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-blue-200 to-blue-400"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-br from-blue-200 to-blue-400"></div>
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-60rem] right-[-60rem] z-[0] blur-[4rem] skew-[-40deg] opacity-30">
        <div className="w-[10rem] h-[30rem] bg-gradient-to-br from-blue-200 to-blue-400"></div>
        <div className="w-[10rem] h-[30rem] bg-gradient-to-br from-blue-200 to-blue-400"></div>
        <div className="w-[10rem] h-[30rem] bg-gradient-to-br from-blue-200 to-blue-400"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto w-full">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-3 flex items-center border border-blue-400/30">
              <button className="p-2 rounded-full hover:bg-white/20 transition-all">
                <Paperclip className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/20 transition-all">
                <Sparkles className="w-5 h-5 text-white" />
              </button>
              <input
                type="text"
                placeholder="What AI employees do you need?"
                className="bg-transparent flex-1 outline-none text-white placeholder-white/70 pl-4"
              />
            </div>
          </div>

          {/* Suggestion pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-12 max-w-2xl mx-auto">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full px-4 py-2 text-sm text-white border border-blue-400/30 transition-all">
              AI Sales Agents
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full px-4 py-2 text-sm text-white border border-blue-400/30 transition-all">
              AI Marketing Agents
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full px-4 py-2 text-sm text-white border border-blue-400/30 transition-all">
              AI Support Agents
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full px-4 py-2 text-sm text-white border border-blue-400/30 transition-all">
              AI Analytics Agents
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full px-4 py-2 text-sm text-white border border-blue-400/30 transition-all">
              Get AI Audit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Hero1 };
