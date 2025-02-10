"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UpgradeForm } from "./UpgradeForm"
import LoginModal from "./LoginModal"

const logos = {
  light: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-vlmWrF6UhVDukmFFCKhCRfc1YMPhpI.png",
  dark: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Kh8KxiFHFe5Vgyr3xeTOSLLNc4KgU8.png",
}

const navItems = [
  { name: "Solution", href: "#solution" },
  { name: "Benefits", href: "#about-ambit" },
  { name: "Pricing", href: "#pricing" },
  { name: "How it Works", href: "#how-it-works" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const href = e.currentTarget.href
    const targetId = href.replace(/.*#/, "")
    const elem = document.getElementById(targetId)
    if (elem) {
      const yOffset = -80 // Adjust this value based on your navbar height
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link href="/" className="relative h-20 w-64 mr-8">
              <Image
                src={isScrolled || isMobileMenuOpen ? logos.dark : logos.light}
                alt="Ambit Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
                    }`}
                  onClick={handleScroll}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant={isScrolled ? "outline" : "ghost"}
              className={`text-lg ${isScrolled ? "text-gray-700" : "text-white hover:bg-white/10"}`}
              onClick={() => setIsLoginModalOpen(true)}
            >
              Sign in
            </Button>
            <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
              <DialogTrigger asChild>
                <Button className={`text-lg ${isScrolled ? "bg-primary text-white" : "bg-white text-gray-900"}`}>
                  Start Saving Today
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Begin Your Savings Journey</DialogTitle>
                  <DialogDescription>
                    Get a personalized energy savings plan for your business. We'll respond within 1 business day.
                  </DialogDescription>
                </DialogHeader>
                <UpgradeForm />
              </DialogContent>
            </Dialog>
          </div>
          <button
            className="flex lg:hidden items-center justify-center w-10 h-10 p-2 z-50 absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-8 w-8 text-gray-900" />
            ) : (
              <Menu className={`h-8 w-8 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl lg:hidden overflow-y-auto z-50"
            >
              <div className="px-6 py-8 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <Image
                    src={logos.dark || "/placeholder.svg"}
                    alt="Ambit Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-lg text-gray-700 hover:text-gray-900 font-medium py-2"
                    onClick={(e) => {
                      handleScroll(e)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-4 pt-6 border-t border-gray-200">
                  <Button variant="outline" className="w-full text-base">
                    Sign in
                  </Button>
                  <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full text-base">Start Saving Today</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Begin Your Savings Journey</DialogTitle>
                        <DialogDescription>
                          Get a personalized energy savings plan for your business. We'll respond within 1 business day.
                        </DialogDescription>
                      </DialogHeader>
                      <UpgradeForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  )
}

