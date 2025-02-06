import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Calculator, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StartSavingForm } from "./StartSavingForm"
import { UpgradeForm } from "./UpgradeForm"

export default function GetStarted() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Ready to Start Saving?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get an instant estimate of your potential grant support and monthly savings with our quick calculator.
            </p>
            <div className="flex flex-wrap gap-4">
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Saving Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Begin Your Savings Journey</DialogTitle>
                    <DialogDescription>
                      Fill out this form to get a personalized energy savings plan for your business. We'll analyze your
                      current usage and provide tailored recommendations.
                    </DialogDescription>
                  </DialogHeader>
                  <UpgradeForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">See If You Qualify</h3>
              <p className="text-gray-600">
                Find out your grant eligibility and how much support you can get for your aircon system upgrade.
              </p>
              <a
                href="https://www.enterprisesg.gov.sg/financial-support/energy-efficiency-grant"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/90 font-medium"
              >
                Check Eligibility
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">See Real Results</h3>
              <p className="text-gray-600">
                Visit nearby F&B and retail businesses using our smart AC system and learn how much they're saving each
                month.
              </p>
              <Link
                href="#meet-customers"
                className="inline-flex items-center text-primary hover:text-primary/90 font-medium"
              >
                Meet Our Customers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

