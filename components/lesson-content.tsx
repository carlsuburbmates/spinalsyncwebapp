"use client"

import type { ContentSection } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react"
import type { JSX } from "react"

interface LessonContentProps {
  content: ContentSection[]
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="space-y-6">
      {content.map((section, index) => (
        <ContentRenderer key={index} section={section} />
      ))}
    </div>
  )
}

function ContentRenderer({ section }: { section: ContentSection }) {
  switch (section.type) {
    case "heading":
      return <HeadingSection content={section.content as string} level={section.level || 2} />
    case "paragraph":
      return <ParagraphSection content={section.content as string} />
    case "list":
      return <ListSection items={section.content as string[]} />
    case "callout":
      return <CalloutSection content={section.content as string} variant={section.variant || "info"} />
    case "steps":
      return <StepsSection steps={section.content as string[]} />
    default:
      return null
  }
}

function HeadingSection({ content, level }: { content: string; level: number }) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  const styles = {
    2: "text-2xl font-bold text-foreground mt-8 mb-4",
    3: "text-xl font-semibold text-foreground mt-6 mb-3",
    4: "text-lg font-medium text-foreground mt-4 mb-2",
  }

  return <HeadingTag className={styles[level as keyof typeof styles] || styles[2]}>{content}</HeadingTag>
}

function ParagraphSection({ content }: { content: string }) {
  return <p className="text-base leading-relaxed text-muted-foreground">{content}</p>
}

function ListSection({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 ml-6">
      {items.map((item, index) => (
        <li key={index} className="text-base leading-relaxed text-muted-foreground list-disc">
          {item}
        </li>
      ))}
    </ul>
  )
}

function CalloutSection({ content, variant }: { content: string; variant: "info" | "warning" | "danger" | "success" }) {
  const variants = {
    info: {
      icon: Info,
      className: "border-blue-500 bg-blue-50 dark:bg-blue-950/20",
      iconClassName: "text-blue-600 dark:text-blue-400",
    },
    warning: {
      icon: AlertTriangle,
      className: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
      iconClassName: "text-yellow-600 dark:text-yellow-400",
    },
    danger: {
      icon: AlertCircle,
      className: "border-red-500 bg-red-50 dark:bg-red-950/20",
      iconClassName: "text-red-600 dark:text-red-400",
    },
    success: {
      icon: CheckCircle,
      className: "border-green-500 bg-green-50 dark:bg-green-950/20",
      iconClassName: "text-green-600 dark:text-green-400",
    },
  }

  const config = variants[variant]
  const Icon = config.icon

  return (
    <Alert className={config.className}>
      <Icon className={`h-5 w-5 ${config.iconClassName}`} />
      <AlertDescription className="text-sm leading-relaxed ml-2">{content}</AlertDescription>
    </Alert>
  )
}

function StepsSection({ steps }: { steps: string[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
            {index + 1}
          </div>
          <p className="text-base leading-relaxed text-muted-foreground pt-1">{step}</p>
        </div>
      ))}
    </div>
  )
}
