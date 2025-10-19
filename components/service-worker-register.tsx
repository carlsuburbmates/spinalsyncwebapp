'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch((error) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Failed to register service worker', error)
        }
      })
    }
  }, [])

  return null
}
