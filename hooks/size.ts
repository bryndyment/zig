import { Modes } from '@/util/enum'
import { useCallback, useEffect, useState } from 'react'

// hooks

export const useSize = (mode: Modes) => {
  const [size, setSize] = useState(0)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey) return

      switch (event.code) {
        case 'ArrowLeft':
          if (size > 6) setSize(current => current - 1)
          break
        case 'ArrowRight':
          if (size < 12) setSize(current => current + 1)
      }
    },
    [size]
  )

  useEffect(() => {
    if (mode === Modes.TODAY) {
      setSize('size' in localStorage ? Number(localStorage.getItem('size')) : 6)
    }
  }, [mode])

  useEffect(() => {
    if (mode === Modes.TODAY) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, mode])

  useEffect(() => {
    if (mode === Modes.TODAY && size) {
      localStorage.setItem('size', String(size))
    }
  }, [mode, size])

  return { setSize, size }
}
