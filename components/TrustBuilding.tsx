import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TrustBuilding() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Trusted by F&B Businesses Across [Your Region]</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Case Studies</CardTitle>
          </CardHeader>
          <CardContent>
            <p>See how [Business Name] saved $X,XXX annually with our solution.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Grant Approval Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p>95% grant approval rate for our clients.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <p>"The process was seamless, and the savings are real." – [Customer Name], [Business Name]</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our team has X years of experience in aircon installation and energy optimization.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Support Guarantees</CardTitle>
          </CardHeader>
          <CardContent>
            <p>24/7 support and a 100% satisfaction guarantee.</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12 flex justify-center">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Map showing customer locations"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="mt-8 flex justify-center">
        <img
          src="/placeholder.svg?height=300&width=800"
          alt="Photos of happy customers and their businesses"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  )
}

