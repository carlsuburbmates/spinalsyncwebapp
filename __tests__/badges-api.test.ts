import { describe, it, expect } from 'vitest'

const apiBase = 'http://localhost:3000/api'

async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options)
  return res.json()
}

describe('Badges API', () => {
  it('GET /api/badges returns an array', async () => {
    const data = await fetchJson(`${apiBase}/badges`)
    expect(Array.isArray(data)).toBe(true)
  })

  it('POST /api/badges creates a badge', async () => {
    const badge = {
      id: 'test-badge',
      name: 'Test Badge',
      description: 'A badge for testing',
      category: 'Special',
      criteria: 'Do something special',
      icon: '⭐',
    }
    const res = await fetch(`${apiBase}/badges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(badge),
    })
    const data = await res.json()
    expect(res.status).toBe(201)
    expect(data[0].id).toBe('test-badge')
  })
})
