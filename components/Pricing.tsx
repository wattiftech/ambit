import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const pricingPlans = [
  {
    name: "Basic",
    description: "For small businesses",
    price: "$0",
    features: ["2-3 aircon units", "70% grant coverage", "12-month payment plan", "Basic smart optimization"],
  },
  {
    name: "Standard",
    description: "For medium-sized businesses",
    price: "$0",
    features: [
      "4-6 aircon units",
      "70% grant coverage",
      "18-month payment plan",
      "Advanced smart optimization",
      "Priority support",
    ],
  },
  {
    name: "Premium",
    description: "For large businesses",
    price: "$0",
    features: [
      "7+ aircon units",
      "70% grant coverage",
      "24-month payment plan",
      "Enterprise-grade smart optimization",
      "24/7 priority support",
      "Custom integration options",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-20 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <p className="text-4xl font-bold mb-6">
                {plan.price} <span className="text-lg font-normal text-muted-foreground">upfront</span>
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

