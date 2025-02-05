"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GrantApplicationForm } from "./GrantApplicationForm"

const grantSections = [
  {
    title: "About the Grant",
    icon: Info,
    content:
      "Get up to 70% funding support for energy-efficient AC upgrades through Enterprise Singapore's EEG program. While available to multiple sectors, we specialize in helping F&B and retail businesses maximize this grant.",
  },
  {
    title: "Grant Benefits",
    icon: CheckCircle,
    items: [
      "Up to $30,000 in support",
      "70% of system costs covered",
      "Coverage for premium 5-tick AC units",
      "Significant energy cost reduction",
    ],
  },
  {
    title: "Key Requirements",
    icon: AlertTriangle,
    items: [
      "Singapore-registered business",
      "Min. 30% local shareholding",
      "Apply before equipment purchase",
      "System used in Singapore",
    ],
  },
]

export default function EnergyEfficiencyGrant() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section id="energy-efficiency-grant" className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The Energy Efficiency Grant
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-center text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The Energy Efficiency Grant (EEG) provides up to 70% support for eligible businesses to upgrade to
          energy-efficient equipment. While the grant covers various sectors, we specialize in helping F&B and retail
          businesses maximize their benefits.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {grantSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white h-full transition-all duration-300 hover:shadow-lg border border-gray-200">
                <CardHeader className="bg-primary/5 rounded-t-lg">
                  <CardTitle className="flex items-center text-lg sm:text-xl font-semibold text-primary">
                    <section.icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 sm:pt-6">
                  {section.content ? (
                    <p className="text-sm sm:text-base text-gray-600">{section.content}</p>
                  ) : (
                    <ul className="space-y-2">
                      {section.items?.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                        >
                          <span className="bg-primary/20 w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-2xl mx-auto border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-primary">
            Grant Calculation Example
          </h3>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 text-center text-gray-600">
            For a typical F&B or Retail business:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-center">
            <motion.div
              className="bg-primary/5 p-4 sm:p-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="font-semibold text-primary mb-2">System Cost</p>
              <p className="text-2xl sm:text-3xl text-primary">$20,000</p>
            </motion.div>
            <motion.div
              className="bg-primary/5 p-4 sm:p-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="font-semibold text-primary mb-2">Grant Covers</p>
              <p className="text-2xl sm:text-3xl text-primary">$14,000</p>
              <p className="text-xs sm:text-sm text-primary/80">(70% of system cost)</p>
            </motion.div>
            <motion.div
              className="col-span-1 sm:col-span-2 bg-primary/10 p-4 sm:p-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="font-semibold text-primary mb-2">Your Cost</p>
              <p className="text-3xl sm:text-4xl text-primary">$6,000</p>
            </motion.div>
          </div>
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full bg-white shadow-inner flex items-center justify-center">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-wjJ0l612vUI3Dodt5BRBVWTnuLUnVn.png"
                        alt="Ambit Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-primary">Leverage your grant</span>
                      <span className="text-base font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
                        Upgrade without upfront costs
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Apply for Energy Efficiency Grant</DialogTitle>
                  <DialogDescription>
                    Fill out this form to start your grant application process. We'll guide you through every step.
                  </DialogDescription>
                </DialogHeader>
                <GrantApplicationForm onSubmit={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

