"use client"

import { Zap, Cpu, ShieldCheck, CreditCard } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const features = [
  {
    title: "Efficient Equipment",
    description:
      "Upgrade to the latest energy-efficient AC system with up to 70% grant support. Our intelligent optimization reduces your electricity costs from day one.",
    icon: Zap,
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Pay-As-You-Save Model",
    description:
      "Our subscription model eliminates upfront costs. Start saving immediately with our flexible monthly plan.",
    icon: CreditCard,
    color: "from-green-400 to-green-600",
  },
  {
    title: "Intelligent Optimization",
    description:
      "Our smart technology automatically adjusts your AC based on real usage patterns and weather conditions, maximizing savings without sacrificing comfort.",
    icon: Cpu,
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Total Support",
    description:
      "We handle optimization and maintenance, ensuring your system performs at peak efficiency and delivers consistent savings year-round.",
    icon: ShieldCheck,
    color: "from-orange-400 to-orange-600",
  },
]

export default function EnergyEfficiencySection() {
  return (
    <section id="solution" className="w-full py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl mb-6">
            Energy Efficiency <span className="text-primary">Simplified</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Maximize your Energy Efficiency Grant (EEG) benefits with zero upfront costs. Our 'pay-as-you-save'
            subscription model helps you qualify for up to 70% funding support while delivering immediate energy savings
            with intelligent optimization.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-20 max-w-5xl"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative aspect-[21/9]">
                <Image
                  src="/placeholder.svg?height=720&width=1680"
                  alt="Energy savings dashboard"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                  y: -10,
                }}
                className="bg-white rounded-3xl shadow-lg p-6 relative overflow-hidden transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5`} />
                <motion.div className="relative z-10" whileHover={{ y: -5 }}>
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

