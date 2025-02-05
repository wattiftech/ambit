import { BarChart, Leaf, ShieldCheck, Zap } from "lucide-react"

const benefits = [
  {
    title: "Energy Efficiency",
    description: "Cut your energy consumption and reduce your carbon footprint significantly.",
    icon: Leaf,
  },
  {
    title: "Cost Savings",
    description: "Lower your monthly bills with our smart optimization system.",
    icon: BarChart,
  },
  {
    title: "Improved Performance",
    description: "Enjoy better cooling and air quality with modern equipment.",
    icon: Zap,
  },
  {
    title: "Peace of Mind",
    description: "24/7 monitoring and proactive maintenance keep your system running smoothly.",
    icon: ShieldCheck,
  },
]

export default function BenefitsOfUpgrading() {
  return (
    <section id="benefits" className="w-full py-16 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Benefits of Upgrading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

