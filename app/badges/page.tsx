import BadgesGrid from "@/components/BadgesGrid"

export default function BadgesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Badges</h1>
      <BadgesGrid />
    </main>
  )
}