"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface ProfileData {
  name: string
  phone?: string
  location?: string
  bio?: string
}

export function useProfileUpdate() {
  const router = useRouter()
  const { data: session, update: updateSession } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const updateProfile = async (data: ProfileData) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to update profile")
      }

      toast({
        title: "Profile Updated",
        description: `Your profile has been updated successfully.`,
      })

      // Update the session with the new user data
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          name: result.user.name,
          email: result.user.email,
        }
      })
      
      // Small delay to ensure session is updated
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Refresh the page to show updated data everywhere
      router.refresh()

      return { success: true, data: result.user }
    } catch (error) {
      console.error("Profile update error:", error)
      
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
      })

      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateProfile,
    isLoading,
  }
}
