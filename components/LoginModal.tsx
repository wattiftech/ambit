"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Zap, DollarSign, Leaf } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempted with:", { email, password })
    // Close the modal after login attempt
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden rounded-2xl">
        <div className="flex flex-col md:flex-row h-[600px]">
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-4xl font-bold mb-6 text-primary">Welcome Back</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                  Sign In
                </Button>
              </form>
              <p className="mt-6 text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Sign up
                </a>
              </p>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-90" />
            <div className="absolute inset-0 bg-grid-gray-900/[0.2]" />
            <div className="absolute inset-0 flex items-center justify-center text-white z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center px-8"
              >
                <h3 className="text-4xl font-bold mb-4">Upgrade Your AC</h3>
                <p className="text-xl mb-8">Save Energy, Save Money</p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-white/20 rounded-full p-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div className="bg-white/20 rounded-full p-4">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <div className="bg-white/20 rounded-full p-4">
                    <Leaf className="w-8 h-8" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

