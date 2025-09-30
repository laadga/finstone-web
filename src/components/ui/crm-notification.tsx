"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface CRMNotificationProps {
  onClose: () => void;
}

export function CRMNotification({ onClose }: CRMNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">
              CRM Dashboard Ready!
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Your Finstone CRM dashboard is now integrated and ready to use.
            </p>
            <div className="mt-2">
              <a
                href="/crm"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Access Dashboard →
              </a>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}





















