"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { mockUsers } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const AuthContext = createContext({
  user: null,
  login: (email, password) => {},
  register: (userData) => {},
  logout: () => {},
  openLoginModal: (message) => {},
  closeLoginModal: () => {},
  isLoginModalOpen: false,
  loginError: "",
  registerError: "",
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loginMessage, setLoginMessage] = useState("")
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("zafago_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse user data", error)
      }
    }
  }, [])

  const login = (email, password) => {
    setLoginError("")
    setIsLoading(true)

    // First check localStorage for registered users
    try {
      const storedUsers = localStorage.getItem("zafago_users")
      let users = []

      if (storedUsers) {
        users = JSON.parse(storedUsers)
      } else {
        // If no users in localStorage, use mock data
        users = [...mockUsers]
        localStorage.setItem("zafago_users", JSON.stringify(users))
      }

      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (foundUser) {
        // Create a copy without the password
        const userWithoutPassword = { ...foundUser }
        delete userWithoutPassword.password

        setUser(userWithoutPassword)
        localStorage.setItem("zafago_user", JSON.stringify(userWithoutPassword))
        setIsLoginModalOpen(false)
        toast({
          title: "Login successful",
          description: "Welcome back to Zafago!",
        })
        return true
      } else {
        setLoginError("Invalid email or password")
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      setLoginError("An error occurred during login")
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = (userData) => {
    setRegisterError("")
    setIsLoading(true)

    try {
      const storedUsers = localStorage.getItem("zafago_users")
      let users = []

      if (storedUsers) {
        users = JSON.parse(storedUsers)
      } else {
        users = [...mockUsers]
      }

      // Check if email already exists
      const existingUser = users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase())

      if (existingUser) {
        setRegisterError("Email already in use")
        toast({
          title: "Registration failed",
          description: "Email already in use",
          variant: "destructive",
        })
        return false
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
        avatar: `/placeholder.svg?height=100&width=100&text=${userData.firstName[0]}${userData.lastName[0]}`,
        wishlist: [],
        cart: [],
        orders: [],
        settings: {
          notifications: true,
          newsletter: userData.newsletter || false,
          darkMode: false,
        },
      }

      // Add to users array
      users.push(newUser)
      localStorage.setItem("zafago_users", JSON.stringify(users))

      // Log in the new user
      const userWithoutPassword = { ...newUser }
      delete userWithoutPassword.password

      setUser(userWithoutPassword)
      localStorage.setItem("zafago_user", JSON.stringify(userWithoutPassword))
      toast({
        title: "Registration successful",
        description: "Welcome to Zafago!",
      })

      return true
    } catch (error) {
      console.error("Registration error:", error)
      setRegisterError("An error occurred during registration")
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("zafago_user")
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const openLoginModal = (message = "") => {
    setLoginMessage(message)
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
    setLoginMessage("")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        openLoginModal,
        closeLoginModal,
        isLoginModalOpen,
        loginError,
        registerError,
      }}
    >
      {children}
      <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>{loginMessage || "Please sign in to continue."}</DialogDescription>
          </DialogHeader>
          {/* Login form would go here, but we'll redirect to the login page instead */}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={closeLoginModal}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                closeLoginModal()
                router.push("/login")
              }}
            >
              Sign In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

