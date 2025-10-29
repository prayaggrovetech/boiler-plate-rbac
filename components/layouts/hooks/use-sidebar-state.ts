"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "sidebar-collapsed"

interface UseSidebarStateReturn {
    collapsed: boolean
    setCollapsed: (value: boolean) => void
    toggleCollapsed: () => void
}

/**
 * Custom hook for managing sidebar collapse state with localStorage persistence
 */
export function useSidebarState(defaultCollapsed = false): UseSidebarStateReturn {
    const [collapsed, setCollapsedState] = useState<boolean>(defaultCollapsed)
    const [mounted, setMounted] = useState(false)

    // Load state from localStorage on mount
    useEffect(() => {
        setMounted(true)

        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored !== null) {
                setCollapsedState(stored === "true")
            }
        } catch (error) {
            console.warn("Failed to load sidebar state from localStorage:", error)
            // Fallback to default state
        }
    }, [])

    // Persist state to localStorage
    const setCollapsed = useCallback((value: boolean) => {
        setCollapsedState(value)

        try {
            localStorage.setItem(STORAGE_KEY, String(value))
        } catch (error) {
            console.warn("Failed to save sidebar state to localStorage:", error)
        }
    }, [])

    // Toggle function - use functional update to avoid stale closure
    const toggleCollapsed = useCallback(() => {
        setCollapsedState(prev => {
            const newValue = !prev
            try {
                localStorage.setItem(STORAGE_KEY, String(newValue))
            } catch (error) {
                console.warn("Failed to save sidebar state to localStorage:", error)
            }
            return newValue
        })
    }, [])

    // Always return the same structure, but use default until mounted to avoid hydration mismatch
    return {
        collapsed: mounted ? collapsed : defaultCollapsed,
        setCollapsed,
        toggleCollapsed
    }
}
