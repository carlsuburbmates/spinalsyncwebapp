import React, { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PainEntry {
  id: string
  date: string
  time: string
  intensity: number
  type: string
  location: string
  triggers: string[]
  treatments: string[]
  effectiveness: number
  notes: string
}

const painTypes = ["Neuropathic", "Musculoskeletal", "Visceral", "Other"]
const bodyLocations = ["Shoulders", "Back", "Abdomen", "Lower limbs", "Upper limbs", "Pelvis", "Other"]
const triggerOptions = ["Positioning", "Weather", "Stress", "Sleep", "Infection", "Bladder/Bowel", "Unknown"]
const treatmentOptions = ["Medication", "Stretching", "Heat/Ice", "TENS", "Relaxation", "Rest", "Other"]

function createEmptyEntry(): PainEntry {
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toISOString().slice(11, 16),
    intensity: 5,
    type: "Neuropathic",
    location: "Lower limbs",
    triggers: [],
    treatments: [],
    effectiveness: 5,
    notes: "",
  }
}

export function PainTracker() {
  const [painEntries, setPainEntries] = useState<PainEntry[]>([])
  const [formEntry, setFormEntry] = useState<PainEntry>(createEmptyEntry())
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState("log")

  const averageIntensity = useMemo(() => {
    if (painEntries.length === 0) return 0
    const total = painEntries.reduce((acc, entry) => acc + entry.intensity, 0)
    return Math.round(total / painEntries.length)
  }, [painEntries])

  const mostCommonTriggers = useMemo(() => {
    const triggerCounts: Record<string, number> = {}
    painEntries.forEach((entry) => {
      entry.triggers.forEach((trigger) => {
        triggerCounts[trigger] = (triggerCounts[trigger] ?? 0) + 1
      })
    })
    return Object.entries(triggerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([trigger, count]) => ({ trigger, count }))
  }, [painEntries])

  const mostEffectiveTreatments = useMemo(() => {
    const treatmentScores: Record<string, number[]> = {}
    painEntries.forEach((entry) => {
      entry.treatments.forEach((treatment) => {
        treatmentScores[treatment] = [...(treatmentScores[treatment] ?? []), entry.effectiveness]
      })
    })
    return Object.entries(treatmentScores)
      .map(([treatment, scores]) => ({
        treatment,
        averageEffectiveness: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      }))
      .sort((a, b) => b.averageEffectiveness - a.averageEffectiveness)
      .slice(0, 3)
  }, [painEntries])

  function toggleSelection(list: string[], value: string) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
  }

  function handleSaveEntry() {
    setPainEntries((prev) => [formEntry, ...prev])
    setFormEntry(createEmptyEntry())
    setShowForm(false)
    setActiveTab("log")
  }

  function handleDeleteEntry(id: string) {
    setPainEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pain Tracking Dashboard</CardTitle>
        <CardDescription>
          Record pain episodes, track triggers, and review which interventions provide the most relief.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="log">Pain Log</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="log" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {painEntries.length === 0 ? "No entries recorded yet." : `${painEntries.length} entries recorded.`}
              </p>
              <Button variant="outline" onClick={() => setShowForm((prev) => !prev)}>
                {showForm ? "Cancel" : "Add Entry"}
              </Button>
            </div>

            {showForm && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="text-lg">New Pain Entry</CardTitle>
                  <CardDescription>Describe the pain episode and interventions used.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <Input
                        type="date"
                        value={formEntry.date}
                        onChange={(event) => setFormEntry((prev) => ({ ...prev, date: event.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time</label>
                      <Input
                        type="time"
                        value={formEntry.time}
                        onChange={(event) => setFormEntry((prev) => ({ ...prev, time: event.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pain Intensity (0-10)</label>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        value={formEntry.intensity}
                        onChange={(event) =>
                          setFormEntry((prev) => ({ ...prev, intensity: Number(event.target.value) || 0 }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pain Type</label>
                      <select
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                        value={formEntry.type}
                        onChange={(event) => setFormEntry((prev) => ({ ...prev, type: event.target.value }))}
                      >
                        {painTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <select
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                        value={formEntry.location}
                        onChange={(event) => setFormEntry((prev) => ({ ...prev, location: event.target.value }))}
                      >
                        {bodyLocations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Treatment Effectiveness (0-10)</label>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        value={formEntry.effectiveness}
                        onChange={(event) =>
                          setFormEntry((prev) => ({ ...prev, effectiveness: Number(event.target.value) || 0 }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Triggers</label>
                    <div className="flex flex-wrap gap-2">
                      {triggerOptions.map((trigger) => {
                        const selected = formEntry.triggers.includes(trigger)
                        return (
                          <Badge
                            key={trigger}
                            variant={selected ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() =>
                              setFormEntry((prev) => ({ ...prev, triggers: toggleSelection(prev.triggers, trigger) }))
                            }
                          >
                            {trigger}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Treatments Used</label>
                    <div className="flex flex-wrap gap-2">
                      {treatmentOptions.map((treatment) => {
                        const selected = formEntry.treatments.includes(treatment)
                        return (
                          <Badge
                            key={treatment}
                            variant={selected ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() =>
                              setFormEntry((prev) => ({
                                ...prev,
                                treatments: toggleSelection(prev.treatments, treatment),
                              }))
                            }
                          >
                            {treatment}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional Notes</label>
                    <Textarea
                      rows={4}
                      value={formEntry.notes}
                      onChange={(event) => setFormEntry((prev) => ({ ...prev, notes: event.target.value }))}
                      placeholder="Describe what helped, associated symptoms, or follow-up actions..."
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button onClick={handleSaveEntry}>Save Entry</Button>
                    <Button variant="ghost" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <ScrollArea className="max-h-[400px] rounded-md border">
              <div className="divide-y">
                {painEntries.length === 0 ? (
                  <div className="p-6 text-sm text-muted-foreground">
                    No entries logged. Use “Add Entry” to record a pain episode.
                  </div>
                ) : (
                  painEntries.map((entry) => (
                    <div key={entry.id} className="p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">
                            {entry.date} • {entry.time}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {entry.type} pain — {entry.location}
                          </p>
                        </div>
                        <Badge variant="secondary">Intensity: {entry.intensity}/10</Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Triggers:</span> {entry.triggers.join(", ") || "None recorded"}
                        </p>
                        <p>
                          <span className="font-medium">Treatments:</span> {entry.treatments.join(", ") || "None recorded"}
                        </p>
                        <p>
                          <span className="font-medium">Effectiveness:</span> {entry.effectiveness}/10
                        </p>
                        {entry.notes && (
                          <p>
                            <span className="font-medium">Notes:</span> {entry.notes}
                          </p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteEntry(entry.id)}>
                        Remove entry
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-muted">
                <CardHeader>
                  <CardTitle className="text-base">Average Pain Intensity</CardTitle>
                  <CardDescription>Across all recorded entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{averageIntensity}/10</p>
                </CardContent>
              </Card>

              <Card className="border-muted">
                <CardHeader>
                  <CardTitle className="text-base">Top Triggers</CardTitle>
                  <CardDescription>Most frequently reported triggers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mostCommonTriggers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No trigger data yet.</p>
                  ) : (
                    mostCommonTriggers.map(({ trigger, count }) => (
                      <div key={trigger} className="flex items-center justify-between text-sm">
                        <span>{trigger}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="border-muted">
                <CardHeader>
                  <CardTitle className="text-base">Effective Treatments</CardTitle>
                  <CardDescription>Average perceived effectiveness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mostEffectiveTreatments.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No treatment data yet.</p>
                  ) : (
                    mostEffectiveTreatments.map(({ treatment, averageEffectiveness }) => (
                      <div key={treatment} className="flex items-center justify-between text-sm">
                        <span>{treatment}</span>
                        <Badge variant="outline">{averageEffectiveness}/10</Badge>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            <Alert>
              <AlertDescription>
                These insights summarise patterns from the recorded entries. Review them with clinicians to adjust pain management strategies.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
