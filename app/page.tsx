import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { modulesData } from "@/lib/modules-data"
import { progress } from "@/lib/data"
import { ArrowRight, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  const orderedModules = [...modulesData].sort((a, b) => a.order - b.order)
  const totalModules = orderedModules.length
  const completedModules = progress.completed
  const pendingQuizzes = progress.pending_quizzes
  const recentModules = orderedModules.slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back to your learning journey</p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/modules">
          <Card className="transition-colors hover:bg-accent cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Resume Learning</CardTitle>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>Continue with your next module</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/resources">
          <Card className="transition-colors hover:bg-accent cursor-pointer border-destructive/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Emergency Protocols</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <CardDescription>Quick access to critical procedures</CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* KPI Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Modules</CardDescription>
            <CardTitle className="text-4xl">{totalModules}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-4xl">{completedModules}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Quizzes</CardDescription>
            <CardTitle className="text-4xl">{pendingQuizzes}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Modules Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Recent Modules</h3>
          <Link href="/modules" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-3">
          {recentModules.map((module) => (
            <Link key={module.module_id} href={`/modules/${module.module_id}`}>
              <Card className="transition-colors hover:bg-accent cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <CardDescription className="text-xs uppercase">{module.category}</CardDescription>
                      <CardTitle className="text-base">{module.title}</CardTitle>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                  <CardDescription className="text-sm">{module.summary}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
