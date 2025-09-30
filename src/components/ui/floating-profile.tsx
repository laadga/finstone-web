"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Battery, User, Settings, LogOut } from 'lucide-react';

interface FloatingProfileProps {
  clientName: string;
  batteryLevel: number;
}

export const FloatingProfile: React.FC<FloatingProfileProps> = ({
  clientName,
  batteryLevel
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBatteryEmoji = (level: number) => {
    if (level >= 100) return '🔋'; // Full battery
    if (level >= 75) return '🔋'; // 3/4 battery
    if (level >= 50) return '🔋'; // 1/2 battery
    if (level >= 25) return '🔋'; // 1/4 battery
    if (level >= 10) return '🔋'; // Very low battery
    return '🔋'; // Critical battery
  };

  const getBatteryDescription = (level: number) => {
    if (level >= 75) return 'Excellent charge';
    if (level >= 50) return 'Good charge';
    if (level >= 25) return 'Low charge';
    if (level >= 10) return 'Very low charge';
    return 'Critical charge';
  };


  return (
    <div className="fixed top-4 right-4 z-[10000]">
      {/* Collapsed State - Small Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/30 hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src="/testi.png" 
                alt="Client Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-1">
              <Battery className={`w-4 h-4 ${getBatteryColor(batteryLevel)} ${batteryLevel < 20 ? 'animate-pulse' : ''}`} />
              <span className="text-sm font-medium text-gray-800">{batteryLevel}%</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </button>
      )}

      {/* Expanded State - Full Profile Box */}
      {isExpanded && (
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl shadow-2xl p-4 w-80 animate-in slide-in-from-top-2 duration-300">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Client Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src="/testi.png" 
                alt="Client Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{clientName}</h4>
              <p className="text-sm text-gray-600">AI Agent Client</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="space-y-3 mb-4">
            {/* Battery Level */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Battery className={`w-5 h-5 ${getBatteryColor(batteryLevel)}`} />
                <span className="text-sm font-medium text-gray-800">Battery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      batteryLevel > 50 ? 'bg-green-500' : 
                      batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${batteryLevel}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getBatteryColor(batteryLevel)}`}>
                  {batteryLevel}%
                </span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Settings</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
