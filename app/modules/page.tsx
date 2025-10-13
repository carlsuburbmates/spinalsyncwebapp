import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { modulesData } from "@/lib/modules-data"
import { ArrowRight, AlertCircle } from "lucide-react"

export default function ModulesPage() {
  const sortedModules = [...modulesData].sort((a, b) => a.order - b.order)

  // Group modules by category
  const categories = Array.from(new Set(modulesData.map((m) => m.category)))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Learning Modules</h2>
        <p className="text-muted-foreground">Explore comprehensive SCI education modules</p>
      </div>

      {categories.map((category) => {
        const categoryModules = sortedModules.filter((m) => m.category === category)
        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {category}
              </Badge>
              <span className="text-sm text-muted-foreground">{categoryModules.length} modules</span>
            </div>
            <div className="grid gap-3">
              {categoryModules.map((module) => (
                <Link key={module.module_id} href={`/modules/${module.module_id}`}>
                  <Card className="transition-colors hover:bg-accent cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">Module {module.order}</span>
                            {module.priority === "Critical" && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Critical
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <CardDescription>{module.summary}</CardDescription>
                          <p className="text-xs text-muted-foreground mt-2">
                            {module.sub_modules.length} micro-lessons
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
