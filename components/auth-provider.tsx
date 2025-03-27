"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { mockUsers } from "@/lib/mock-data"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  openLoginModal: (message?: string) => void
  closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loginMessage, setLoginMessage] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock authentication - in a real app, this would use a proper auth system
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("zafago_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user", error)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (!email || !password) {
        throw new Error("Please enter both email and password")
      }

      // Find user in mock data
      const foundUser = mockUsers.find((u) => u.email === email)

      if (!foundUser) {
        throw new Error("User not found")
      }

      // In a real app, we would properly verify the password hash
      // For now, we'll just check if the password is correct for demo purposes
      if (password !== "password123") {
        throw new Error("Invalid credentials")
      }

      // Mock successful login
      const userToSave = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar,
      }

      setUser(userToSave)
      localStorage.setItem("zafago_user", JSON.stringify(userToSave))
      setIsLoginModalOpen(false)

      toast({
        title: "Login successful",
        description: "Welcome back to Zafago!",
      })
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (!name || !email || !password) {
        throw new Error("Please fill in all fields")
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      // Check if email is already in use
      const existingUser = mockUsers.find((u) => u.email === email)
      if (existingUser) {
        throw new Error("Email is already in use")
      }

      // Mock successful registration
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        avatar: `/placeholder.svg?height=100&width=100&text=${name[0].toUpperCase()}`,
      }

      setUser(newUser)
      localStorage.setItem("zafago_user", JSON.stringify(newUser))
      setIsLoginModalOpen(false)

      toast({
        title: "Registration successful",
        description: "Welcome to Zafago!",
      })
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("zafago_user")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const openLoginModal = (message?: string) => {
    setLoginMessage(message)
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
    setLoginMessage(undefined)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, openLoginModal, closeLoginModal }}>
      {children}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        message={loginMessage}
        onLogin={login}
        onRegister={register}
        isLoading={isLoading}
      />
    </AuthContext.Provider>
  )
}

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  message?: string
  onLogin: (email: string, password: string) => Promise<void>
  onRegister: (name: string, email: string, password: string) => Promise<void>
  isLoading: boolean
}

function LoginModal({ isOpen, onClose, message, onLogin, onRegister, isLoading }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email, password)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    onRegister(name, email, password)
  }

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("")
      setPassword("")
      setName("")
      setRememberMe(false)
      setShowPassword(false)
    }
  }, [isOpen])

  // For demo purposes, provide a quick login option
  const handleDemoLogin = () => {
    setEmail("john.doe@example.com")
    setPassword("password123")
    onLogin("john.doe@example.com", "password123")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication Required</DialogTitle>
          {message && <DialogDescription>{message}</DialogDescription>}
        </DialogHeader>

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <Label htmlFor="remember-me" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-xs">
                    Forgot password?
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline" disabled={isLoading}>
                  Google
                </Button>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Facebook
                </Button>
              </div>

              <Button
                type="button"
                variant="link"
                className="w-full text-xs"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                Use demo account (for testing)
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="register-password">Password</Label>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </div>
                <Input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline" disabled={isLoading}>
                  Google
                </Button>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Facebook
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-0">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

