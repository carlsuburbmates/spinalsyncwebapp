import type { Badge as BadgeType } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

interface BadgeCardProps {
  badge: BadgeType
  isEarned?: boolean
  progress?: number
}

export function BadgeCard({ badge, isEarned = false, progress }: BadgeCardProps) {
  const categoryColors = {
    Foundation: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    Advanced: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    Master: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    Special: "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300",
  }

  return (
    <Card className={`transition-all ${isEarned ? "border-primary shadow-md" : "opacity-60"}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div
            className={`text-4xl w-16 h-16 rounded-full flex items-center justify-center ${
              isEarned ? "bg-primary/10" : "bg-muted"
            }`}
          >
            {isEarned ? badge.icon : <Lock className="w-8 h-8 text-muted-foreground" />}
          </div>
          <Badge className={categoryColors[badge.category]}>{badge.category}</Badge>
        </div>
        <CardTitle className="text-lg mt-4">{badge.name}</CardTitle>
        <CardDescription>{badge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">{badge.criteria}</p>
          {progress !== undefined && !isEarned && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
