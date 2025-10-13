import { emergencyProtocols, getCriticalProtocols } from "@/lib/emergency-protocols"
import { EmergencyProtocolCard } from "@/components/emergency-protocol-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmergencyPage() {
  const criticalProtocols = getCriticalProtocols()
  const otherProtocols = emergencyProtocols.filter((p) => p.category !== "Critical")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-red-600 dark:text-red-400">Emergency Protocols</h2>
        <p className="text-muted-foreground">Quick access to critical emergency response procedures</p>
      </div>

      <Alert className="border-red-500 bg-red-50 dark:bg-red-950/20">
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
        <AlertDescription className="ml-2">
          <strong className="block mb-2">In a life-threatening emergency, call 000 immediately</strong>
          <p className="text-sm">
            These protocols are for guidance only. Always seek immediate medical attention for serious symptoms or when
            in doubt.
          </p>
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Button variant="destructive" size="lg" className="flex-1" asChild>
          <a href="tel:000">
            <Phone className="w-4 h-4 mr-2" />
            Call 000
          </a>
        </Button>
        <Button variant="outline" size="lg" className="flex-1 bg-transparent" asChild>
          <a href="tel:131126">
            <Phone className="w-4 h-4 mr-2" />
            Health Direct (13 11 26)
          </a>
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Critical Emergencies</h3>
        <div className="grid gap-4">
          {criticalProtocols.map((protocol) => (
            <EmergencyProtocolCard key={protocol.id} protocol={protocol} />
          ))}
        </div>
      </div>

      {otherProtocols.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Other Important Protocols</h3>
          <div className="grid gap-4">
            {otherProtocols.map((protocol) => (
              <EmergencyProtocolCard key={protocol.id} protocol={protocol} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
