import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingModel() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing with Guaranteed Savings</h2>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>For a typical 5-unit aircon setup:</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Total Cost:</strong> $20,000
            </li>
            <li>
              <strong>Grant Coverage (70%):</strong> $14,000
            </li>
            <li>
              <strong>Your Cost (30%):</strong> $6,000
            </li>
            <li>
              <strong>Monthly Payment:</strong> $500 over 12 months
            </li>
            <li>
              <strong>Guaranteed Monthly Savings:</strong> $300
            </li>
            <li>
              <strong>Net Monthly Cost:</strong> $200
            </li>
          </ul>
          <div className="mt-6">
            <h3 className="font-bold mb-2">Year 1 vs. Year 2:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Year 1:</strong> Pay $200/month after savings.
              </li>
              <li>
                <strong>Year 2:</strong> Enjoy $300/month in pure savings.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <div className="mt-12 flex justify-center">
        <img
          src="/placeholder.svg?height=300&width=600"
          alt="Comparison chart showing Year 1 and Year 2 savings"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="mt-8 flex justify-center">
        <img
          src="/placeholder.svg?height=300&width=600"
          alt="Simple bar graph comparing old vs. new system costs"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  )
}

