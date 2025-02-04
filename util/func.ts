import { Corner, ValidCells } from '@/comp/appContext'
import { AMBER, BOARDS, ORANGE, TODAY } from '@/util/const'
import { Corners } from '@/util/enum'
import confetti from 'canvas-confetti'
import { Dispatch, SetStateAction } from 'react'

// functions

export const calcCornerIndices = (puzzleIndex: number, size: number) => [
  BOARDS[puzzleIndex][0],
  BOARDS[puzzleIndex][size - 1],
  BOARDS[puzzleIndex][size ** 2 - size],
  BOARDS[puzzleIndex][size ** 2 - 1]
]

export const calcCorners = (size: number) =>
  new Map([
    [0, Corners.TOP_LEFT],
    [size ** 2 - 1, Corners.BOTTOM_RIGHT],
    [size ** 2 - size, Corners.BOTTOM_LEFT],
    [size - 1, Corners.TOP_RIGHT]
  ])

export const calcPuzzleIndex = (size: number) =>
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

export const calcToCell = (fromIndex: number, puzzleIndex: number, size: number) => {
  switch (fromIndex) {
    case 0:
      return BOARDS[puzzleIndex][size ** 2 - 1]
    case size ** 2 - size:
      return BOARDS[puzzleIndex][size - 1]
    case size - 1:
      return BOARDS[puzzleIndex][size ** 2 - size]
  }

  return BOARDS[puzzleIndex][0]
}

export const getDay = () => Number(new Date().toLocaleString('sv').slice(8, 10))

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

export const updateValidCells = (index: number, from: Corner, setValidCells: Dispatch<SetStateAction<ValidCells>>, size: number) => {
  const validCells: ValidCells = new Set()

  switch (from) {
    case Corners.BOTTOM_LEFT:
      if (index + 1 > size) validCells.add(index - size)
      if ((index + 1) % size) validCells.add(index + 1)
      break
    case Corners.BOTTOM_RIGHT:
      if (index + 1 > size) validCells.add(index - size)
      if (index % size) validCells.add(index - 1)
      break
    case Corners.TOP_LEFT:
      if (index + size < size ** 2) validCells.add(index + size)
      if ((index + 1) % size) validCells.add(index + 1)
      break
    case Corners.TOP_RIGHT:
      if (index + size < size ** 2) validCells.add(index + size)
      if (index % size) validCells.add(index - 1)
  }

  setValidCells(validCells)
}
