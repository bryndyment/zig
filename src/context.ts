import { ContextInterface } from './type'
import { createContext } from 'react'

// components

export const Context = createContext<ContextInterface | null>(null)
