import { Dispatch, SetStateAction } from 'react'
import { ORANGE, YELLOW } from './const'
import { Origin, ValidCells } from './type'
import { Origins } from './enum'
import confetti from 'canvas-confetti'

// functions

const mulberry32 = (seed: any) => {
  let t = (seed += 0x6d2b79f5)

  t = Math.imul(t ^ (t >>> 15), t | 1)

  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// exports

export const calcCorners = (size: number) =>
  new Map([
    [0, Origins.TOP_LEFT],
    [size - 1, Origins.TOP_RIGHT],
    [size ** 2 - size, Origins.BOTTOM_LEFT],
    [size ** 2 - 1, Origins.BOTTOM_RIGHT]
  ])

export const calcPuzzleIndex = (size: number, today: string) => Math.floor(Number(today) - 20220325) * 7 + size - 6

export const getDay = () => Number(new Date().toLocaleString('sv').slice(8, 10))

export const gtag = (...args: any[]) => (window as any).gtag?.('event', ...args)

export const randomize = (date: string) => (Math.floor(mulberry32(date) * 100000) % 4) + 1

export const showConfetti = () => {
  const colors = [ORANGE, YELLOW]

  const end = Date.now() + 5 * 1000

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

export const updateValidCells = (index: number, origin: Origin, setValidCells: Dispatch<SetStateAction<ValidCells>>, size: number) => {
  const validCells: ValidCells = new Set()

  switch (origin) {
    case Origins.TOP_LEFT:
      if (index + size < size ** 2) {
        validCells.add(index + size)
      }

      if ((index + 1) % size) {
        validCells.add(index + 1)
      }
      break

    case Origins.TOP_RIGHT:
      if (index + size < size ** 2) {
        validCells.add(index + size)
      }

      if (index % size) {
        validCells.add(index - 1)
      }
      break

    case Origins.BOTTOM_LEFT:
      if (index + 1 > size) {
        validCells.add(index - size)
      }

      if ((index + 1) % size) {
        validCells.add(index + 1)
      }
      break

    case Origins.BOTTOM_RIGHT:
      if (index + 1 > size) {
        validCells.add(index - size)
      }

      if (index % size) {
        validCells.add(index - 1)
      }
  }

  setValidCells(validCells)
}
