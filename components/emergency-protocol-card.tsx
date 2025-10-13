import type { EmergencyProtocol } from "@/lib/emergency-protocols"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"

interface EmergencyProtocolCardProps {
  protocol: EmergencyProtocol
}

export function EmergencyProtocolCard({ protocol }: EmergencyProtocolCardProps) {
  const categoryConfig = {
    Critical: {
      icon: AlertCircle,
      className: "border-red-500 bg-red-50 dark:bg-red-950/20",
      badgeClassName: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
    },
    Urgent: {
      icon: AlertTriangle,
      className: "border-orange-500 bg-orange-50 dark:bg-orange-950/20",
      badgeClassName: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
    },
    Important: {
      icon: Info,
      className: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
      badgeClassName: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
    },
  }

  const config = categoryConfig[protocol.category]
  const Icon = config.icon

  return (
    <Link href={`/emergency/${protocol.id}`}>
      <Card className={`transition-all hover:shadow-lg cursor-pointer border-l-4 ${config.className}`}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <Badge className={config.badgeClassName}>{protocol.category}</Badge>
                <Badge variant="outline">{protocol.injury_level}</Badge>
              </div>
              <CardTitle className="text-xl">{protocol.title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            <strong>Quick Actions:</strong>
            <ul className="mt-2 space-y-1">
              {protocol.quick_actions.slice(0, 3).map((action, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
