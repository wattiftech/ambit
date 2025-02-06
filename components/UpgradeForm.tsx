import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import emailjs from "emailjs-com";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react";

export function UpgradeForm() {
  const [isLoading, setIsLoading] = useState(false)
  const initialFormData = {
    businessName: "",
    contactName: "",
    contactNumber: "",
    contactEmail: "",
    businessType: "",
    acUnits: "",
    monthlyEnergyBill: "",
  }
  const [formData, setFormData] = useState(initialFormData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setIsLoading(true);
    if (isNaN(Number.parseFloat(formData.monthlyEnergyBill))) {
      alert("Please enter a valid number for your monthly energy bill.");
      return;
    }

    try {
      const response = await emailjs.send(
        process.env.EmailJS_Service_ID as string, // Your EmailJS Service ID
        process.env.EmailJS_Template_ID as string, // Your EmailJS Template ID
        formData,
        process.env.EmailJS_Public_Key as string // Your EmailJS Public Key
      );

      console.log("Email sent successfully:", response);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }

    setIsLoading(false);
    setFormData(initialFormData)
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="contactName">Contact Name</Label>
        <Input id="contactName" name="contactName" value={formData.contactName} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="contactNumber">Contact Number</Label>
        <Input
          id="contactNumber"
          name="contactNumber"
          type="tel"
          value={formData.contactNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="businessType">Type of Business</Label>
        <Select name="businessType" onValueChange={(value) => handleSelectChange("businessType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="F&B">F&B</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">We currently only serve F&B and Retail businesses</p>
      </div>
      <div>
        <Label htmlFor="acUnits">Number of AC Units</Label>
        <Input
          id="acUnits"
          name="acUnits"
          type="number"
          value={formData.acUnits}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="monthlyEnergyBill">Your Monthly Energy Bill ($)</Label>
        <Input
          id="monthlyEnergyBill"
          name="monthlyEnergyBill"
          type="number"
          value={formData.monthlyEnergyBill}
          onChange={handleInputChange}
          required
          min="0"
          step="0.01"
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-3">
        Schedule a Free Consultation
        {isLoading && (<span>
          <Loader2 className="w-4 h-4 animate-spin" />
        </span>)}
      </Button>
    </form>
  )
}

