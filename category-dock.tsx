'use client';

import { 
  Bot,
  Briefcase, 
  Settings, 
  TrendingUp, 
  FileText, 
  Wrench,
  Headphones
} from 'lucide-react';

interface CategoryDockProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  {
    name: 'AI',
    icon: <Bot className='h-6 w-6' />,
  },
  {
    name: 'Sales',
    icon: <Briefcase className='h-6 w-6' />,
  },
  {
    name: 'IT Ops',
    icon: <Settings className='h-6 w-6' />,
  },
  {
    name: 'Marketing',
    icon: <TrendingUp className='h-6 w-6' />,
  },
  {
    name: 'Document Ops',
    icon: <FileText className='h-6 w-6' />,
  },
  {
    name: 'Other',
    icon: <Wrench className='h-6 w-6' />,
  },
  {
    name: 'Support',
    icon: <Headphones className='h-6 w-6' />,
  },
];


export function CategoryDock({ selectedCategory, onCategoryChange }: CategoryDockProps) {
  return (
    <div className='fixed bottom-4 left-1/2 z-50 max-w-full -translate-x-1/2'>
      <div className='mx-auto flex w-fit gap-4 rounded-2xl bg-white/20 backdrop-blur-sm px-6 py-4 border border-white/30 shadow-lg'>
        {/* Category Items */}
        {categories.map((category, idx) => (
          <button
            key={`cat-${idx}`}
            className={`group relative aspect-square w-12 h-12 transition-all duration-200 flex items-center justify-center hover:scale-110 ${
              selectedCategory === category.name 
                ? 'text-blue-700' 
                : 'text-blue-500 hover:text-blue-600'
            }`}
            onClick={() => onCategoryChange(category.name)}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs whitespace-nowrap">
              {category.name}
            </div>
            <div className={selectedCategory === category.name ? 'text-blue-700' : 'text-blue-500'}>
              {category.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
