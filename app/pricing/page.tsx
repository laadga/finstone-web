"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { ShiningText } from '@/components/ui/shining-text';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { PricingDemo } from '@/components/ui/pricing-demo';
import { PricingComparisonDemo } from '@/components/ui/pricing-comparison-demo';

export default function PricingPage() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			setIsScrolled(scrollTop > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	
	// Scroll-based detection - floating when scrolled, static at top
	useEffect(() => {
		let scrollPosition = 0;

		const handleWheel = (e: WheelEvent) => {
			// Update scroll position based on wheel movement
			scrollPosition += e.deltaY;
			
			// If scrolled down (positive scroll), make floating
			if (scrollPosition > 0) {
				setIsScrolled(true);
			}
			// If scrolled back to top (0 or negative), make static
			else {
				scrollPosition = 0; // Don't allow negative scroll
				setIsScrolled(false);
			}
		};

		// Add wheel event listener
		window.addEventListener('wheel', handleWheel, { passive: true });

		return () => {
			window.removeEventListener('wheel', handleWheel);
		};
	}, []);

	return (
		<>
			<Header isScrolled={isScrolled} />
			<div className="relative px-4 pt-40 pb-8" style={{background: 'linear-gradient(to bottom right, rgb(219 234 254), rgb(239 246 255), rgb(229 231 235))'}}>
				<div
					className={cn(
						'absolute inset-0 z-[-10] size-full max-h-102 opacity-50',
						'[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
					)}
					style={{
						backgroundImage:
							'radial-gradient(var(--foreground) 1px, transparent 1px)',
						backgroundSize: '32px 32px',
					}}
				/>
				
				{/* Animated Pricing Cards */}
				<PricingDemo />
				
				{/* Special Note about Free Audit */}
				<div className="-mt-16 max-w-4xl mx-auto">
					<div className="text-center">
						<h3 className="text-lg font-semibold text-blue-600 mb-2">Special Offer</h3>
						<p className="text-gray-800">
							<strong>Get your AI Audit FREE when you start an AI Workforce subscription!</strong><br/>
							This $1,500 value is included at no extra cost, making the $2,000/month plan an incredible value.
						</p>
					</div>
				</div>
				
				{/* Pricing Comparison Component */}
				<PricingComparisonDemo />
				
			</div>
			<Footer />
		</>
	);
}


