import { useCallback, useState } from 'react'

// exported types

export interface Opening {
  anchor: any | null
  close: () => void
  isOpen: boolean
  open: (event?: any) => void
  toggle: (event?: any) => void
}

// exported hooks

export const useOpening = (
  initialState = {
    anchor: null,
    isOpen: false
  }
): Opening => {
  const [opening, setOpening] = useState(initialState)

  const close = useCallback(() => setOpening({ anchor: null, isOpen: false }), [])

  const open = useCallback((event: any = {}) => {
    const { currentTarget = null } = event

    setOpening({ anchor: currentTarget, isOpen: true })
  }, [])

  const toggle = opening.isOpen ? close : open

  return {
    ...opening,
    close,
    open,
    toggle
  }
}
