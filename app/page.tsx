"use client"

import HeroSection from "@/components/HeroSection"
import EnergyEfficiencySection from "@/components/EnergyEfficiencySection"
import AboutBliss from "@/components/AboutBliss"
import CostComparison from "@/components/CostComparison"
import HowItWorks from "@/components/HowItWorks"
import IntelligenceKit from "@/components/IntelligenceKit"
import GetStarted from "@/components/GetStarted"
import EnergyEfficiencyGrant from "@/components/EnergyEfficiencyGrant"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <EnergyEfficiencySection />
      <EnergyEfficiencyGrant />
      <AboutBliss />
      <CostComparison />
      <HowItWorks />
      <IntelligenceKit />
      <GetStarted />
    </div>
  )
}

