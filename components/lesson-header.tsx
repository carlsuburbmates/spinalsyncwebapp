import type { SubModule } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, AlertCircle } from "lucide-react"

interface LessonHeaderProps {
  subModule: SubModule
}

export function LessonHeader({ subModule }: LessonHeaderProps) {
  const priorityColors = {
    Critical: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
    Important: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
  }

  const difficultyColors = {
    Novice: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
    Competent: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    Advanced: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge className={priorityColors[subModule.metadata.priority]}>
          <AlertCircle className="w-3 h-3 mr-1" />
          {subModule.metadata.priority}
        </Badge>
        <Badge className={difficultyColors[subModule.metadata.difficulty_level]}>
          <Target className="w-3 h-3 mr-1" />
          {subModule.metadata.difficulty_level}
        </Badge>
        <Badge variant="outline">
          <Clock className="w-3 h-3 mr-1" />
          {subModule.metadata.duration} min
        </Badge>
        <Badge variant="outline">{subModule.metadata.injury_level}</Badge>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{subModule.title}</h1>
        <p className="text-lg text-muted-foreground">{subModule.description}</p>
      </div>

      {subModule.learning_objectives.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-foreground mb-2">Learning Objectives</h2>
          <ul className="space-y-1">
            {subModule.learning_objectives.map((objective, index) => (
              <li key={index} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
