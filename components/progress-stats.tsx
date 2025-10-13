import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Flame, Award } from "lucide-react"

interface ProgressStatsProps {
  completedModules: number
  totalModules: number
  badgesEarned: number
  totalBadges: number
  currentLevel: number
  streakDays: number
}

export function ProgressStats({
  completedModules,
  totalModules,
  badgesEarned,
  totalBadges,
  currentLevel,
  streakDays,
}: ProgressStatsProps) {
  const stats = [
    {
      icon: Target,
      label: "Modules Completed",
      value: `${completedModules}/${totalModules}`,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      icon: Trophy,
      label: "Badges Earned",
      value: `${badgesEarned}/${totalBadges}`,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-950",
    },
    {
      icon: Award,
      label: "Current Level",
      value: `Level ${currentLevel}`,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950",
    },
    {
      icon: Flame,
      label: "Learning Streak",
      value: `${streakDays} days`,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
