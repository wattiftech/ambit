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
  const [numberOfUnits, setNumberOfUnits] = useState<string>("")
  const [businessName, setBusinessName] = useState<string>(initialBusinessName || "")
  const [userName, setUserName] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const allFieldsFilled =
      !!businessName &&
      !!contactName &&
      !!contactNumber &&
      !!totalCapacity &&
      !!acUnits &&
      !!businessType &&
      !!efficiencyRating

    if (!allFieldsFilled) {
      setError("Please fill in all fields")
      onCalculate(false)
      return
    }

    try {
      let formData = {
        businessName,
        contactName,
        contactNumber,
        businessType,
        acUnits,
        totalCapacity,
        efficiencyRating
      }
      const response = await emailjs.send(
        process.env.EmailJS_Service_ID as string, // Your EmailJS Service ID
        process.env.EMAILJS_CALCULATE_TEMPLATE_ID as string, // Your EmailJS Template ID
        formData,
        process.env.EmailJS_Public_Key as string // Your EmailJS Public Key
      );

      console.log("Email sent successfully:", response);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
    setError(null)
    onCalculate(true)
    setLoading(false)
  }

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

