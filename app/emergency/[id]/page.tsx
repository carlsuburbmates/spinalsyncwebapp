import { getProtocolById } from "@/lib/emergency-protocols"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Phone, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function EmergencyProtocolPage({ params }: { params: { id: string } }) {
  const protocol = getProtocolById(params.id)

  if (!protocol) {
    notFound()
  }

  const categoryConfig = {
    Critical: {
      className: "border-red-500 bg-red-50 dark:bg-red-950/20",
      textColor: "text-red-600 dark:text-red-400",
    },
    Urgent: {
      className: "border-orange-500 bg-orange-50 dark:bg-orange-950/20",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    Important: {
      className: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
      textColor: "text-yellow-600 dark:text-yellow-400",
    },
  }

  const config = categoryConfig[protocol.category]

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/emergency"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Emergency Protocols
        </Link>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="destructive">{protocol.category}</Badge>
              <Badge variant="outline">{protocol.injury_level}</Badge>
            </div>
            <h1 className={`text-3xl font-bold ${config.textColor}`}>{protocol.title}</h1>
          </div>

          <Alert className={`${config.className} border-2`}>
            <AlertCircle className={`h-5 w-5 ${config.textColor}`} />
            <AlertDescription className="ml-2">
              <strong className="block mb-2">Emergency Contact</strong>
              <p className="text-sm mb-3">
                If this is a life-threatening emergency or symptoms are severe, call 000 immediately.
              </p>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" asChild>
                  <a href="tel:000">
                    <Phone className="w-3 h-3 mr-2" />
                    Call 000
                  </a>
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Quick Actions - Do These First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {protocol.quick_actions.map((action, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-base leading-relaxed pt-0.5">{action}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Warning Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {protocol.warning_signs.map((sign, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-base leading-relaxed">{sign}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">When to Call 000</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {protocol.when_to_call_911.map((reason, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-red-600 dark:text-red-400">•</span>
                    <span className="text-base leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Detailed Step-by-Step Protocol</h2>
            {protocol.detailed_steps.map((step) => (
              <Card key={step.step}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      {step.step}
                    </span>
                    {step.action}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-muted-foreground ml-11">{step.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
