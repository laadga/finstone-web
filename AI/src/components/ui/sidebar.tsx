import React from "react";
import { X, Home, Users, BarChart3, Settings, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "AI", href: "?category=AI", icon: BarChart3 },
  { name: "Sales", href: "?category=Sales", icon: Users },
  { name: "Marketing", href: "?category=Marketing", icon: BarChart3 },
  { name: "Support", href: "?category=Support", icon: HelpCircle },
  { name: "IT Ops", href: "?category=IT Ops", icon: Settings },
  { name: "Document Ops", href: "?category=Document Ops", icon: BarChart3 },
  { name: "Other", href: "?category=Other", icon: Users },
];

export const Sidebar = ({ isOpen, onClose, selectedCategory, onCategoryChange }: SidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = selectedCategory === item.name || 
                (item.name === "AI" && selectedCategory === "AI") ||
                (item.name === "Sales" && selectedCategory === "Sales") ||
                (item.name === "Marketing" && selectedCategory === "Marketing") ||
                (item.name === "Support" && selectedCategory === "Support") ||
                (item.name === "IT Ops" && selectedCategory === "IT Ops") ||
                (item.name === "Document Ops" && selectedCategory === "Document Ops") ||
                (item.name === "Other" && selectedCategory === "Other");
              
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onCategoryChange(item.name);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
