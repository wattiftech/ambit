"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, Wallet, Zap, FileText, Thermometer, Store, UtensilsCrossed } from "lucide-react"

const benefits = [
  {
    icon: Wallet,
    text: "$0 Cash Outlay Required",
    subtext: "Start saving immediately with our flexible monthly plan.",
  },
  {
    icon: Zap,
    text: "Cut AC Costs by Up to 42%",
    subtext: "Smart optimization delivers savings from day one.",
  },
  {
    icon: FileText,
    text: "Energy Efficiency Grant Application Assistance",
    subtext: "Expert guidance to help you secure your energy efficiency grant.",
  },
  {
    icon: Thermometer,
    text: "24/7 Smart Optimization System",
    subtext: "Sensors track conditions and auto-adjust your AC. Maximize savings while maintaining comfort.",
  },
]

const backgroundPattern = (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff9966" />
        <stop offset="50%" stopColor="#ff5e62" />
        <stop offset="100%" stopColor="#0061ff" />
      </linearGradient>
      <filter id="noise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0.1" />
        <feBlend in="SourceGraphic" mode="overlay" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGradient)" />
    <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1" />
    <g fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
      <path d="M0,50 Q250,0 500,50 T1000,50" />
      <path d="M0,100 Q250,50 500,100 T1000,100" />
      <path d="M0,150 Q250,100 500,150 T1000,150" />
    </g>
    <circle cx="5%" cy="20%" r="50" fill="rgba(255,255,255,0.1)" />
    <circle cx="95%" cy="60%" r="100" fill="rgba(255,255,255,0.1)" />
    <path d="M50,0 Q100,25 150,0 T250,0" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
    <path d="M50,1000 Q100,975 150,1000 T250,1000" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
  </svg>
)

export default function HeroSection() {
  const handleGetSavingsEstimate = () => {
    const compareSection = document.getElementById("cost-comparison")
    if (compareSection) {
      compareSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleEnergyEfficiencyGrant = () => {
    const grantSection = document.getElementById("energy-efficiency-grant")
    if (grantSection) {
      grantSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 z-0">{backgroundPattern}</div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="mb-8 flex justify-center items-center space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white">
              <UtensilsCrossed className="w-5 h-5 mr-2" />
              F&B
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4 bg-white/20 text-white">
              <Store className="w-5 h-5 mr-2" />
              Retail
            </Badge>
          </motion.div>
          <motion.h1
            className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl leading-none mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="block">Save up to 30% Every Month</span>
            <span className="block">on Your Power Bills</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-xl text-white/90 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Upgrade your expensive aircon systems today with up to $30,000 Enterprise Singapore's Energy Efficiency
            Grant.
          </motion.p>
          <motion.p
            className="text-xl text-white/90 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Ambit helps maximize your benefits:
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8 mt-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-400/20 flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-white stroke-[1.5]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium text-white/90 whitespace-nowrap">{benefit.text}</span>
                  <span className="text-xs text-white/70">{benefit.subtext}</span>
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button
              className="w-full sm:w-auto h-12 px-6 font-medium text-blue-900 transition-colors bg-white hover:bg-gray-100 text-base sm:text-lg rounded-full shadow-lg"
              onClick={handleGetSavingsEstimate}
            >
              Get Your Savings Estimate
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="default"
              className="w-full sm:w-auto h-12 px-6 font-medium text-white bg-primary hover:bg-primary/90 text-base sm:text-lg rounded-full shadow-lg"
              onClick={handleEnergyEfficiencyGrant}
            >
              Energy Efficiency Grant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

