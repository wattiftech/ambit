"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, Thermometer, ShieldCheck, TrendingUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UpgradeForm } from "./UpgradeForm"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Zap,
    title: "Maximum Savings, Minimum Effort",
    description:
      "Cut your AC electricity costs by up to 40% while our system does all the work. No complex controls, just consistent savings every month.",
  },
  {
    icon: Thermometer,
    title: "Always Comfortable",
    description:
      "Perfect temperature throughout your space. No more hot spots or wasted cooling - just efficient, even comfort for your customers.",
  },
  {
    icon: ShieldCheck,
    title: "Everything Covered",
    description:
      "We guide you through grant application, while handling system optimization and maintenance to help maximize your savings.",
  },
  {
    icon: TrendingUp,
    title: "Protected Investment",
    description:
      "Your system keeps getting smarter and more efficient over time. Regular updates and proactive maintenance protect your long-term savings.",
  },
]

export default function AboutBliss() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)

  return (
    <section id="about-bliss" className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Why Choose Ambit?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of AC management with our cutting-edge solutions designed to optimize your energy
            consumption and reduce costs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="bg-gray-50 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 bg-blue-100 rounded-full">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hoveredFeature === index ? 1 : 0,
                  scale: hoveredFeature === index ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-blue-600 rounded-2xl p-8 flex items-center justify-center"
              >
                <p className="text-white text-center font-medium">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
            <DialogTrigger asChild>
              <Button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition duration-150 ease-in-out">
                Get Started with Ambit
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
        </motion.div>
      </div>
    </section>
  )
}

