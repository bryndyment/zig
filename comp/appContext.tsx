'use client'

import { ANSWERS, TODAY } from '@/util/const'
import { Corners, Statuses } from '@/util/enum'
import { calcCornerIndices, calcCorners, calcPuzzleIndex, getDay, showConfetti } from '@/util/func'
import { useContextGuard } from '@hoologic/use-context-guard'
import { Opening, useOpening } from '@hoologic/use-opening'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

// types

export type Corner = Corners
export type Status = Statuses
export type ValidCells = Set<number>

type _AppContext = {
  areNumbersVisible: boolean
  cornerIndices: number[]
  corners: Map<number, Corner>
  from: Corner | null
  goal: number
  isKeyDown: boolean
  path: number[]
  puzzleIndex: number
  score: number
  setCornerIndices: Dispatch<SetStateAction<number[] | undefined>>
  setCorners: Dispatch<SetStateAction<Map<number, Corner> | undefined>>
  setFrom: Dispatch<SetStateAction<Corner | null>>
  setPath: Dispatch<SetStateAction<number[]>>
  setPuzzleIndex: Dispatch<SetStateAction<number | undefined>>
  setSize: Dispatch<SetStateAction<number>>
  setTo: Dispatch<SetStateAction<Corner | null>>
  setValidCells: Dispatch<SetStateAction<ValidCells>>
  size: number
  sizeOpening: Opening
  status: Status
  to: Corner | null
  validCells: ValidCells
}

type _AppContextProps = { children: ReactNode }

// context

const APP_CONTEXT = createContext<_AppContext | null>(null)

// hooks

export const useAppContext = () => useContextGuard(APP_CONTEXT)

// components

export const AppContext: FC<_AppContextProps> = ({ children }) => {
  const sizeOpening = useOpening()
  const [areNumbersVisible, setAreNumbersVisible] = useState(true)
  const [cornerIndices, setCornerIndices] = useState<number[]>()
  const [corners, setCorners] = useState<Map<number, Corners>>()
  const [day] = useState(getDay)
  const [from, setFrom] = useState<Corner | null>(null)
  const [isKeyDown, setIsKeyDown] = useState(false)
  const [path, setPath] = useState<number[]>([])
  const [puzzleIndex, setPuzzleIndex] = useState<number>()
  const [size, setSize] = useState(0)
  const [status, setStatus] = useState<Status>()
  const [to, setTo] = useState<Corner | null>(null)
  const [validCells, setValidCells] = useState<ValidCells>(new Set())

  const goal = useMemo(() => (puzzleIndex === undefined ? 0 : ANSWERS[puzzleIndex].reduce((accumulator, cell) => accumulator + cell, 0)), [puzzleIndex])
  const score = useMemo(() => path.reduce((accumulator, cell) => accumulator + cell, 0), [path])

  useEffect(() => {
    setInterval(() => getDay() !== day && location.reload(), 1000)
  }, [day])

  useEffect(() => setSize('size' in localStorage ? Number(localStorage.getItem('size')) : 6), [])
  useEffect(() => setStatus(localStorage.getItem(`${TODAY}_${String(size)}`) ? Statuses.COMPLETE : Statuses.INITIAL), [size])

  useEffect(() => {
    if (size && !corners) {
      const puzzleIndex = calcPuzzleIndex(size)

      setCorners(calcCorners(size))
      setCornerIndices(calcCornerIndices(puzzleIndex, size))
      setPuzzleIndex(puzzleIndex)
    }
  }, [corners, size])

  const context = useMemo(
    () => ({
      areNumbersVisible,
      cornerIndices: cornerIndices!,
      corners: corners!,
      from,
      goal,
      isKeyDown,
      path,
      puzzleIndex: puzzleIndex!,
      score,
      setCornerIndices,
      setCorners,
      setFrom,
      setPath,
      setPuzzleIndex,
      setSize,
      setStatus,
      setTo,
      setValidCells,
      size,
      sizeOpening,
      status: status!,
      to,
      validCells
    }),
    [areNumbersVisible, cornerIndices, corners, from, goal, isKeyDown, path, puzzleIndex, score, size, sizeOpening, status, to, validCells]
  )

  useEffect(() => {
    const handleKeyDown = () => setIsKeyDown(true)
    const handleKeyUp = () => setTimeout(() => setIsKeyDown(false), 100)

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowLeft':
          if (size > 6) {
            setSize(current => current - 1)
          }
          break
        case 'ArrowRight':
          if (size < 12) {
            setSize(current => current + 1)
          }
          break
        case 'KeyC':
          setAreNumbersVisible(current => !current)
      }
    },
    [size]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (status === Statuses.INITIAL && score) {
      setStatus(Statuses.IN_PROGRESS)
    } else if (status === Statuses.IN_PROGRESS && score === goal) {
      const key = `${TODAY}_${String(size)}`
      const value = String(size)

      setStatus(Statuses.COMPLETE)

      localStorage.setItem(key, value)
    }
  }, [goal, score]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isKeyDown && !sizeOpening.isOpen && status === Statuses.COMPLETE) {
      showConfetti()
    }
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => setStatus(localStorage.getItem(`${TODAY}_${String(size)}`) ? Statuses.COMPLETE : Statuses.INITIAL), [size])

  if (!cornerIndices || !corners || puzzleIndex === undefined || !size || status === undefined) return null

  return <APP_CONTEXT.Provider value={context}>{children}</APP_CONTEXT.Provider>
}
