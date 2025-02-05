import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SolutionJourney() {
  const steps = [
    {
      title: "Grant Application",
      description: "We handle all paperwork and approvals, ensuring you get the maximum grant coverage.",
      timeline: "2-3 weeks",
    },
    {
      title: "Installation Coordination",
      description: "Our experts manage the entire installation process with minimal disruption to your operations.",
      timeline: "1-2 days",
    },
    {
      title: "Smart System Setup",
      description: "We install and configure our smart optimization system to maximize efficiency and savings.",
      timeline: "1 day",
    },
    {
      title: "Ongoing Optimization & Maintenance",
      description: "Enjoy hassle-free maintenance and real-time monitoring to ensure peak performance.",
      timeline: "Ongoing support",
    },
  ]

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">From Application to Savings: Here's How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{step.description}</p>
              <p className="mt-4 font-bold">Timeline: {step.timeline}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <img
          src="/placeholder.svg?height=200&width=800"
          alt="Timeline graphic with icons for each step"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="mt-8 flex justify-center">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Photos of technicians installing aircon units and setting up the smart system"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  )
}

