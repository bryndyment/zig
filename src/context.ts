import { createContext } from 'react'
import { ContextInterface } from './type'

// components

export const Context = createContext<ContextInterface | null>(null)
