"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, Zap, DollarSign, AlertCircle, CheckCircle, X } from "lucide-react"
import EstablishmentInput from "./EstablishmentInput"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UpgradeForm } from "./UpgradeForm"

function getAirconCost(totalCapacity: number): number {
  const costs = {
    1.5: 5000,
    2.0: 5500,
    2.5: 6000,
    3.0: 7000,
    4.0: 8000,
    5.0: 10000,
  }
  const capacities = Object.keys(costs).map(Number)
  const closestCapacity = capacities.reduce((prev, curr) =>
    Math.abs(curr - totalCapacity) < Math.abs(prev - totalCapacity) ? curr : prev,
  )
  return costs[closestCapacity as keyof typeof costs]
}

function calculateGrant(cost: number): number {
  return Math.min(cost * 0.7, 30000)
}

function calculateAnnualEnergyCost(
  totalCapacity: number,
  efficiencyRating: 2 | 3 | 5,
  businessType: "F&B" | "Retail",
): number {
  const cop = {
    2: 2.9,
    3: 3.34,
    5: 4.29,
  }[efficiencyRating]
  const weeks = 52
  const loadFactor = businessType === "F&B" ? 0.8 : 0.7
  const electricityRate = 0.25 // $0.25/kWh
  const averageHoursPerWeek = 91 // Assuming a fixed average of 91 hours per week

  return (totalCapacity * 3.516 * averageHoursPerWeek * weeks * loadFactor * electricityRate) / cop
}

interface ComparisonData {
  title: string
  annualEnergyCost: number
  annualMaintenanceCost: number
  upfrontCost: number
  grantCoverage: number
  systemCost: number
  description: string
  icon: any
  tooltipText: string
  benefits: (string | { text: string; isDisadvantage: boolean; icon?: any })[]
  monthlyInstallment?: number
  subscriptionCost?: number
  totalAnnualCostYear1: number
  totalAnnualCostSubsequentYears: number
  energySavingsPercentage?: number
  totalCostSavingsYear1?: number
  totalCostSavingsSubsequentYears?: number
  combinedMonthlyPlan?: { year1: number; year2: number; totalYear1: number; totalYear2And3: number }
  totalCostSavingsYear3?: number
  totalSavingsThreeYears?: number
  intelligenceKitUrl?: string
}

const calculateCosts = (
  efficiencyRating: 2 | 3,
  businessType: "F&B" | "Retail",
  totalCapacity: number,
  acUnits: number,
): ComparisonData[] => {
  const systemCost = getAirconCost(totalCapacity / acUnits) * acUnits
  const grant = calculateGrant(systemCost)

  const oldSystemAnnualEnergyCost = calculateAnnualEnergyCost(totalCapacity, efficiencyRating, businessType)
  const oldSystemAnnualMaintenanceCost = acUnits * 800 // $800 per unit for 2-tick and 3-tick
  const oldSystemAnnualCost = oldSystemAnnualEnergyCost + oldSystemAnnualMaintenanceCost

  const newSystemAnnualEnergyCost = calculateAnnualEnergyCost(totalCapacity, 5, businessType)
  const newSystemAnnualMaintenanceCost = acUnits * 600 // $600 per unit for 5-tick
  const newSystemAnnualCost = newSystemAnnualEnergyCost + newSystemAnnualMaintenanceCost

  // Calculate energy savings percentage
  const energySavingsPercentage =
    ((oldSystemAnnualEnergyCost - newSystemAnnualEnergyCost) / oldSystemAnnualEnergyCost) * 100

  // Ambit system calculations
  const ambitAnnualEnergyCost = newSystemAnnualEnergyCost * 0.8 // 20% less than newSystemAnnualEnergyCost
  const ambitMonthlyInstallmentYear1 = Math.round((systemCost * 0.3) / 12)
  const ambitMonthlyInstallmentYear2And3 = 100 * acUnits
  const ambitAnnualCostYear1 = ambitAnnualEnergyCost + ambitMonthlyInstallmentYear1 * 12
  const ambitAnnualCostYear2And3 = ambitAnnualEnergyCost + ambitMonthlyInstallmentYear2And3 * 12

  // Calculate savings
  const grantSavingsYear1 = oldSystemAnnualCost - (newSystemAnnualCost + (systemCost - grant))
  const grantSavingsSubsequentYears = oldSystemAnnualCost - newSystemAnnualCost
  const ambitSavingsYear1 = oldSystemAnnualCost - ambitAnnualCostYear1
  const ambitSavingsYear2And3 = oldSystemAnnualCost - (ambitAnnualEnergyCost + ambitMonthlyInstallmentYear2And3 * 12)

  return [
    {
      title: "Your Old AC Systems",
      annualEnergyCost: oldSystemAnnualEnergyCost,
      annualMaintenanceCost: oldSystemAnnualMaintenanceCost,
      upfrontCost: 0,
      grantCoverage: 0,
      systemCost: 0,
      description: "Costly and inefficient",
      icon: AlertCircle,
      tooltipText:
        "Your current system with higher energy consumption and maintenance costs. Maintenance cost is $800 per unit.",
      benefits: [
        { text: "Already installed (but wasting energy and money)", isDisadvantage: true },
        { text: "No immediate cost (but high long-term costs)", isDisadvantage: true },
        { text: "Familiar system (but outdated and unreliable)", isDisadvantage: true },
      ],
      totalAnnualCostYear1: oldSystemAnnualCost,
      totalAnnualCostSubsequentYears: oldSystemAnnualCost,
    },
    {
      title: "Energy Efficiency Grant (EEG)",
      annualEnergyCost: newSystemAnnualEnergyCost,
      annualMaintenanceCost: newSystemAnnualMaintenanceCost,
      upfrontCost: systemCost - grant,
      grantCoverage: grant,
      systemCost: systemCost,
      description: "Upfront Capex and Self-Managed",
      icon: Zap,
      tooltipText:
        "Standard upgrade with government grants but without smart optimization. Maintenance cost is $600 per unit.",
      benefits: [
        "70% Grant Coverage (but you handle the paperwork)",
        `${energySavingsPercentage.toFixed(1)}% energy savings`,
        "Improved cooling (but still not optimized)",
        "New warranty (but maintenance is still your responsibility)",
      ],
      totalAnnualCostYear1: newSystemAnnualCost + (systemCost - grant),
      totalAnnualCostSubsequentYears: newSystemAnnualCost,
      energySavingsPercentage: energySavingsPercentage,
      totalCostSavingsYear1: grantSavingsYear1,
      totalCostSavingsSubsequentYears: grantSavingsSubsequentYears,
      totalCostSavingsYear3: grantSavingsSubsequentYears,
      totalSavingsThreeYears: grantSavingsYear1 + grantSavingsSubsequentYears * 2,
    },
    {
      title: "Energy Efficiency Grant + Our Logo",
      annualEnergyCost: ambitAnnualEnergyCost,
      annualMaintenanceCost: 0,
      upfrontCost: 0,
      grantCoverage: grant,
      systemCost: systemCost,
      description: "Zero Capex with Smart Efficiency",
      icon: DollarSign,
      tooltipText: `Upgrade with government grants, 20% additional energy savings through smart optimization, and easy monthly plan for 3 years. Maintenance is included for the first 3 years.`,
      benefits: [
        "Zero Upfront Cost (we cover it for you)",
        "70% Grant Coverage (we handle the paperwork)",
        "24/7 Monitoring (no more unexpected breakdowns)",
        "Guaranteed Savings (see the results on your bill)",
        "Reduced maintenance (we take care of everything)",
        "Easy Monthly Plan for 3 years (no long-term commitment)",
      ],
      monthlyInstallment: ambitMonthlyInstallmentYear1,
      subscriptionCost: ambitMonthlyInstallmentYear2And3,
      totalAnnualCostYear1: ambitAnnualCostYear1,
      totalAnnualCostSubsequentYears: ambitAnnualCostYear2And3,
      energySavingsPercentage: ((oldSystemAnnualEnergyCost - ambitAnnualEnergyCost) / oldSystemAnnualEnergyCost) * 100,
      totalCostSavingsYear1: ambitSavingsYear1,
      totalCostSavingsSubsequentYears: ambitSavingsYear2And3,
      combinedMonthlyPlan: {
        year1: ambitMonthlyInstallmentYear1,
        year2: ambitMonthlyInstallmentYear2And3,
        totalYear1: ambitMonthlyInstallmentYear1 * 12,
        totalYear2And3: ambitMonthlyInstallmentYear2And3 * 24,
      },
      totalCostSavingsYear3: ambitSavingsYear2And3,
      totalSavingsThreeYears: ambitSavingsYear1 + ambitSavingsYear2And3 * 2,
    },
  ]
}

export default function CostComparison() {
  const blurredClass = "filter blur-sm select-none"
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>(calculateCosts(2, "F&B", 10, 4))
  const [userInfo, setUserInfo] = useState<{
    businessName: string
    contactName: string
    contactNumber: string
  }>({
    businessName: "",
    contactName: "",
    contactNumber: "",
  })
  const [isBlurred, setIsBlurred] = useState(true)
  const [partialData, setPartialData] = useState<
    Partial<{
      efficiencyRating: 2 | 3
      businessType: "F&B" | "Retail"
      totalCapacity: number
      acUnits: number
      businessName: string
      contactName: string
      contactNumber: string
    }>
  >({
    efficiencyRating: 2,
    businessType: "F&B",
    totalCapacity: 10,
    acUnits: 4,
    businessName: "",
    contactName: "",
    contactNumber: "",
  })
  const [showSavings, setShowSavings] = useState(false)
  const [systemDetailsProvided, setSystemDetailsProvided] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const businessNameFromURL = params.get("businessName")
    if (businessNameFromURL) {
      setPartialData((prevData) => ({
        ...prevData,
        businessName: businessNameFromURL,
      }))
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        businessName: businessNameFromURL,
      }))
      setIsBlurred(false)
    }
  }, [])

  const handleInputChange = (
    data: Partial<{
      efficiencyRating: 2 | 3
      businessType: "F&B" | "Retail"
      totalCapacity: number
      acUnits: number
      businessName: string
      contactName: string
      contactNumber: string
    }>,
  ) => {
    setPartialData((prevData) => ({
      ...prevData,
      ...data,
      businessName: data.businessName || prevData.businessName,
      contactName: data.contactName || prevData.contactName,
      contactNumber: data.contactNumber || prevData.contactNumber,
    }))
    if (data.businessName) {
      setUserInfo({
        businessName: data.businessName,
        contactName: data.contactName || "",
        contactNumber: data.contactNumber || "",
      })
      setIsBlurred(false)
    }

    setSystemDetailsProvided(!!data.efficiencyRating && !!data.businessType && !!data.totalCapacity && !!data.acUnits)

    // Only calculate full comparison data when all required fields are present
    if (
      data.efficiencyRating &&
      data.businessType &&
      data.totalCapacity &&
      data.acUnits &&
      data.businessName &&
      data.contactName &&
      data.contactNumber
    ) {
      const newComparisonData = calculateCosts(
        data.efficiencyRating,
        data.businessType,
        data.totalCapacity,
        data.acUnits,
      )
      setComparisonData(newComparisonData)
      setShowSavings(true)
    } else {
      setShowSavings(false)
    }
  }

  return (
    <section
      id="cost-comparison"
      className="w-full py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-10" />
      <div className="container mx-auto px-4 md:px-6 relative max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">Compare Your Options</h2>
          <p className="text-xs text-gray-500 mt-2 mb-8">
            Estimated savings based on typical usage. Actual results may vary depending on your specific operating
            conditions and electricity rates.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <EstablishmentInput
            onInputChange={handleInputChange}
            initialBusinessName={userInfo.businessName}
            onCalculate={(allFieldsFilled) => setShowSavings(allFieldsFilled)}
          />
        </div>

        {userInfo.businessName && (
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-primary">Savings calculation for: {userInfo.businessName}</h3>
          </div>
        )}

        {!userInfo.businessName && (
          <div className="text-center mb-12">
            <p className="text-lg text-primary">Enter your business details to view personalized savings information</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {comparisonData.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                className={`h-full ${
                  index === 2 ? "bg-gradient-to-b from-primary/5 to-primary/10 border-primary" : "bg-white"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center h-12">
                    {index === 2 ? (
                      <>
                        EEG +
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-bPR94Cwxrw0OsXyzGW7wfmd63CLdD1.png"
                          alt="Wattif Logo"
                          width={60}
                          height={20}
                          className="object-contain ml-1"
                        />
                      </>
                    ) : (
                      option.title
                    )}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {index === 0 ? (
                    <>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Annual Energy Cost</span>
                          <span className={`font-bold ${!systemDetailsProvided ? blurredClass : ""}`}>
                            $
                            {calculateAnnualEnergyCost(
                              partialData.totalCapacity || 10,
                              partialData.efficiencyRating || 2,
                              partialData.businessType || "F&B",
                            ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-red-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Annual Maintenance Cost</span>
                          <span className={`font-bold ${!systemDetailsProvided ? blurredClass : ""}`}>
                            $
                            {((partialData.acUnits || 4) * 800).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-red-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.6 }}
                          />
                        </div>
                      </div>
                      {!systemDetailsProvided && (
                        <div className="text-center py-4">
                          <p className="text-sm text-gray-500">
                            Fill in all details and click "View Your Savings Now" to see the comparison.
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Annual Energy Cost</span>
                          <span className={`font-bold ${!showSavings ? blurredClass : ""}`}>
                            ${option.annualEnergyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${index === 1 ? "bg-yellow-500" : "bg-primary"}`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(option.annualEnergyCost / comparisonData[0].annualEnergyCost) * 100}%`,
                            }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Annual Maintenance Cost</span>
                          <span className={`font-bold ${!showSavings ? blurredClass : ""}`}>
                            {index === 2
                              ? "Included"
                              : `$${option.annualMaintenanceCost.toLocaleString(undefined, {
                                  maximumFractionDigits: 0,
                                })}`}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${index === 1 ? "bg-yellow-500" : "bg-primary"}`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(option.annualMaintenanceCost / comparisonData[0].annualMaintenanceCost) * 100}%`,
                            }}
                            transition={{ duration: 1, delay: 0.6 + index * 0.2 }}
                          />
                        </div>
                        {index === 2 && (
                          <p className="text-xs text-gray-600 mt-1">
                            Maintenance is covered during the 3-year subscription period
                          </p>
                        )}
                      </div>

                      {showSavings ? (
                        <>
                          {index > 0 && (
                            <div className="pt-4 border-t">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Government Grant</span>
                                <span className={`font-bold text-green-500 ${!showSavings ? blurredClass : ""}`}>
                                  -${option.grantCoverage.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600">
                                {((option.grantCoverage / option.systemCost) * 100).toFixed(1)}% of system cost covered
                              </p>
                            </div>
                          )}

                          {index === 1 && (
                            <div className="pt-4 border-t">
                              <div className="flex justify-between items-center mb-2">
                                <div>
                                  <span className="text-sm font-medium">Your Up front Cost</span>
                                  <p className="text-xs text-gray-600">(After Grant)</p>
                                </div>
                                <div className="flex items-center">
                                  <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
                                  <span className={`font-bold text-red-500 ${!showSavings ? blurredClass : ""}`}>
                                    ${option.upfrontCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                  </span>
                                </div>
                              </div>
                              <div className="pt-4 border-t">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium">Energy Savings</span>
                                  <span className={`font-bold text-green-500 ${!showSavings ? blurredClass : ""}`}>
                                    {option.energySavingsPercentage?.toFixed(1)}%
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600">
                                  Savings from current system to 5-tick efficiency
                                </p>
                              </div>
                            </div>
                          )}

                          {index === 2 && (
                            <div className="pt-4 border-t">
                              <h4 className="text-sm font-medium mb-2">Easy Monthly Plan (for 3 years)</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center bg-primary/10 p-2 rounded-md">
                                  <span className="text-sm">Year 1:</span>
                                  <span className={`font-bold ${!showSavings ? blurredClass : ""}`}>
                                    $
                                    {option.combinedMonthlyPlan?.year1.toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                    })}
                                    /month
                                  </span>
                                </div>
                                <div className="flex justify-between items-center bg-primary/5 p-2 rounded-md">
                                  <span className="text-sm">Years 2-3:</span>
                                  <span className={`font-bold ${!showSavings ? blurredClass : ""}`}>
                                    $
                                    {option.combinedMonthlyPlan?.year2.toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                    })}
                                    /month
                                  </span>
                                </div>
                              </div>
                              <div className="pt-4 border-t">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium">Energy Savings</span>
                                  <span className={`font-bold text-green-500 ${!showSavings ? blurredClass : ""}`}>
                                    {option.energySavingsPercentage?.toFixed(1)}%
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600">
                                  Savings from current system with CoolSave optimization
                                </p>
                              </div>
                            </div>
                          )}

                          {index > 0 && (
                            <div className="pt-4 border-t">
                              <h3 className="text-lg font-semibold mb-4">Cost Savings</h3>
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Year 1</span>
                                  <span
                                    className={`font-bold text-lg ${
                                      (option.totalCostSavingsYear1 || 0) < 0 ? "text-red-500" : "text-green-500"
                                    }`}
                                  >
                                    $
                                    {Math.abs(option.totalCostSavingsYear1 || 0).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                    })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Year 2</span>
                                  <span
                                    className={`font-bold text-lg ${
                                      (option.totalCostSavingsSubsequentYears || 0) < 0
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }`}
                                  >
                                    $
                                    {Math.abs(option.totalCostSavingsSubsequentYears || 0).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                    })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Year 3</span>
                                  <span
                                    className={`font-bold text-lg ${
                                      (option.totalCostSavingsYear3 || 0) < 0 ? "text-red-500" : "text-green-500"
                                    }`}
                                  >
                                    $
                                    {Math.abs(option.totalCostSavingsYear3 || 0).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                    })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t">
                                  <div>
                                    <span className="text-base font-semibold">Total Savings (3 Years)</span>
                                    <p className="text-xs text-gray-600">Includes all costs and subscriptions</p>
                                  </div>
                                  <span
                                    className={`font-bold text-2xl ${
                                      (option.totalSavingsThreeYears || 0) < 0 ? "text-red-500" : "text-green-500"
                                    }`}
                                  >
                                    $
                                    {Math.abs(option.totalSavingsThreeYears || 0).toLocaleString(undefined, {
                                      maximumFractionDigits: 0,
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            {option.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-center text-sm">
                                {typeof benefit === "string" ? (
                                  <CheckCircle
                                    className={`h-4 w-4 mr-2 ${index === 2 ? "text-primary" : "text-gray-600"}`}
                                  />
                                ) : benefit.isDisadvantage ? (
                                  <X className="h-4 w-4 mr-2 text-red-500" />
                                ) : benefit.icon ? (
                                  <benefit.icon
                                    className={`h-4 w-4 mr-2 ${index === 2 ? "text-primary" : "text-gray-600"}`}
                                  />
                                ) : (
                                  <CheckCircle
                                    className={`h-4 w-4 mr-2 ${index === 2 ? "text-primary" : "text-gray-600"}`}
                                  />
                                )}
                                <span className="text-gray-600">
                                  {typeof benefit === "string" ? benefit : benefit.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-gray-500">
                            Fill in all details and click "View Your Savings Now" to see the comparison.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Maximize Your Savings?</h3>
          <p className="text-lg mb-8">
            Our experts are here to guide you through the process and help you make the best decision for your business.
          </p>
          <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Get a Personalized Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Begin Your Savings Journey</DialogTitle>
                <DialogDescription>
                  Get a personalized energy savings plan for your business. We'll respond within 1 business day.
                </DialogDescription>
              </DialogHeader>
              <UpgradeForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

