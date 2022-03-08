import { Context } from '../context'
import { useContext as useReactContext } from 'react'

// exports

export const useContext = () => {
  const context = useReactContext(Context)

  if (context === null) {
    throw new Error()
  }

  return context
}
