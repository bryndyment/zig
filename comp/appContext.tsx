'use client'

import { ANSWERS, TODAY } from '@/util/const'
import { Corners, Statuses } from '@/util/enum'
import { calcCornerIndices, calcCorners, calcPuzzleIndex, getDay, showConfetti } from '@/util/func'
import { useContextGuard } from '@hoologic/use-context-guard'
import { Opening, useOpening } from '@hoologic/use-opening'
import { useWhen } from '@hoologic/use-when'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'

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
  isClient: boolean
  isKeyDown: boolean
  path: number[]
  prefsOpening: Opening
  puzzleIndex: number
  score: number
  setCornerIndices: Dispatch<SetStateAction<number[]>>
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

type _AppContextProps = { children: ReactNode; isClient: boolean }

// context

const APP_CONTEXT = createContext<_AppContext | null>(null)

// hooks

export const useAppContext = () => useContextGuard(APP_CONTEXT)

// components

export const AppContext: FC<_AppContextProps> = ({ children, isClient }) => {
  const prefsOpening = useOpening()
  const [areNumbersVisible, setAreNumbersVisible] = useState(true)
  const [day] = useState(getDay)
  const [from, setFrom] = useState<Corner | null>(null)
  const [isKeyDown, setIsKeyDown] = useState(false)
  const [path, setPath] = useState<number[]>([])
  const [size, setSize] = useState(isClient && 'size' in localStorage ? Number(localStorage.getItem('size')) : 6)
  const [status, setStatus] = useState(isClient && localStorage.getItem(`${TODAY}_${String(size)}`) ? Statuses.COMPLETE : Statuses.INITIAL)
  const [to, setTo] = useState<Corner | null>(null)
  const [validCells, setValidCells] = useState<ValidCells>(new Set())

  const [corners, setCorners] = useState(calcCorners(size))
  const [puzzleIndex, setPuzzleIndex] = useState(calcPuzzleIndex(size))

  const [cornerIndices, setCornerIndices] = useState(calcCornerIndices(puzzleIndex, size))

  const goal = useMemo(() => ANSWERS[puzzleIndex].reduce((accumulator, cell) => accumulator + cell, 0), [puzzleIndex])
  const score = useMemo(() => path.reduce((accumulator, cell) => accumulator + cell, 0), [path])

  useWhen(() => setInterval(() => getDay() !== day && location.reload(), 1000), [])

  const context = useMemo(
    () => ({
      areNumbersVisible,
      cornerIndices,
      corners,
      from,
      goal,
      isClient,
      isKeyDown,
      path,
      prefsOpening,
      puzzleIndex,
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
      status,
      to,
      validCells
    }),
    [areNumbersVisible, cornerIndices, corners, from, goal, isClient, isKeyDown, path, prefsOpening, puzzleIndex, score, size, status, to, validCells]
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [size])

  useEffect(() => {
    if (status === Statuses.INITIAL && score) {
      setStatus(Statuses.IN_PROGRESS)
    } else if (status === Statuses.IN_PROGRESS && score === goal) {
      const key = `${TODAY}_${String(size)}`
      const value = String(size)

      setStatus(Statuses.COMPLETE)

      if (isClient) localStorage.setItem(key, value)
    }
  }, [goal, score]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isKeyDown && !prefsOpening.isOpen && status === Statuses.COMPLETE) {
      showConfetti()
    }
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => setStatus(isClient && localStorage.getItem(`${TODAY}_${String(size)}`) ? Statuses.COMPLETE : Statuses.INITIAL), [isClient, size])

  return <APP_CONTEXT.Provider value={context}>{children}</APP_CONTEXT.Provider>
}
