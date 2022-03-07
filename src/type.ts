import { Dispatch, SetStateAction } from 'react'
import { Origins } from './enum'

// exports

export interface CellProps {
  cell: number
  index: number
}

export interface ContextInterface {
  areNumbersHidden: boolean
  isAnswerVisible: boolean
  origin: Origin | null
  path: number[]
  score: number
  setOrigin: Dispatch<SetStateAction<Origin | null>>
  setPath: Dispatch<SetStateAction<number[]>>
  setValidIndices: Dispatch<SetStateAction<ValidIndices>>
  validIndices: ValidIndices
}

export type Origin = Origins

export type ValidIndices = Set<number>
