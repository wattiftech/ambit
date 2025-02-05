"use client"

import { motion } from "framer-motion"
import { Brain, Thermometer, ShieldCheck, Sprout } from "lucide-react"

const benefits = [
  {
    icon: Brain,
    title: "Intelligent Savings",
    description:
      "Our AI learns your business patterns to cut electricity costs by up to 40%. Track every saved dollar in real-time through our simple dashboard.",
  },
  {
    icon: Thermometer,
    title: "Better Business Environment",
    description:
      "Create the perfect space for your customers and staff while using less energy. Temperature mapping ensures consistent comfort throughout your premises.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Hassle Operations",
    description:
      "From grant paperwork to 24/7 monitoring, we handle everything. You focus on your business, we'll focus on keeping your AC costs low.",
  },
  {
    icon: Sprout,
    title: "Future-Ready Growth",
    description:
      "Join the sustainability movement with a system that grows with your business. Enhance your brand value while meeting future environmental standards.",
  },
]

export default function CompleteEfficiencyUpgrade() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            The Complete Efficiency Upgrade
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 p-3 bg-primary/10 rounded-full">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

