"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "../hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  businessType: z.enum(["F&B", "Retail"]),
  acUnits: z.number().min(1, {
    message: "Please enter the number of AC units.",
  }),
  monthlyEnergyBill: z.number().min(0, {
    message: "Please enter your monthly energy bill.",
  }),
  message: z.string().optional(),
})

export function StartSavingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      businessType: "F&B",
      acUnits: 1,
      monthlyEnergyBill: 0,
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        {
          from_name: values.name,
          from_email: values.email,
          business_name: values.businessName,
          business_type: values.businessType,
          ac_units: values.acUnits,
          monthly_energy_bill: values.monthlyEnergyBill,
          message: values.message,
        },
        "YOUR_USER_ID", // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log(result.text)
          toast({
            title: "Message Sent!",
            description: "We'll get back to you as soon as possible.",
          })
          form.reset()
        },
        (error) => {
          console.log(error.text)
          toast({
            title: "Error",
            description: "There was a problem sending your message. Please try again.",
            variant: "destructive",
          })
        },
      )
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Business Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="F&B">F&B</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acUnits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of AC Units</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monthlyEnergyBill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Energy Bill ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about your energy saving goals..." {...field} />
              </FormControl>
              <FormDescription>Any additional information you'd like to share.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Start Saving Today"}
        </Button>
      </form>
    </Form>
  )
}

