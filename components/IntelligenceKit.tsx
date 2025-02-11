import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Wifi, BarChart3 } from "lucide-react"

const kitItems = [
  {
    title: "Smart Controller",
    description: "Connects to your existing AC system for intelligent control",
    icon: Cpu,
    image: "/images/Controller.png",
  },
  {
    title: "Wireless Sensor",
    description: "Monitors temperature and humidity in real-time",
    icon: Wifi,
    image: "/images/Energy-Meter.svg",
  },
  {
    title: "Energy Meter",
    description: "Tracks power consumption for optimized savings",
    icon: BarChart3,
    image: "/images/Sensor.png",
  },
]

export default function IntelligenceKit() {
  return (
    <section id="intelligence-kit" className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Our Intelligence Kit
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Cutting-edge hardware that transforms your existing AC into a smart, efficient system
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kitItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center text-lg">
                  <item.icon className="w-6 h-6 mr-2 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

