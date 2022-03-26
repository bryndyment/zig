import { Corners, Statuses } from './enum'
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
  from: Corner | null
  goal: number
  path: number[]
  puzzleIndex: number
  score: number
  setColor: Dispatch<SetStateAction<number>>
  setCorners: Dispatch<SetStateAction<Map<number, Corner>>>
  setFrom: Dispatch<SetStateAction<Corner | null>>
  setPath: Dispatch<SetStateAction<number[]>>
  setPuzzleIndex: Dispatch<SetStateAction<number>>
  setSize: Dispatch<SetStateAction<number>>
  setTo: Dispatch<SetStateAction<Corner | null>>
  setValidCells: Dispatch<SetStateAction<ValidCells>>
  size: number
  status: Status
  to: Corner | null
  validCells: ValidCells
}

export type Corner = Corners

export type Status = Statuses

export type ValidCells = Set<number>
