import React, { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface BodyArea {
  id: string
  name: string
  description: string
  riskLevel: "low" | "medium" | "high"
}

const bodyAreas: BodyArea[] = [
  { id: "occiput", name: "Occiput", description: "Back of the head", riskLevel: "medium" },
  { id: "scapula", name: "Scapula", description: "Shoulder blades", riskLevel: "medium" },
  { id: "sacrum", name: "Sacrum", description: "Tail bone area", riskLevel: "high" },
  { id: "ischial", name: "Ischial Tuberosities", description: "Seat bones", riskLevel: "high" },
  { id: "heels", name: "Heels", description: "Backs of the heels", riskLevel: "high" },
  { id: "ankles", name: "Ankles", description: "Bony ankles", riskLevel: "medium" },
  { id: "ears", name: "Ears", description: "Ear cartilage", riskLevel: "low" },
  { id: "other", name: "Other", description: "Any additional area of concern", riskLevel: "medium" },
]

interface InspectionStatus {
  status: "normal" | "concern" | "problem"
  notes?: string
}

type InspectionRecord = Record<string, InspectionStatus>

function createDefaultInspection(): InspectionRecord {
  return bodyAreas.reduce<InspectionRecord>((record, area) => {
    record[area.id] = { status: "normal", notes: "" }
    return record
  }, {})
}

interface InspectionHistoryEntry {
  id: string
  timestamp: string
  findings: InspectionRecord
}

export function SkinInspectionChecklist() {
  const [inspection, setInspection] = useState<InspectionRecord>(createDefaultInspection())
  const [notes, setNotes] = useState("")
  const [history, setHistory] = useState<InspectionHistoryEntry[]>([])
  const [showResults, setShowResults] = useState(false)

  const areasWithIssues = useMemo(() => {
    return Object.entries(inspection)
      .filter(([, status]) => status.status !== "normal")
      .map(([areaId, status]) => ({ area: bodyAreas.find((area) => area.id === areaId), status }))
  }, [inspection])

  function updateAreaStatus(areaId: string, status: InspectionStatus["status"]) {
    setInspection((prev) => ({
      ...prev,
      [areaId]: {
        ...prev[areaId],
        status,
      },
    }))
  }

  function updateAreaNotes(areaId: string, note: string) {
    setInspection((prev) => ({
      ...prev,
      [areaId]: {
        ...prev[areaId],
        notes: note,
      },
    }))
  }

  function completeInspection() {
    const entry: InspectionHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      findings: inspection,
    }
    setHistory((prev) => [entry, ...prev])
    setShowResults(true)
  }

  function resetInspection() {
    setInspection(createDefaultInspection())
    setNotes("")
    setShowResults(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Skin Inspection Checklist</CardTitle>
        <CardDescription>
          Capture daily skin checks to detect early signs of pressure injury and monitor high-risk areas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showResults ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              {bodyAreas.map((area) => {
                const status = inspection[area.id]
                return (
                  <Card key={area.id} className="border-muted">
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{area.name}</CardTitle>
                        <Badge variant={area.riskLevel === "high" ? "destructive" : area.riskLevel === "medium" ? "secondary" : "outline"}>
                          {area.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                      <CardDescription>{area.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        {(["normal", "concern", "problem"] as InspectionStatus["status"][]).map((option) => (
                          <Button
                            key={option}
                            variant={status.status === option ? "default" : "outline"}
                            onClick={() => updateAreaStatus(area.id, option)}
                          >
                            {option === "normal" && "Normal"}
                            {option === "concern" && "Monitor"}
                            {option === "problem" && "Urgent"}
                          </Button>
                        ))}
                      </div>
                      {status.status !== "normal" && (
                        <Textarea
                          value={status.notes ?? ""}
                          onChange={(event) => updateAreaNotes(area.id, event.target.value)}
                          rows={2}
                          placeholder="Describe redness, moisture, or other findings"
                        />
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border px-4 py-3">
                <p className="text-sm font-medium text-muted-foreground">Inspection Notes</p>
                <Textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={6}
                  placeholder="Record equipment adjustments, skin care products used, or education provided."
                />
              </div>
              <Button onClick={completeInspection}>Complete Inspection</Button>
              <Button variant="ghost" onClick={resetInspection}>
                Reset
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Inspection recorded. Review any areas marked as “Monitor” or “Urgent” and escalate according to skin care protocols.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {areasWithIssues.length === 0 ? (
                <div className="rounded-lg border px-4 py-6 text-sm text-muted-foreground">
                  All areas recorded as normal during this inspection.
                </div>
              ) : (
                areasWithIssues.map(({ area, status }) => (
                  <Card key={area?.id} className="border-destructive">
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">{area?.name}</CardTitle>
                      <CardDescription>{area?.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="font-medium">Status: {status.status === "concern" ? "Monitor" : "Urgent"}</p>
                      {status.notes && <p className="text-muted-foreground">Notes: {status.notes}</p>}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Inspection History</h3>
              <ScrollArea className="max-h-[240px] rounded-lg border">
                <div className="divide-y">
                  {history.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground">No inspections recorded yet.</div>
                  ) : (
                    history.map((entry) => (
                      <div key={entry.id} className="p-4 text-sm">
                        <p className="font-medium">
                          {new Date(entry.timestamp).toLocaleDateString()} • {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        <p className="text-muted-foreground">
                          Concerns: {
                            Object.values(entry.findings).filter((finding) => finding.status !== "normal").length
                          }
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            <Button variant="ghost" onClick={resetInspection}>
              Start New Inspection
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
