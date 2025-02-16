'use client'

import { ANSWERS } from '@/util/answers'
import { BOARDS } from '@/util/boards'
import { Positions, Statuses } from '@/util/enum'
import { getDay, getPuzzle, showConfetti } from '@/util/func'
import { _Puzzle, _ValidCells } from '@/util/type'
import { useContextGuard } from '@hoologic/use-context-guard'
import { Opening, useOpening } from '@hoologic/use-opening'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

// types

type _AppContext = {
  areNumbersVisible: boolean
  from: null | Positions
  goal: number
  id?: number
  isKeyDown: boolean
  pathValues: number[]
  puzzle: _Puzzle
  resetBoard: () => void
  score: number
  setFrom: Dispatch<SetStateAction<null | Positions>>
  setId: Dispatch<SetStateAction<number | undefined>>
  setPathValues: Dispatch<SetStateAction<number[]>>
  setPuzzle: Dispatch<SetStateAction<_Puzzle | undefined>>
  setSize: Dispatch<SetStateAction<number>>
  setValidCells: Dispatch<SetStateAction<_ValidCells>>
  size: number
  sizeOpening: Opening
  status: Statuses
  validCells: _ValidCells
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
  const [day] = useState(getDay)
  const [from, setFrom] = useState<null | Positions>(null)
  const [id, setId] = useState<number>()
  const [isKeyDown, setIsKeyDown] = useState(false)
  const [pathValues, setPathValues] = useState<number[]>([])
  const [puzzle, setPuzzle] = useState<_Puzzle>()
  const [size, setSize] = useState(0)
  const [status, setStatus] = useState<Statuses>()
  const [validCells, setValidCells] = useState<_ValidCells>(new Set())

  const goal = useMemo(() => (puzzle?.index === undefined ? 0 : ANSWERS[puzzle.index].reduce((previous, current) => previous + current, 0)), [puzzle?.index])
  const score = useMemo(() => pathValues.reduce((previous, current) => previous + current, 0), [pathValues])

  const resetBoard = useCallback(() => {
    setPathValues([])

    if (puzzle && status === Statuses.COMPLETE) {
      setStatus(Statuses.INITIAL)
      localStorage.removeItem(`${BOARDS[puzzle.index].id}_${String(size)}`)
    }
  }, [puzzle, size, status])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey) return

      switch (event.code) {
        case 'ArrowLeft':
          if (!id && size > 6) {
            setSize(current => current - 1)
          }
          break
        case 'ArrowRight':
          if (!id && size < 12) {
            setSize(current => current + 1)
          }
          break
        case 'KeyR':
          resetBoard()
          break
        case 'KeyT':
          setAreNumbersVisible(current => !current)
      }
    },
    [id, resetBoard, size]
  )

  useEffect(() => {
    if (!id) {
      setInterval(() => getDay() !== day && location.reload(), 1000)
    }
  }, [day, id])

  useEffect(() => {
    if (!id) {
      setSize('size' in localStorage ? Number(localStorage.getItem('size')) : 6)
    }
  }, [id])

  useEffect(() => {
    if (puzzle) {
      setStatus(localStorage.getItem(`${BOARDS[puzzle.index].id}_${String(size)}`) ? Statuses.COMPLETE : Statuses.INITIAL)
    }
  }, [puzzle, size])

  useEffect(() => {
    if (!puzzle && size) {
      setPuzzle(getPuzzle({ size }))
    }
  }, [puzzle, size])

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
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (status === Statuses.INITIAL && score) {
      setStatus(Statuses.IN_PROGRESS)
    } else if (puzzle && status === Statuses.IN_PROGRESS && score === goal) {
      const key = `${BOARDS[puzzle.index].id}_${String(size)}`
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

  useEffect(() => {
    if (puzzle) {
      setStatus(localStorage.getItem(`${BOARDS[puzzle.index].id}_${String(size)}`) ? Statuses.COMPLETE : Statuses.INITIAL)
    }
  }, [puzzle, size])

  const context = useMemo(
    () => ({
      areNumbersVisible,
      from,
      goal,
      id,
      isKeyDown,
      pathValues,
      puzzle: puzzle!,
      resetBoard,
      score,
      setFrom,
      setId,
      setPathValues,
      setPuzzle,
      setSize,
      setValidCells,
      size,
      sizeOpening,
      status: status!,
      validCells
    }),
    [areNumbersVisible, from, goal, id, isKeyDown, pathValues, puzzle, resetBoard, score, size, sizeOpening, status, validCells]
  )

  return <APP_CONTEXT.Provider value={context}>{children}</APP_CONTEXT.Provider>
}
