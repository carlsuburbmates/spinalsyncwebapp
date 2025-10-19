
import Link from "next/link"
import { AlertTriangle, BookOpen, Stethoscope, Users, FileText, Home } from "lucide-react"
import { InteractiveSidebar } from "@/components/InteractiveSidebar"
import { QuickAccessCard } from "@/components/QuickAccessCard"


export default function Homepage() {
  // Example quick-access cards for clinical guidelines
  const quickAccess = [
    {
      href: "/guidelines/bladder",
      icon: <Stethoscope className="h-5 w-5 text-primary" />,
      title: "Bladder Management",
      description: "Direct bedside reference for bladder care"
    },
    {
      href: "/guidelines/bowel",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      title: "Bowel Management",
      description: "Protocols and checklists for bowel care"
    },
    {
      href: "/guidelines/skin",
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "Skin Care",
      description: "Pressure injury prevention and response"
    },
    {
      href: "/guidelines/pain",
      icon: <Stethoscope className="h-5 w-5 text-primary" />,
      title: "Pain Management",
      description: "Assessment and management protocols"
    },
    {
      href: "/emergency",
      icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
      title: "Emergency Protocols",
      description: "Quick access to critical procedures"
    },
    {
      href: "/team-planning",
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Team Planning",
      description: "MDT meetings, goal setting, contacts"
    },
    {
      href: "/discharge",
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "Discharge Planning",
      description: "Forms, compensation, referrals"
    },
    {
      href: "/resources",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      title: "Resource Library",
      description: "Contacts, forms, links, downloads"
    },
  ]

  // Example education/training quick links
  const educationLinks = [
    {
      href: "/modules",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      title: "Modules",
      description: "Browse all learning modules"
    },
    {
      href: "/progress",
      icon: <Home className="h-5 w-5 text-primary" />,
      title: "Progress",
      description: "Track your learning progress"
    },
    {
      href: "/assessment",
      icon: <Stethoscope className="h-5 w-5 text-primary" />,
      title: "Assessments",
      description: "Complete clinical assessments"
    },
  ]

  // Sidebar navigation items
  const sidebarItems = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/guidelines/bladder", label: "Guidelines", icon: <BookOpen className="h-5 w-5" /> },
    { href: "/emergency", label: "Emergency", icon: <AlertTriangle className="h-5 w-5 text-destructive" /> },
    { href: "/resources", label: "Resources", icon: <FileText className="h-5 w-5" /> },
    { href: "/modules", label: "Education", icon: <BookOpen className="h-5 w-5" /> },
  ];

  // Mobile bottom tab items (same as sidebar)
  const mobileTabs = sidebarItems;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for desktop/tablet */}
      <aside className="hidden md:block md:w-64 bg-muted/30 border-r p-4 min-h-screen sticky top-0">
        <div className="font-bold text-xl text-primary mb-8">SpinalSync</div>
        <InteractiveSidebar items={sidebarItems} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header for mobile */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-background sticky top-0 z-30">
          <span className="font-bold text-lg text-primary">SpinalSync</span>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Hero/Orientation */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to the Primary Nursing Digital Hub</h1>
            <p className="text-muted-foreground max-w-2xl">
              Rapid access to clinical guidelines, emergency protocols, and education modules for spinal cord injury nursing. Use the quick-access cards below for bedside reference or ongoing professional development.
            </p>
          </section>

          {/* Quick Access Grid (Clinical) */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Clinical Quick Access</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {quickAccess.map((item) => (
                <QuickAccessCard key={item.href} {...item} />
              ))}
            </div>
          </section>

          {/* Education/Training Quick Links */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Education & Training</h2>
            <div className="flex flex-wrap gap-4">
              {educationLinks.map((item) => (
                <QuickAccessCard key={item.href} {...item} className="w-48" />
              ))}
            </div>
          </section>
        </main>

        {/* Emergency Button (always visible, floating) */}
        <Link href="/emergency" className="fixed bottom-6 right-6 z-50">
          <button className="rounded-full bg-red-600 text-white shadow-lg px-6 py-4 text-lg font-bold flex items-center gap-2 min-w-[80px] min-h-[80px]">
            <AlertTriangle className="h-6 w-6" />
            Emergency
          </button>
        </Link>

        {/* Mobile Bottom Tab Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t flex justify-around items-center h-16 shadow-lg">
          {mobileTabs.map((tab) => (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center justify-center flex-1 h-full text-xs">
              {tab.icon}
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <footer className="px-6 py-4 border-t bg-background text-xs text-muted-foreground text-center mt-auto">
          &copy; {new Date().getFullYear()} SpinalSync. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
