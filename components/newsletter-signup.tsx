"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function NewsletterSignup() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our newsletter!",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/20 text-white mb-4">
        <Mail className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
      <p className="text-white/80 mb-6">Stay updated with the latest games, exclusive deals, and special offers.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sm:rounded-r-none bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
        <Button
          type="submit"
          className="sm:rounded-l-none bg-white text-brand-600 hover:bg-white/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Subscribing..."
          ) : (
            <>
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
      <p
        className="text-xs text-white/60 
 mt-4"
      >
        By subscribing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
