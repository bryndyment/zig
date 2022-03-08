import { Dispatch, SetStateAction } from 'react'
import { Origin, ValidIndices } from './type'
import { Origins } from './enum'
import { SIZE, SIZE_SQUARED } from './const'

// exports

export const gtag = (...args: any[]) => (window as any).gtag?.('event', ...args)

export const updateValidIndices = (index: number, origin: Origin, setValidIndices: Dispatch<SetStateAction<ValidIndices>>) => {
  const validIndices: ValidIndices = new Set()

  switch (origin) {
    case Origins.TOP_LEFT:
      if (index + SIZE < SIZE_SQUARED) {
        validIndices.add(index + SIZE)
      }

      if ((index + 1) % SIZE) {
        validIndices.add(index + 1)
      }
      break

    case Origins.TOP_RIGHT:
      if (index + SIZE < SIZE_SQUARED) {
        validIndices.add(index + SIZE)
      }

      if (index % SIZE) {
        validIndices.add(index - 1)
      }
      break

    case Origins.BOTTOM_LEFT:
      if (index + 1 > SIZE) {
        validIndices.add(index - SIZE)
      }

      if ((index + 1) % SIZE) {
        validIndices.add(index + 1)
      }
      break

    case Origins.BOTTOM_RIGHT:
      if (index + 1 > SIZE) {
        validIndices.add(index - SIZE)
      }

      if (index % SIZE) {
        validIndices.add(index - 1)
      }
  }

  setValidIndices(validIndices)
}
