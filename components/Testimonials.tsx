"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Lee",
    role: "Restaurant Owner",
    content:
      "CoolSave has been a game-changer for our restaurant. We've seen a significant drop in our energy bills, and the air quality has improved noticeably. The smart optimization system is truly impressive!",
    avatar: "/avatar1.png",
  },
  {
    name: "John Smith",
    role: "Hotel Manager",
    content:
      "The upgrade process was smooth and professional. Our guests have commented on the improved comfort, and we're saving money every month. The 24/7 support gives us peace of mind.",
    avatar: "/avatar2.png",
  },
  {
    name: "Emily Wong",
    role: "Cafe Owner",
    content:
      "I was skeptical at first, but the results speak for themselves. Lower bills, better cooling, and excellent customer service. The grant application process was seamless thanks to CoolSave. Highly recommended!",
    avatar: "/avatar3.png",
  },
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="w-full py-20 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-secondary/50 rounded-lg p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                  />
                  <AvatarFallback>
                    {testimonials[currentTestimonial].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground italic">"{testimonials[currentTestimonial].content}"</p>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  )
}

