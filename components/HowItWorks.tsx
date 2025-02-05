"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ClipboardCheck,
  FileText,
  Zap,
  BarChart,
  ChevronRight,
  Wallet,
  Building,
  TrendingUp,
  CheckCircle,
} from "lucide-react"

const steps = [
  {
    title: "Site Assessment",
    description: "We evaluate your current system and confirm grant eligibility.",
    icon: ClipboardCheck,
    details: [
      "On-site evaluation of your cooling system and energy usage.",
      "Eligibility check for Singapore's government grants.",
      "Calculation of potential savings.",
    ],
  },
  {
    title: "Expert Grant Support",
    description: "We help guide the application and approval process",
    icon: FileText,
    details: [
      "Step-by-step guidance for your application",
      "Support throughout approval process",
      "Up to 70% of system cost covered",
    ],
  },
  {
    title: "Installation",
    description: "Professional installation with minimal business disruption.",
    icon: Zap,
    details: [
      "Certified technicians install your new, energy-efficient system.",
      "Smart optimization system setup for maximum efficiency.",
      "Minimal disruption to your business operations.",
    ],
  },
  {
    title: "Optimization",
    description: "Continuous monitoring and optimization for maximum savings.",
    icon: BarChart,
    details: [
      "Smart system monitors and optimizes aircon usage.",
      "Monthly reports on savings and system performance.",
      "24/7 support and proactive maintenance.",
    ],
  },
]

const benefits = [
  {
    title: "No Upfront Costs",
    description: "Start saving immediately without any initial investment.",
    icon: Wallet,
  },
  {
    title: "Government Support",
    description: "Benefit from grants covering up to 70% of the upgrade costs.",
    icon: Building,
  },
  {
    title: "Guaranteed ROI",
    description: "See measurable savings on your energy bills from day one.",
    icon: TrendingUp,
  },
  {
    title: "Hassle-Free Process",
    description: "We handle everything from application to installation.",
    icon: CheckCircle,
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center mb-8">
          Upgrade Your Aircon in <span className="text-primary">4 Simple Steps</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="w-full md:w-1/3">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ease-in-out ${
                  activeStep === index ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-center">
                  <step.icon className="h-6 w-6 mr-3" />
                  <span className="font-semibold">{step.title}</span>
                  {activeStep === index && <ChevronRight className="ml-auto" />}
                </div>
              </button>
            ))}
          </div>
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <h3 className="text-2xl font-semibold mb-4">{steps[activeStep].title}</h3>
                <p className="text-muted-foreground mb-4">{steps[activeStep].description}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {steps[activeStep].details.map((detail, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

