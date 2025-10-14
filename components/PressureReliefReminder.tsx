import React, { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface PressureReliefSettings {
  interval: number // minutes
  reminderType: "visual" | "audio" | "both"
  enabled: boolean
}

interface ReliefLogEntry {
  id: string
  timestamp: string
  reliefType: "manual" | "tilt" | "lift" | "other"
  notes?: string
}

export function PressureReliefReminder() {
  const [settings, setSettings] = useState<PressureReliefSettings>({
    interval: 30,
    reminderType: "both",
    enabled: false,
  })
  const [timeRemaining, setTimeRemaining] = useState<number>(settings.interval * 60)
  const [showReminder, setShowReminder] = useState<boolean>(false)
  const [lastReliefTime, setLastReliefTime] = useState<Date | null>(null)
  const [reliefLog, setReliefLog] = useState<ReliefLogEntry[]>([])
  const [selectedReliefType, setSelectedReliefType] = useState<ReliefLogEntry["reliefType"]>("lift")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    setTimeRemaining(settings.interval * 60)
  }, [settings.interval])

  useEffect(() => {
    if (!settings.enabled) {
      setShowReminder(false)
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setShowReminder(true)
          if (settings.reminderType !== "visual") {
            void navigator.vibrate?.(200)
          }
          return settings.interval * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [settings.enabled, settings.interval, settings.reminderType])

  const formattedTimeRemaining = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }, [timeRemaining])

  function recordRelief(reliefType: ReliefLogEntry["reliefType"], note?: string) {
    const timestamp = new Date()
    setReliefLog((prev) => [
      {
        id: crypto.randomUUID(),
        timestamp: timestamp.toISOString(),
        reliefType,
        notes: note,
      },
      ...prev,
    ])
    setLastReliefTime(timestamp)
    setShowReminder(false)
    setTimeRemaining(settings.interval * 60)
    setNotes("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pressure Relief Reminder</CardTitle>
        <CardDescription>
          Helps schedule regular pressure reliefs to protect skin integrity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Reminder Settings</h3>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <span className="text-sm">Enable reminders</span>
              <Switch checked={settings.enabled} onCheckedChange={(value) => setSettings((prev) => ({ ...prev, enabled: value }))} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Interval (minutes)</label>
              <Input
                type="number"
                min={10}
                max={120}
                value={settings.interval}
                onChange={(event) =>
                  setSettings((prev) => ({ ...prev, interval: Math.max(10, Number(event.target.value) || prev.interval) }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reminder Type</label>
              <select
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                value={settings.reminderType}
                onChange={(event) =>
                  setSettings((prev) => ({ ...prev, reminderType: event.target.value as PressureReliefSettings["reminderType"] }))
                }
              >
                <option value="visual">Visual only</option>
                <option value="audio">Haptic / audio</option>
                <option value="both">Visual + haptic</option>
              </select>
            </div>

            <div className="rounded-lg border px-4 py-3">
              <p className="text-sm font-medium text-muted-foreground">Time until next relief</p>
              <p className="text-3xl font-semibold">{formattedTimeRemaining}</p>
              {lastReliefTime && (
                <p className="text-xs text-muted-foreground">
                  Last relief: {new Date(lastReliefTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Log Relief</h3>
            <div className="grid grid-cols-2 gap-2">
              {(["lift", "tilt", "manual", "other"] as ReliefLogEntry["reliefType"][]).map((type) => (
                <Button key={type} variant={selectedReliefType === type ? "default" : "outline"} onClick={() => setSelectedReliefType(type)}>
                  {type === "lift" && "Full Lift"}
                  {type === "tilt" && "Tilt"}
                  {type === "manual" && "Manual Relief"}
                  {type === "other" && "Other"}
                </Button>
              ))}
            </div>
            <Input
              placeholder="Add optional notes (e.g., location, skin check findings)"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
            <Button onClick={() => recordRelief(selectedReliefType, notes)}>Log Relief</Button>
            {showReminder && (
              <div className="rounded-lg border border-destructive bg-destructive/10 px-4 py-3">
                <p className="text-sm font-medium text-destructive">Time for pressure relief!</p>
                <p className="text-xs text-muted-foreground">Perform a complete weight shift or cushion tilt.</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Relief Log</h3>
          <div className="grid gap-3 lg:grid-cols-2">
            {reliefLog.length === 0 ? (
              <div className="rounded-lg border px-4 py-6 text-sm text-muted-foreground">
                No reliefs logged yet. Record reliefs to build a compliance history.
              </div>
            ) : (
              reliefLog.map((entry) => (
                <div key={entry.id} className="rounded-lg border px-4 py-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                    <Badge variant="outline">{entry.reliefType}</Badge>
                  </div>
                  {entry.notes && <p className="text-sm text-muted-foreground">Notes: {entry.notes}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
