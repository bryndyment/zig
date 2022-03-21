import { Dispatch, SetStateAction } from 'react'
import { Origins } from './enum'

// exports

export interface CellProps {
  cell: number
  index: number
}

export interface ContextInterface {
  areNumbersVisible: boolean
  color: number
  isAnswerVisible: boolean
  isPuzzleSolved: boolean
  origin: Origin | null
  path: number[]
  score: number
  setColor: Dispatch<SetStateAction<number>>
  setOrigin: Dispatch<SetStateAction<Origin | null>>
  setPath: Dispatch<SetStateAction<number[]>>
  setValidCells: Dispatch<SetStateAction<ValidCells>>
  validCells: ValidCells
}

export type Origin = Origins

export type ValidCells = Set<number>
