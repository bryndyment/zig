import { AMBER, ORANGE, TODAY } from '@/util/const'
import { Positions } from '@/util/enum'
import { BOARDS } from '@/util/puzzles'
import confetti from 'canvas-confetti'
import { Dispatch, SetStateAction } from 'react'
import { _Puzzle, _ValidCells } from './type'

// types

type _GetPuzzleParams = { index: number; size?: never } | { index?: never; size: number }

// functions

export const calcToCell = (fromIndex: number, puzzleIndex: number, size: number) => {
  switch (fromIndex) {
    case 0:
      return BOARDS[puzzleIndex].values[size ** 2 - 1]
    case size ** 2 - size:
      return BOARDS[puzzleIndex].values[size - 1]
    case size - 1:
      return BOARDS[puzzleIndex].values[size ** 2 - size]
  }

  return BOARDS[puzzleIndex].values[0]
}

export const getDay = () => Number(new Date().toLocaleString('sv').slice(8, 10))

export const getPuzzleIndex = (size: number) =>
  Math.floor(
    Number(TODAY) -
      Number(
        new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '')
          .replace(/(.{6}).*/, '$101')
      )
  ) *
    7 +
  size -
  6

export const getPuzzle = ({ index, size }: _GetPuzzleParams): _Puzzle => {
  const puzzleIndex = index ?? getPuzzleIndex(size!)
  const puzzleSize = size ?? Math.sqrt(BOARDS[puzzleIndex].values.length)

  return {
    corners: {
      positions: new Map([
        [0, Positions.TOP_LEFT],
        [puzzleSize ** 2 - 1, Positions.BOTTOM_RIGHT],
        [puzzleSize ** 2 - puzzleSize, Positions.BOTTOM_LEFT],
        [puzzleSize - 1, Positions.TOP_RIGHT]
      ]),
      values: [
        BOARDS[puzzleIndex].values[0],
        BOARDS[puzzleIndex].values[puzzleSize - 1],
        BOARDS[puzzleIndex].values[puzzleSize ** 2 - puzzleSize],
        BOARDS[puzzleIndex].values[puzzleSize ** 2 - 1]
      ]
    },
    index: puzzleIndex
  }
}

export const showConfetti = (): void => {
  const base = { colors: [ORANGE, AMBER], particleCount: 2, spread: 99 }
  const end = Date.now() + 1000

  const frame = () => {
    confetti({ ...base, angle: 60, origin: { x: 0, y: 0.65 } })
    confetti({ ...base, angle: 120, origin: { x: 1, y: 0.65 } })

    if (Date.now() < end) requestAnimationFrame(frame)
  }

  frame()
}

export const updateValidCells = (index: number, from: Positions, setValidCells: Dispatch<SetStateAction<_ValidCells>>, size: number) => {
  const validCells: _ValidCells = new Set()

  switch (from) {
    case Positions.BOTTOM_LEFT:
      if (index + 1 > size) validCells.add(index - size)
      if ((index + 1) % size) validCells.add(index + 1)
      break
    case Positions.BOTTOM_RIGHT:
      if (index + 1 > size) validCells.add(index - size)
      if (index % size) validCells.add(index - 1)
      break
    case Positions.TOP_LEFT:
      if (index + size < size ** 2) validCells.add(index + size)
      if ((index + 1) % size) validCells.add(index + 1)
      break
    case Positions.TOP_RIGHT:
      if (index + size < size ** 2) validCells.add(index + size)
      if (index % size) validCells.add(index - 1)
  }

  setValidCells(validCells)
}
