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
  corners: Map<number, Origins>
  goal: number
  isPuzzleSolved: boolean
  origin: Origin | null
  path: number[]
  puzzleIndex: number
  score: number
  setColor: Dispatch<SetStateAction<number>>
  setCorners: Dispatch<SetStateAction<Map<number, Origins>>>
  setOrigin: Dispatch<SetStateAction<Origin | null>>
  setPath: Dispatch<SetStateAction<number[]>>
  setPuzzleIndex: Dispatch<SetStateAction<number>>
  setSize: Dispatch<SetStateAction<number>>
  setValidCells: Dispatch<SetStateAction<ValidCells>>
  size: number
  validCells: ValidCells
}

export type Origin = Origins

export type ValidCells = Set<number>
