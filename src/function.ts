import { Dispatch, SetStateAction } from 'react'
import { Origin, ValidCells } from './type'
import { Origins } from './enum'
import { SIZE, SIZE_SQUARED } from './const'

// functions

const mulberry32 = (seed: any) => {
  let t = (seed += 0x6d2b79f5)

  t = Math.imul(t ^ (t >>> 15), t | 1)

  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// exports

export const getDay = () => Number(new Date().toLocaleString('sv').slice(8, 10))

export const gtag = (...args: any[]) => (window as any).gtag?.('event', ...args)

export const randomize = (date: string) => (Math.floor(mulberry32(date) * 100000) % 4) + 1

export const updateValidCells = (index: number, origin: Origin, setValidCells: Dispatch<SetStateAction<ValidCells>>) => {
  const validCells: ValidCells = new Set()

  switch (origin) {
    case Origins.TOP_LEFT:
      if (index + SIZE < SIZE_SQUARED) {
        validCells.add(index + SIZE)
      }

      if ((index + 1) % SIZE) {
        validCells.add(index + 1)
      }
      break

    case Origins.TOP_RIGHT:
      if (index + SIZE < SIZE_SQUARED) {
        validCells.add(index + SIZE)
      }

      if (index % SIZE) {
        validCells.add(index - 1)
      }
      break

    case Origins.BOTTOM_LEFT:
      if (index + 1 > SIZE) {
        validCells.add(index - SIZE)
      }

      if ((index + 1) % SIZE) {
        validCells.add(index + 1)
      }
      break

    case Origins.BOTTOM_RIGHT:
      if (index + 1 > SIZE) {
        validCells.add(index - SIZE)
      }

      if (index % SIZE) {
        validCells.add(index - 1)
      }
  }

  setValidCells(validCells)
}
