import { Corners } from './enum'
import { Dispatch, SetStateAction } from 'react'

// exports

export interface CellProps {
  cell: number
  index: number
}

export interface ContextInterface {
  areNumbersVisible: boolean
  color: number
  corners: Map<number, Corner>
  destination: Corner | null
  goal: number
  isAnswerVisible: boolean
  isInitial: boolean
  isPuzzleSolved: boolean
  origin: Corner | null
  path: number[]
  puzzleIndex: number
  score: number
  setColor: Dispatch<SetStateAction<number>>
  setCorners: Dispatch<SetStateAction<Map<number, Corner>>>
  setDestination: Dispatch<SetStateAction<Corner | null>>
  setIsInitial: Dispatch<SetStateAction<boolean>>
  setOrigin: Dispatch<SetStateAction<Corner | null>>
  setPath: Dispatch<SetStateAction<number[]>>
  setPuzzleIndex: Dispatch<SetStateAction<number>>
  setSize: Dispatch<SetStateAction<number>>
  setValidCells: Dispatch<SetStateAction<ValidCells>>
  size: number
  validCells: ValidCells
}

export type Corner = Corners

export type ValidCells = Set<number>
