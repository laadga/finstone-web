"use client"

import * as React from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"
import { cn } from "@/lib/utils"

interface PricingSectionProps {
  title: string
  subtitle: string
  tiers: PricingTier[]
  frequencies: string[]
}

export function PricingSection({
  title,
  subtitle,
  tiers,
  frequencies,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0])

  return (
    <section className="flex flex-col items-center gap-16 py-16">
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
        </div>
        <div className="mx-auto flex w-fit rounded-full bg-muted p-1">
          {frequencies.map((freq) => (
            <Tab
              key={freq}
              text={freq}
              selected={selectedFrequency === freq}
              setSelected={setSelectedFrequency}
              discount={freq === "yearly"}
            />
          ))}
        </div>
      </div>

      <div className="grid w-full max-w-7xl gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier, index) => (
          <div key={tier.name} className="relative">
            {tier.popular && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-orange-500/40 to-red-500/40 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                  🔥 Most Popular
                </div>
              </div>
            )}
            <PricingCard
              tier={tier}
              paymentFrequency={selectedFrequency}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
