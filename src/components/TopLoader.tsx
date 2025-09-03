'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'

export default function TopLoader() {
  const [progress, setProgress] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false)
  const pathname = usePathname()
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const overlayTimeout = useRef<NodeJS.Timeout | null>(null)
  const imageListenersCleanup = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Show overlay immediately to hide content loading
    setShowOverlay(true)
    setProgress(10)

    // Clear any previous listeners
    if (imageListenersCleanup.current) {
      imageListenersCleanup.current()
      imageListenersCleanup.current = null
    }

    // After a tick, measure images inside main and track their loading
    const startTracking = () => {
      const main = document.querySelector('main')
      const images = Array.from(main?.querySelectorAll('img') || []) as HTMLImageElement[]

      const pending = images.filter(img => !img.complete)

      // If no pending images, finish quickly
      if (pending.length === 0) {
        setProgress(100)
        overlayTimeout.current = setTimeout(() => setShowOverlay(false), 150)
        return
      }

      let loadedCount = 0
      const total = pending.length

      const onProgress = () => {
        loadedCount += 1
        // Advance up to 90% based on proportion of loaded images
        const proportion = loadedCount / total
        const next = 10 + Math.min(80, Math.floor(proportion * 80))
        setProgress(next)
        if (loadedCount >= total) {
          // All images done, complete to 100 and hide overlay
          setProgress(100)
          overlayTimeout.current = setTimeout(() => setShowOverlay(false), 150)
        }
      }

      // Attach listeners
      const cleanups: Array<() => void> = []
      pending.forEach(img => {
        const handleLoad = () => onProgress()
        const handleError = () => onProgress()
        img.addEventListener('load', handleLoad, { once: true })
        img.addEventListener('error', handleError, { once: true })
        cleanups.push(() => {
          img.removeEventListener('load', handleLoad)
          img.removeEventListener('error', handleError)
        })
      })

      // Safety timeout in case some resources never resolve
      const safety = window.setTimeout(() => {
        setProgress(100)
        overlayTimeout.current = setTimeout(() => setShowOverlay(false), 150)
        cleanups.forEach(fn => fn())
      }, 5000)

      imageListenersCleanup.current = () => {
        window.clearTimeout(safety)
        cleanups.forEach(fn => fn())
      }
    }

    // Defer to end of call stack so the new route's DOM is present
    progressInterval.current = setTimeout(startTracking, 0)

    // Cleanup
    return () => {
      if (progressInterval.current) {
        clearTimeout(progressInterval.current)
      }
      if (overlayTimeout.current) {
        clearTimeout(overlayTimeout.current)
      }
      if (imageListenersCleanup.current) {
        imageListenersCleanup.current()
        imageListenersCleanup.current = null
      }
    }
  }, [pathname])

  return (
    <>
      <LoadingBar 
        color="#DD7B8D"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => {
          setProgress(0)
        }}
      />
      
      {/* Overlay to hide content loading */}
      {showOverlay && (
        <div 
          className="fixed inset-0 bg-white z-50 transition-opacity duration-300"
          style={{
            opacity: showOverlay ? 1 : 0,
            pointerEvents: showOverlay ? 'auto' : 'none'
          }}
        />
      )}
    </>
  )
}


