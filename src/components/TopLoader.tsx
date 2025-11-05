'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'

export default function TopLoader() {
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const imageListenersCleanup = useRef<(() => void) | null>(null)

  useEffect(() => {
    setProgress(10)

    // Clear any previous listeners
    if (imageListenersCleanup.current) {
      imageListenersCleanup.current()
      imageListenersCleanup.current = null
    }

    // Track images loading in main content
    const startTracking = () => {
      const main = document.querySelector('main')
      const images = Array.from(main?.querySelectorAll('img') || []) as HTMLImageElement[]
      const pending = images.filter(img => !img.complete)

      // If no pending images, finish quickly
      if (pending.length === 0) {
        setProgress(100)
        return
      }

      let loadedCount = 0
      const total = pending.length

      const onProgress = () => {
        loadedCount += 1
        // Advance progress based on proportion of loaded images
        const proportion = loadedCount / total
        const next = 10 + Math.min(80, Math.floor(proportion * 80))
        setProgress(next)
        
        if (loadedCount >= total) {
          setProgress(100)
        }
      }

      // Attach event listeners to pending images
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
      if (imageListenersCleanup.current) {
        imageListenersCleanup.current()
        imageListenersCleanup.current = null
      }
    }
  }, [pathname])

  return (
    <LoadingBar 
      color="#DD7B8D"
      progress={progress}
      waitingTime={400}
      height={5}
      onLoaderFinished={() => {
        setProgress(0)
      }}
    />
  )
}


