import { ContextInterface } from './type'
import { createContext } from 'react'

// exports

export const Context = createContext<ContextInterface | null>(null)
