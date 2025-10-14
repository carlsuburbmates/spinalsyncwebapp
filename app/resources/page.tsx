import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { resources } from "@/lib/data"
import { FileText, ExternalLink, AlertTriangle } from "lucide-react"

export default function ResourcesPage() {
  const emergencyResources = resources.filter(
    (r) => r.type.toLowerCase().includes("emergency") || r.type.toLowerCase().includes("protocol"),
  )
  const generalResources = resources.filter(
    (r) => !r.type.toLowerCase().includes("emergency") && !r.type.toLowerCase().includes("protocol"),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Resources</h2>
        <p className="text-muted-foreground">Access learning materials and reference documents</p>
      </div>

      {/* Emergency Protocols Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h3 className="text-lg font-medium">Emergency Protocols</h3>
        </div>
        <div className="grid gap-3">
          {emergencyResources.length > 0 ? (
            emergencyResources.map((resource, index) => (
              <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer">
                <Card className="transition-colors hover:bg-accent cursor-pointer border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                    <CardDescription>Critical emergency response procedure</CardDescription>
                    <div className="pt-2">
                      <Badge variant="destructive" className="text-xs">
                        Emergency
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              </a>
            ))
          ) : (
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-base">Autonomic Dysreflexia Protocol</CardTitle>
                <CardDescription>Critical emergency response procedure for AD episodes</CardDescription>
                <div className="pt-2">
                  <Badge variant="destructive" className="text-xs">
                    Emergency
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>

      {/* General Resources Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Learning Materials</h3>
        </div>
        <div className="grid gap-3">
          {generalResources.length > 0 ? (
            generalResources.map((resource, index) => (
              <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer">
                <Card className="transition-colors hover:bg-accent cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </CardHeader>
                </Card>
              </a>
            ))
          ) : (
            <Card>
              <CardHeader>
                <CardDescription>No general resources available yet.</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>

      {/* Additional Resource Categories */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Resource Categories</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Clinical Guidelines</CardTitle>
              <CardDescription>Evidence-based practice guidelines and protocols</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Patient Education</CardTitle>
              <CardDescription>Materials for patient and family education</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Research Articles</CardTitle>
              <CardDescription>Latest research in SCI care and management</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Video Tutorials</CardTitle>
              <CardDescription>Demonstration videos for procedures and techniques</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
