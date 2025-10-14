"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { modulesData, getAllSubModules } from "@/lib/modules-data"
import { badges } from "@/lib/badges-data"
import { ProgressStats } from "@/components/progress-stats"
import { BadgeCard } from "@/components/badge-card"
import { CheckCircle2, Circle, Clock, Trophy } from "lucide-react"
import Link from "next/link"

export default function ProgressPage() {
  const [userProgress] = useState({
    completed_modules: ["1-b", "1-c"],
    assessment_scores: { "1-b": 100, "1-c": 85 } as Record<string, number>,
    badges_earned: ["bladder-basics-master", "first-responder"],
    current_level: 2,
    streak_days: 5,
  })

  const allSubModules = getAllSubModules()
  const totalModules = allSubModules.length
  const completedModules = userProgress.completed_modules.length
  const progressPercentage = (completedModules / totalModules) * 100

  const earnedBadges = badges.filter((b) => userProgress.badges_earned.includes(b.id))
  const lockedBadges = badges.filter((b) => !userProgress.badges_earned.includes(b.id))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Learning Progress</h2>
        <p className="text-muted-foreground">Track your journey through the SpinalSync curriculum</p>
      </div>

      <ProgressStats
        completedModules={completedModules}
        totalModules={totalModules}
        badgesEarned={earnedBadges.length}
        totalBadges={badges.length}
        currentLevel={userProgress.current_level}
        streakDays={userProgress.streak_days}
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="badges">
            <Trophy className="w-4 h-4 mr-2" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>
                {completedModules} of {totalModules} micro-lessons completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{progressPercentage.toFixed(0)}% Complete</span>
                <span className="font-medium">{totalModules - completedModules} remaining</span>
              </div>
            </CardContent>
          </Card>

          {/* Category Progress */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Progress by Module</h3>
            <div className="grid gap-3">
              {modulesData.map((module) => {
                const moduleSubModules = module.sub_modules
                const completedInModule = moduleSubModules.filter((sm) =>
                  userProgress.completed_modules.includes(sm.id),
                ).length
                const percentage = (completedInModule / moduleSubModules.length) * 100

                return (
                  <Card key={module.module_id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{module.title}</CardTitle>
                          <CardDescription>
                            {completedInModule} of {moduleSubModules.length} lessons
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{percentage.toFixed(0)}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={percentage} className="h-2" />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Recent Achievements */}
          {earnedBadges.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Recent Achievements</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {earnedBadges.slice(0, 2).map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} isEarned={true} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          {/* Earned Badges */}
          {earnedBadges.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Earned Badges ({earnedBadges.length})</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {earnedBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} isEarned={true} />
                ))}
              </div>
            </div>
          )}

          {/* Locked Badges */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Available Badges ({lockedBadges.length})</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lockedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} isEarned={false} progress={0} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">All Micro-Lessons</h3>
            <div className="grid gap-2">
              {allSubModules.map((subModule) => {
                const isCompleted = userProgress.completed_modules.includes(subModule.id)
                const score = userProgress.assessment_scores[subModule.id]

                return (
                  <Link key={subModule.id} href={`/lesson/${subModule.id}`}>
                    <Card className="transition-colors hover:bg-accent cursor-pointer">
                      <CardHeader className="py-3">
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium">{subModule.title}</span>
                              <Badge variant="outline" className="text-xs">
                                {subModule.metadata.injury_level}
                              </Badge>
                              {score && (
                                <Badge variant="secondary" className="text-xs">
                                  {score}%
                                </Badge>
                              )}
                            </div>
                          </div>
                          {!isCompleted && <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
