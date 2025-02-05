import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ValueProposition() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        How We Make Aircon Upgrades Risk-Free and Profitable for Your Business
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Government Grant Coverage (70%)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We handle the entire grant application process, securing up to 70% coverage for your new aircon system.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Easy Monthly Payments (30% Over 12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Pay only 30% of the cost, spread over 12 months with no hidden fees or surprises.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Guaranteed ROI Through Smart Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our smart system ensures energy savings, real-time monitoring, and automated maintenance to protect your
              bottom line.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12 flex justify-center">
        <img
          src="/placeholder.svg?height=300&width=800"
          alt="3-step process: Grant Application → Installation → Smart Optimization"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="mt-8 flex justify-center">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Dashboard screenshot showing real-time energy savings"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  )
}

