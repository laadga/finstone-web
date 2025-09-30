"use client";

import React, { useState, useEffect } from 'react';
import { FloatingProfile } from './floating-profile';
import { AcademySection } from './academy-section';

interface PersistentElementsProps {
  clientName?: string;
  batteryLevel?: number;
  academyCategory?: string;
}

export const PersistentElements: React.FC<PersistentElementsProps> = ({
  clientName = "John Doe",
  batteryLevel = 85,
  academyCategory = "AI"
}) => {
  const [isAcademyVisible, setIsAcademyVisible] = useState(false);

  // Simulate battery level changes over time
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change battery level slightly for demo purposes
      const change = Math.random() > 0.5 ? 1 : -1;
      const newLevel = Math.max(0, Math.min(100, batteryLevel + change));
      // Note: In a real app, you'd manage this state properly
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, [batteryLevel]);

  return (
    <>
      {/* Floating Profile with Battery System - Top Right */}
      <FloatingProfile 
        clientName={clientName} 
        batteryLevel={batteryLevel} 
      />

      {/* Academy Section Toggle Button - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsAcademyVisible(!isAcademyVisible)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="text-sm font-semibold">
            {isAcademyVisible ? 'Hide Academy' : 'Show Academy'}
          </span>
        </button>
      </div>

      {/* Academy Section - Fixed Position */}
      {isAcademyVisible && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto">
          <div className="animate-in slide-in-from-bottom-2 duration-300">
            <AcademySection categoryName={academyCategory} />
          </div>
        </div>
      )}
    </>
  );
};
