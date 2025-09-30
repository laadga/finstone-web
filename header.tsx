"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface HeaderProps {
  isScrolled: boolean;
}

export function Header({ isScrolled }: HeaderProps) {
  // Header component with floating navigation
  const navigationItems = [
    {
        title: "Consulting",
        href: "/#audit",
        description: "",
    },
    {
        title: "SaaS Platform",
        description: "AI agents and platform - Coming Soon",
        disabled: true,
        items: [
            { title: "Sales Agents", href: "/services/sales" },
            { title: "Marketing Agents", href: "/services/marketing" },
            { title: "Support Agents", href: "/services/support" },
            { title: "Analytics Agents", href: "/services/analytics" },
            { title: "Agent Marketplace", href: "/saas/marketplace" },
            { title: "Join Waitlist", href: "/saas" },
        ],
    },
    {
        title: "Pricing",
        href: "/pricing",
        description: "",
    },
    {
        title: "Help Center",
        href: "/resources/faq",
        description: "",
    },
  ];

  const [isOpen, setOpen] = useState(false);

  return (
    <header
      className={`z-50 fixed left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out ${
        isScrolled
          ? 'top-6 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl w-[92%] max-w-6xl'
          : 'top-0 backdrop-blur-sm w-full'
      }`}
      style={isScrolled ? {
        top: '24px',
        width: '92%',
        maxWidth: '1152px',
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.15)'
      } : {
        top: '0px',
        width: '100%',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className={`relative mx-auto flex items-center transition-all duration-500 ${
        isScrolled ? 'min-h-16 px-6' : 'min-h-20 max-w-7xl px-4 sm:px-6 lg:px-8'
      }`}>
        {/* Left Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-navy-900">Finstone</span>
          </Link>
        </div>

        {/* Center Navigation Menu */}
        <div className="flex-1 flex justify-center items-center">
          <NavigationMenu className="flex justify-center items-center">
            <NavigationMenuList className="flex justify-center gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>
                          <Button variant="ghost" className="bg-transparent hover:bg-white/20 text-navy-900 hover:text-navy-900">
                            {item.title}
                          </Button>
                        </Link>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className={`font-medium text-sm bg-transparent hover:bg-white/20 ${
                        item.disabled 
                          ? 'text-gray-400 cursor-not-allowed hover:text-gray-400' 
                          : 'text-navy-900 hover:text-navy-900'
                      }`}>
                        {item.title}
                      </NavigationMenuTrigger>
                      {!item.disabled && (
                        <NavigationMenuContent className="!w-[450px] p-4 !bg-white !border-gray-200 !rounded-xl !shadow-lg data-[state=open]:!bg-white">
                          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col">
                                <p className="text-base text-navy-900">{item.title}</p>
                                <p className="text-gray-600 text-sm">
                                  {item.description}
                                </p>
                              </div>
                              <Button size="sm" className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                                {item.title === "Consulting" ? "Book Audit" : item.title === "SaaS Platform" ? "Join Waitlist" : "Get Quote"}
                              </Button>
                            </div>
                            <div className="flex flex-col text-sm h-full justify-end">
                              {item.items?.map((subItem) => (
                                <NavigationMenuLink
                                  href={subItem.href}
                                  key={subItem.title}
                                  className="flex flex-row justify-between items-center hover:bg-white/30 py-2 px-4 rounded transition-colors"
                                >
                                  <span className="text-navy-900">{subItem.title}</span>
                                  <MoveRight className="w-4 h-4 text-gray-600" />
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      )}
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex justify-end items-center gap-4">
          <Button asChild className="hidden md:inline bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="https://calendly.com/finstone" target="_blank" rel="noopener noreferrer">
              Book Audit
            </Link>
          </Button>
          <Button asChild variant="ghost" className="bg-transparent hover:bg-white/20 text-navy-900 hover:text-navy-900">
            <Link href="/resources/faq#contact">
              Contact Sales
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex justify-between items-center"
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className={`text-lg ${item.disabled ? 'text-gray-400' : ''}`}>{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center"
                          onClick={() => setOpen(false)}
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}