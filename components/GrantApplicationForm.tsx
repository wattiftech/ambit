"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GrantApplicationFormProps {
  onSubmit: () => void
}

export function GrantApplicationForm({ onSubmit }: GrantApplicationFormProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    businessType: "",
    currentACUnits: "",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the form data to your backend
    onSubmit()
  }

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
        <Input
          id="contactEmail"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleInputChange}
          required
        />
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
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="currentACUnits">Number of Current AC Units</Label>
        <Input
          id="currentACUnits"
          name="currentACUnits"
          type="number"
          value={formData.currentACUnits}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Submit Application
      </Button>
    </form>
  )
}

