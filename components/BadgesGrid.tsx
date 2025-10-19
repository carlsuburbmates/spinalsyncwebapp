import { useEffect, useState } from "react"
import { BadgeCard } from "@/components/badge-card"

export default function BadgesGrid() {
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBadges() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/badges")
        if (!res.ok) throw new Error("Failed to fetch badges")
        const data = await res.json()
        setBadges(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBadges()
  }, [])

  if (loading) return <div>Loading badges...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {badges.map((badge: any) => (
        <BadgeCard key={badge.id} badge={badge} isEarned={false} />
      ))}
    </div>
  )
}
