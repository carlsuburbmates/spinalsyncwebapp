import { LessonPageContent } from "@/components/lesson-page-content"

type LessonPageProps = {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params
  return <LessonPageContent subModuleId={id} />
}
