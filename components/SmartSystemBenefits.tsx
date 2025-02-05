import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SmartSystemBenefits() {
  const benefits = [
    {
      title: "Prevents Energy Waste",
      description: "Our system adjusts cooling based on real-time needs, eliminating inefficiencies.",
    },
    {
      title: "Real-Time Problem Detection",
      description: "Get instant alerts for any issues, avoiding costly downtime.",
    },
    {
      title: "Savings Verification",
      description: "Track your energy savings through our easy-to-use dashboard.",
    },
    {
      title: "Maintenance Automation",
      description: "Proactive maintenance ensures your system runs smoothly 24/7.",
    },
  ]

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Smart Optimization for Smarter Savings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Dashboard screenshot showing energy usage and savings"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="mt-8 flex justify-center">
        <img
          src="/placeholder.svg?height=200&width=800"
          alt="Icons representing each benefit"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  )
}

