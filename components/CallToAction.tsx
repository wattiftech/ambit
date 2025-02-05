import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CallToAction() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Ready to Start Saving?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <Button size="lg">Book a Free Site Assessment Today</Button>
              <p className="mt-2 text-sm text-muted-foreground">No Obligation, Just Savings</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Check Your Eligibility in 60 Seconds</h3>
              <form className="space-y-4">
                <Input type="text" placeholder="Business Name" />
                <Input type="email" placeholder="Email Address" />
                <Input type="tel" placeholder="Phone Number" />
                <Button type="submit" className="w-full">
                  Check Eligibility
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

