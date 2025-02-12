"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { saveUser, getUser, updateUser } from "../utils/fileStorage"

interface User {
  id: string
  email: string
  name: string
  password?: string
  pitchDecks?: any[]
  bookmarkedInvestors?: any[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<User | void>
  signup: (email: string, password: string, name: string) => Promise<User | void>
  logout: () => void
  addPitchDeck: (pitchDeck: any) => void
  bookmarkInvestor: (investor: any) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = () => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      const user = userId ? getUser(userId) : null
      if (user) {
        setUser(user)
      }
    }
  }

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const user = getUser(email)
    if (user && user.password === password) {
      setUser(user)
      localStorage.setItem("userId", user.id)
      return user
    }
    throw new Error("Invalid email or password")
  }

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newUser = { id: email, email, name, password, pitchDecks: [], bookmarkedInvestors: [] }
    saveUser(newUser)
    setUser(newUser)
    localStorage.setItem("userId", newUser.id)
    return newUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("userId")
  }

  const addPitchDeck = (pitchDeck: any) => {
    if (user) {
      const updatedUser = updateUser(user.id, {
        pitchDecks: [...user.pitchDecks, pitchDeck],
      })
      if (updatedUser) {
        setUser(updatedUser)
      }
    }
  }

  const bookmarkInvestor = (investor: any) => {
    if (user) {
      const updatedUser = updateUser(user.id, {
        bookmarkedInvestors: [...user.bookmarkedInvestors, investor],
      })
      if (updatedUser) {
        setUser(updatedUser)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, addPitchDeck, bookmarkInvestor }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

