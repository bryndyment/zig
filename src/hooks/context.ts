import { useContext as useReactContext } from 'react'
import { Context } from '../context'

export const useContext = () => {
  const context = useReactContext(Context)

  if (context === null) {
    throw new Error()
  }

  return context
}
