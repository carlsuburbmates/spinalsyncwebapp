// Script to seed Supabase tables with test data via API endpoints
// Run with: `node scripts/seed-supabase.js` (after adding to package.json scripts)

const badges = [
  {
    id: 'bladder-basics-master',
    name: 'Bladder Basics Master',
    description: 'Complete all Bladder Management System modules with 80%+ assessment scores',
    category: 'Foundation',
    criteria: 'Complete modules 1-b, 1-c, 1-d with 80%+ scores',
    icon: '💧',
  },
  {
    id: 'bowel-care-champion',
    name: 'Bowel Care Champion',
    description: 'Complete all Bowel Management System modules with 80%+ assessment scores',
    category: 'Foundation',
    criteria: 'Complete all Module 2 sub-modules with 80%+ scores',
    icon: '🎯',
  },
  {
    id: 'skin-guardian',
    name: 'Skin Guardian',
    description: 'Complete all Skin Integrity modules with 80%+ assessment scores',
    category: 'Foundation',
    criteria: 'Complete all Module 6 sub-modules with 80%+ scores',
    icon: '🛡️',
  },
  {
    id: 'first-responder',
    name: 'First Responder',
    description: 'Complete Emergency Recognition module',
    category: 'Foundation',
    criteria: 'Complete Module 9-a with passing score',
    icon: '🚨',
  },
]

async function seedBadges() {
  for (const badge of badges) {
    const res = await fetch('http://localhost:3000/api/badges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(badge),
    })
    if (!res.ok) {
      const message = await res.text()
      throw new Error(`Failed to seed badge "${badge.id}": ${res.status} ${message}`)
    }
    const data = await res.json()
    console.log('Seeded badge:', badge.id, data)
  }
}

seedBadges()
