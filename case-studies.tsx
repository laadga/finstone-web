"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

// Avoid SSR hydration issues by loading react-countup on the client.
const CountUp = dynamic(() => import("react-countup"), { ssr: false });

/** Hook: respects user's motion preferences */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Utility: parse a metric like "98%", "3.8x", "$1,200+", "1.5M", "€23.4k" */
function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match(
    /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
  );
  if (!m) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 };
  }
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = (normalized.split(".")[1]?.length ?? 0);
  return {
    prefix: prefix ?? "",
    end: isNaN(end) ? 0 : end,
    suffix: suffix ?? "",
    decimals,
  };
}

/** Small component: one animated metric */
function MetricStat({
  value,
  label,
  sub,
  duration = 1.6,
}: {
  value: string;
  label: string;
  sub?: string;
  duration?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);

  return (
    <div className="flex flex-col gap-2 text-left p-6">
      <p
        className="text-2xl font-medium text-navy-900 sm:text-4xl"
        aria-label={`${label} ${value}`}
      >
        {prefix}
        {reduceMotion ? (
          <span>
            {end.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}
          </span>
        ) : (
          <CountUp
            end={end}
            decimals={decimals}
            duration={duration}
            separator=","
            enableScrollSpy
            scrollSpyOnce
          />
        )}
        {suffix}
      </p>
      <p className="font-medium text-navy-900 text-left">
        {label}
      </p>
      {sub ? (
        <p className="text-gray-600 text-left">{sub}</p>
      ) : null}
    </div>
  );
}

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      quote:
        "The AI audit showed us exactly where we were wasting time and money. Within 2 weeks of implementing their recommendations, our customer response time dropped by 60% and we saved thousands on software subscriptions.",
      name: "Sophie L.",
      role: "COO of a Marketing Agency",
      image: "/robot.PNG",
      icon: DollarSign,
      metrics: [
        { value: "60%", label: "Faster Response", sub: "Customer service time" },
        { value: "$10K+", label: "Software Savings", sub: "Annual subscriptions" },
      ],
    },
    {
      id: 2,
      quote:
        "I'm not tech-savvy, but the process was seamless. The report was clear, actionable, and easy to understand. It felt like having a personal consultant guiding me step by step.",
      name: "David R.",
      role: "Founder of an E-commerce Brand",
      image: "/robot.PNG",
      icon: TrendingUp,
      metrics: [
        { value: "7 Days", label: "Audit Delivery", sub: "From start to report" },
        { value: "100%", label: "Satisfaction", sub: "Clear recommendations" },
      ],
    },
    {
      id: 3,
      quote:
        "We thought AI was only for big corporations. After the audit, we realized we could automate lead qualification, reporting, and even parts of customer support. It's like we hired three employees for a fraction of the cost.",
      name: "Maria K.",
      role: "Director of Operations at a SaaS Startup",
      image: "/robot.PNG",
      icon: Users,
      metrics: [
        { value: "3x", label: "Employee Value", sub: "For fraction of cost" },
        { value: "80%", label: "Tasks Automated", sub: "Lead qualification & reporting" },
      ],
    },
  ];

  return (
    <section
      className="py-32"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <h2
            id="case-studies-heading"
            className="text-4xl font-semibold md:text-5xl text-navy-900"
          >
            Real results from our AI audits
          </h2>
          <p className="text-gray-600">
            See how our AI business audits have transformed companies across different industries, delivering measurable results and cost savings.
          </p>
        </div>

        {/* Cases */}
        <div className="mt-20 flex flex-col gap-20">
          {caseStudies.map((study, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={study.id}
                className="grid gap-12 lg:grid-cols-3 xl:gap-24 items-center border-b-2 border-gray-300 pb-12"
              >
                {/* Left: Image + Quote */}
                <div
                  className={[
                    "flex flex-col sm:flex-row gap-10 lg:col-span-2 lg:border-r-2 lg:pr-12 xl:pr-16 text-left",
                    reversed
                      ? "lg:order-2 lg:border-r-0 lg:border-l-2 border-gray-300 lg:pl-12 xl:pl-16 lg:pr-0"
                      : "border-gray-300",
                  ].join(" ")}
                >
                  <div className="aspect-[29/35] h-auto w-full max-w-40 hover:scale-105 transition-all duration-300 flex items-center justify-center">
                    <img
                      src="/testi.png"
                      alt="Testimonial"
                      className="w-full h-full object-contain"
                      style={{ 
                        background: 'transparent',
                        backgroundColor: 'transparent'
                      }}
                    />
                  </div>
                  <figure className="flex flex-col justify-between gap-8 text-left">
                    <blockquote className="text-lg sm:text-xl text-navy-900 leading-relaxed text-left">
                      <h3 className="text-lg sm:text-xl lg:text-xl font-normal text-navy-900 leading-relaxed text-left">
                        AI-Powered Business Transformation{" "}
                        <span className="block text-gray-600 text-sm sm:text-base lg:text-lg mt-2">
                          {study.quote}
                        </span>
                      </h3>
                    </blockquote>
                    <figcaption className="flex items-center gap-6 mt-4 text-left">
                      <div className="flex flex-col gap-1">
                        <span className="text-md font-medium text-navy-900">
                          {study.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {study.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </div>

                {/* Right: Metrics */}
                <div
                  className={[
                    "grid grid-cols-1 gap-10 self-center text-left",
                    reversed ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  {study.metrics.map((metric, i) => (
                    <MetricStat
                      key={`${study.id}-${i}`}
                      value={metric.value}
                      label={metric.label}
                      sub={metric.sub}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}