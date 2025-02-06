"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import emailjs from "emailjs-com";

interface EstablishmentInputProps {
  onInputChange: (data: {
    efficiencyRating: 2 | 3
    businessType: "F&B" | "Retail"
    totalCapacity: number
    acUnits: number
    businessName: string
    contactName: string
    contactNumber: string
  }) => void
  initialBusinessName?: string
  onCalculate: (allFieldsFilled: boolean) => void
}

export default function EstablishmentInput({
  onInputChange,
  initialBusinessName,
  onCalculate,
}: EstablishmentInputProps) {
  const [efficiencyRating, setEfficiencyRating] = useState<2 | 3 | "">("")
  const [businessType, setBusinessType] = useState<"F&B" | "Retail" | "">("")
  const [totalCapacity, setTotalCapacity] = useState<string>("")
  const [businessName, setBusinessName] = useState<string>(initialBusinessName || "")
  const [contactName, setContactName] = useState<string>("")
  const [contactNumber, setContactNumber] = useState<string>("")
  const [acUnits, setAcUnits] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialBusinessName) {
      setBusinessName(initialBusinessName)
    }
  }, [initialBusinessName])

  const handleSystemDetailChange = (
    field: "efficiencyRating" | "businessType" | "totalCapacity" | "acUnits",
    value: string | number,
  ) => {
    let updatedValue: string | number = value
    if (field === "efficiencyRating") {
      setEfficiencyRating(Number(value) as 2 | 3)
      updatedValue = Number(value)
    } else if (field === "businessType") {
      setBusinessType(value as "F&B" | "Retail")
    } else if (field === "totalCapacity") {
      setTotalCapacity(value.toString())
      updatedValue = Number(value)
    } else if (field === "acUnits") {
      setAcUnits(value.toString())
      updatedValue = Number(value)
    }

    onInputChange({
      efficiencyRating: field === "efficiencyRating" ? (updatedValue as 2 | 3) : (efficiencyRating as 2 | 3),
      businessType: field === "businessType" ? (updatedValue as "F&B" | "Retail") : (businessType as "F&B" | "Retail"),
      totalCapacity: field === "totalCapacity" ? (updatedValue as number) : Number(totalCapacity),
      acUnits: field === "acUnits" ? (updatedValue as number) : Number(acUnits),
      businessName,
      contactName,
      contactNumber,
    })
  }


  // Helper functions
  function getAirconCost(totalCapacity: number): number {
    const costs = {
      1.5: 5000,
      2.0: 5500,
      2.5: 6000,
      3.0: 7000,
      4.0: 8000,
      5.0: 10000,
    };
    const capacities = Object.keys(costs).map(Number);
    const closestCapacity = capacities.reduce((prev, curr) =>
      Math.abs(curr - totalCapacity) < Math.abs(prev - totalCapacity) ? curr : prev
    );
    return costs[closestCapacity as keyof typeof costs];
  }

  function calculateGrant(cost: number): number {
    return Math.min(cost * 0.7, 30000);
  }

  function calculateAnnualEnergyCost(
    totalCapacity: number,
    efficiencyRating: 2 | 3 | 5,
    businessType: "F&B" | "Retail"
  ): number {
    const cop = {
      2: 2.9,
      3: 3.34,
      5: 4.29,
    }[efficiencyRating];
    const weeks = 52;
    const loadFactor = businessType === "F&B" ? 0.8 : 0.7;
    const electricityRate = 0.25;
    const averageHoursPerWeek = 91;

    return (totalCapacity * 3.516 * averageHoursPerWeek * weeks * loadFactor * electricityRate) / cop;
  }
  function calculateFormValues(
    totalCapacity: number,
    efficiencyRating: 2 | 3,
    businessType: "F&B" | "Retail",
    acUnits: number
  ) {
    // Calculate system cost and grant
    const systemCost = getAirconCost(totalCapacity / acUnits) * acUnits;
    const grantCoverage = calculateGrant(systemCost);

    // Calculate current (old) system costs
    const currentAnnualEnergyCost = calculateAnnualEnergyCost(totalCapacity, efficiencyRating, businessType);
    const currentAnnualMaintenanceCost = acUnits * 800; // $800 per unit for 2-tick and 3-tick

    // Calculate new system energy costs
    const newSystemAnnualEnergyCost = calculateAnnualEnergyCost(totalCapacity, 5, businessType);

    // Calculate energy savings percentage
    const energySavingsPercentage =
      ((currentAnnualEnergyCost - newSystemAnnualEnergyCost) / currentAnnualEnergyCost) * 100;

    // Calculate annual savings
    const oldSystemAnnualCost = currentAnnualEnergyCost + currentAnnualMaintenanceCost;
    const newSystemAnnualCost = newSystemAnnualEnergyCost + (acUnits * 600); // $600 per unit for 5-tick

    const savingsYear1 = oldSystemAnnualCost - (newSystemAnnualCost + (systemCost - grantCoverage));
    const savingsYear2 = oldSystemAnnualCost - newSystemAnnualCost;
    const savingsYear3 = savingsYear2; // Same as year 2

    return {
      currentAnnualEnergyCost: currentAnnualEnergyCost.toFixed(2),
      currentAnnualMaintenanceCost: currentAnnualMaintenanceCost.toFixed(2),
      energySavingsPercentage: energySavingsPercentage.toFixed(2),
      systemCost: systemCost.toFixed(2),
      grantCoverage: grantCoverage.toFixed(2),
      savingsYear1: savingsYear1.toFixed(2),
      savingsYear2: savingsYear2.toFixed(2),
      savingsYear3: savingsYear3.toFixed(2)
    };
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate all required fields
    let errors: string[] = [];

    if (!businessName) errors.push("Business name is required.");
    if (!contactName) errors.push("Contact name is required.");
    if (!contactNumber) errors.push("Contact number is required.");
    if (!totalCapacity) errors.push("Total capacity is required.");
    if (!acUnits) errors.push("Number of AC units is required.");
    if (!businessType) errors.push("Business type is required.");
    // if (!efficiencyRating) errors.push("Efficiency rating is required.");

    if (errors.length > 0) {
      setError(errors.join("\n"));
      onCalculate(false);
      setLoading(false);
      return;
    }

    setError(null);

    try {


      // Calculate all the values using the calculation function
      const calculatedValues = calculateFormValues(
        Number(totalCapacity),
        efficiencyRating as 2 | 3,
        businessType as "F&B" | "Retail",
        Number(acUnits)
      );

      // Combine form data with calculated values
      const formData = {
        // Form input fields
        businessName,
        userName: contactName,
        phoneNumber: contactNumber,
        businessType,

        efficiencyRating,
        totalCapacity,
        numberOfUnits: acUnits,

        // Calculated values
        currentAnnualEnergyCost: calculatedValues.currentAnnualEnergyCost,
        currentAnnualMaintenanceCost: calculatedValues.currentAnnualMaintenanceCost,
        energySavingsPercentage: calculatedValues.energySavingsPercentage,
        systemCost: calculatedValues.systemCost,
        grantCoverage: calculatedValues.grantCoverage,

        savingsYear1: calculatedValues.savingsYear1,
        savingsYear2: calculatedValues.savingsYear2,
        savingsYear3: calculatedValues.savingsYear3,
      };


      console.log(formData)

      // Send email using EmailJS
      let template_id = process.env.EMAILJS_CALCULATE_TEMPLATE_ID || ""
      const response = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID as string,
        template_id,
        formData,
        process.env.EMAILJS_PUBLIC_KEY as string
      );

      console.log("Email sent successfully:", response);
      alert("Email sent successfully!");

      // Reset error state and trigger success callback
      setError(null);
      onCalculate(true);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
      setError("Failed to send email. Please try again.");
      onCalculate(false);
    } finally {
      setLoading(false);
    }
  };

  // TypeScript interface for the form data


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Establishment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Enter your business name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={businessType} onValueChange={(value) => handleSystemDetailChange("businessType", value)}>
                <SelectTrigger id="businessType">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F&B">F&B</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>System Details</Label>
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="number"
                value={totalCapacity}
                onChange={(e) => handleSystemDetailChange("totalCapacity", e.target.value)}
                min="0.1"
                step="0.1"
                placeholder="Capacity (TR)"
              />
              <Input
                type="number"
                value={acUnits}
                onChange={(e) => handleSystemDetailChange("acUnits", e.target.value)}
                min="1"
                step="1"
                placeholder="# of Units"
              />
              <Select
                value={efficiencyRating.toString()}
                onValueChange={(value) => handleSystemDetailChange("efficiencyRating", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ticks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Ticks</SelectItem>
                  <SelectItem value="3">3 Ticks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={loading} onClick={handleSubmit} className="w-full">
          View Your Savings Now
          {loading && (<span>
            <Loader2 className="w-4 h-4 animate-spin" />
          </span>)}
        </Button>
      </CardFooter>
    </Card>
  )
}

