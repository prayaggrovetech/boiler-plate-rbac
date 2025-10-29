"use client"

import { useEffect, useCallback } from "react"

interface UseKeyboardNavigationProps {
  onEscape?: () => void
  enabled?: boolean
}

/**
 * Custom hook for handling keyboard navigation in the sidebar
 */
export function useKeyboardNavigation({
  onEscape,
  enabled = true
}: UseKeyboardNavigationProps = {}) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return

    // Handle Escape key
    if (event.key === "Escape" && onEscape) {
      event.preventDefault()
      onEscape()
    }
  }, [enabled, onEscape])

  useEffect(() => {
    if (!enabled) return

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [enabled, handleKeyDown])
}
