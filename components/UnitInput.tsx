"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SquareFootageInputProps {
  onSquareFootageChange: (squareFootage: number) => void
}

export default function SquareFootageInput({ onSquareFootageChange }: SquareFootageInputProps) {
  const [squareFootage, setSquareFootage] = useState<string>("1000")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numSquareFootage = Number.parseInt(squareFootage, 10)
    if (!isNaN(numSquareFootage) && numSquareFootage > 0) {
      onSquareFootageChange(numSquareFootage)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="flex items-center space-x-2">
        <Label htmlFor="squareFootage" className="whitespace-nowrap">
          Size of Establishment:
        </Label>
        <Input
          type="number"
          id="squareFootage"
          value={squareFootage}
          onChange={(e) => setSquareFootage(e.target.value)}
          min="100"
          className="w-32"
        />
        <span className="whitespace-nowrap">square feet</span>
        <Button type="submit">Update Comparison</Button>
      </div>
    </form>
  )
}

