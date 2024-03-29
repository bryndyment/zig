import { BOARDS, ORANGE, TODAY, YELLOW } from './const'
import { Corner, ValidCells } from './type'
import { Corners } from './enum'
import { Dispatch, SetStateAction } from 'react'
import confetti from 'canvas-confetti'

export const calcCornerIndices = (puzzleIndex: number, size: number) => [
  BOARDS[puzzleIndex][0],
  BOARDS[puzzleIndex][size - 1],
  BOARDS[puzzleIndex][size ** 2 - size],
  BOARDS[puzzleIndex][size ** 2 - 1]
]

export const calcCorners = (size: number) =>
  new Map([
    [0, Corners.TOP_LEFT],
    [size - 1, Corners.TOP_RIGHT],
    [size ** 2 - size, Corners.BOTTOM_LEFT],
    [size ** 2 - 1, Corners.BOTTOM_RIGHT]
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
    case size - 1:
      return BOARDS[puzzleIndex][size ** 2 - size]
    case size ** 2 - size:
      return BOARDS[puzzleIndex][size - 1]
  }

  return BOARDS[puzzleIndex][0]
}

export const getDay = () => Number(new Date().toLocaleString('sv').slice(8, 10))

export const gtag = (...args: any[]) => (window as any).gtag?.('event', ...args)

const mulberry32 = (seed: any) => {
  let t = (seed += 0x6d2b79f5)

  t = Math.imul(t ^ (t >>> 15), t | 1)

  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

export const randomize = (date: string) => (Math.floor(mulberry32(date) * 100000) % 4) + 1

export const showConfetti = () => {
  const colors = [ORANGE, YELLOW]

  const end = Date.now() + 1000

  ;(function frame() {
    confetti({
      angle: 60,
      colors,
      origin: { x: 0, y: 0.65 },
      particleCount: 2,
      spread: 55
    })
    confetti({
      angle: 120,
      colors,
      origin: { x: 1, y: 0.65 },
      particleCount: 2,
      spread: 55
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}

export const updateValidCells = (index: number, from: Corner, setValidCells: Dispatch<SetStateAction<ValidCells>>, size: number) => {
  const validCells: ValidCells = new Set()

  switch (from) {
    case Corners.TOP_LEFT:
      if (index + size < size ** 2) {
        validCells.add(index + size)
      }

      if ((index + 1) % size) {
        validCells.add(index + 1)
      }
      break

    case Corners.TOP_RIGHT:
      if (index + size < size ** 2) {
        validCells.add(index + size)
      }

      if (index % size) {
        validCells.add(index - 1)
      }
      break

    case Corners.BOTTOM_LEFT:
      if (index + 1 > size) {
        validCells.add(index - size)
      }

      if ((index + 1) % size) {
        validCells.add(index + 1)
      }
      break

    case Corners.BOTTOM_RIGHT:
      if (index + 1 > size) {
        validCells.add(index - size)
      }

      if (index % size) {
        validCells.add(index - 1)
      }
  }

  setValidCells(validCells)
}
