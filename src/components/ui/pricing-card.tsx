"use client"

import * as React from "react"
import { BadgeCheck, ArrowRight } from "lucide-react"
import NumberFlow from "@number-flow/react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface PricingTier {
  name: string
  price: Record<string, number | string>
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  popular?: boolean
}

interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency]
  const isHighlighted = tier.highlighted
  const isPopular = tier.popular

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden p-10 min-h-[550px]",
        isHighlighted
          ? "bg-foreground text-background"
          : "bg-background text-foreground",
        isPopular && "ring-2 ring-primary scale-110 min-h-[550px] p-10"
      )}
    >
      {isHighlighted && <HighlightedBackground />}
      {isPopular && <PopularBackground />}

      <h2 className="text-2xl font-bold capitalize text-center">
        {tier.name}
      </h2>

      <div className="relative h-12">
        {typeof price === "number" ? (
          <>
            <NumberFlow
              format={{
                style: "currency",
                currency: "USD",
              }}
              value={paymentFrequency === "yearly" ? price * 12 : price}
              className="text-4xl font-bold"
            />
            <p className="-mt-2 text-sm text-muted-foreground">
              {paymentFrequency === "yearly" ? "Per year" : "Per month"}
            </p>
          </>
        ) : (
          <h1 className="text-4xl font-bold">{price}</h1>
        )}
      </div>

      <div className="flex-1 space-y-2 mt-4">
        <h3 className="text-base font-medium">{tier.description}</h3>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-sm font-medium",
                isHighlighted ? "text-background" : "text-muted-foreground"
              )}
            >
              <BadgeCheck className="h-4 w-4 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={cn(
          "w-full py-3 text-base font-semibold transition-all duration-200 rounded-lg flex items-center justify-center relative z-30 cursor-pointer",
          isHighlighted 
            ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105 shadow-lg"
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Button clicked:', tier.cta);
          if (tier.cta === "Contact Us") {
            window.open("mailto:contact@finstone.com?subject=Enterprise Plan Inquiry", "_blank");
          } else {
            window.location.href = "#signup";
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        {tier.cta}
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </Card>
  )
}

const HighlightedBackground = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
)

const PopularBackground = () => (
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
)
