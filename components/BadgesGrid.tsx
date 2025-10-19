'use client'

import { useEffect, useState } from "react"
import type { Badge } from "@/lib/types"
import { BadgeCard } from "@/components/badge-card"

export default function BadgesGrid() {
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchBadges() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/badges", { signal: controller.signal })
        if (!res.ok) throw new Error("Failed to fetch badges")
        const data = (await res.json()) as Badge[]
        setBadges(data)
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Unable to load badges")
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchBadges()

    return () => {
      controller.abort()
    }
  }, [])

  if (loading) return <div>Loading badges...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {badges.map((badge) => (
        <BadgeCard key={badge.id} badge={badge} isEarned={false} />
      ))}
    </div>
  )
}
