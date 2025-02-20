'use client'

import { useSize } from '@/hooks/size'
import { Modes, Positions, Statuses } from '@/util/enum'
import { getDay, showConfetti } from '@/util/func'
import { ANSWERS, BOARDS } from '@/util/puzzles'
import { _Puzzle, _ValidCells } from '@/util/type'
import { useContextGuard } from '@hoologic/use-context-guard'
import { Opening, useOpening } from '@hoologic/use-opening'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

// types

type _AppContext = {
  aboutOpening: Opening
  areNumbersVisible: boolean
  from: null | Positions
  goal: number
  isKeyDown: boolean
  keysOpening: Opening
  mode: Modes
  pathValues: number[]
  puzzle: _Puzzle
  resetBoard: () => void
  score: number
  setFrom: Dispatch<SetStateAction<null | Positions>>
  setMode: Dispatch<SetStateAction<Modes>>
  setPathValues: Dispatch<SetStateAction<number[]>>
  setPuzzle: Dispatch<SetStateAction<_Puzzle | undefined>>
  setSize: Dispatch<SetStateAction<number>>
  setValidCells: Dispatch<SetStateAction<_ValidCells>>
  shareOpening: Opening
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
  const aboutOpening = useOpening()
  const keysOpening = useOpening()
  const shareOpening = useOpening()
  const sizeOpening = useOpening()

  const [areNumbersVisible, setAreNumbersVisible] = useState(true)
  const [day] = useState(getDay)
  const [from, setFrom] = useState<null | Positions>(null)
  const [isKeyDown, setIsKeyDown] = useState(false)
  const [mode, setMode] = useState<Modes>(Modes.UNKNOWN)
  const [pathValues, setPathValues] = useState<number[]>([])
  const [puzzle, setPuzzle] = useState<_Puzzle>()
  const [status, setStatus] = useState<Statuses>()
  const [validCells, setValidCells] = useState<_ValidCells>(new Set())

  const { setSize, size } = useSize(mode)

  const goal = useMemo(() => (puzzle?.index === undefined ? 0 : ANSWERS[puzzle.index].reduce((previous, current) => previous + current, 0)), [puzzle?.index])
  const score = useMemo(() => pathValues.reduce((previous, current) => previous + current, 0), [pathValues])

  const resetBoard = useCallback(() => {
    setPathValues([])

    if (puzzle && status === Statuses.COMPLETE) {
      setStatus(Statuses.INITIAL)
      localStorage.removeItem(String(BOARDS[puzzle.index].id))
    }
  }, [puzzle, status])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey) return

      switch (event.code) {
        case 'KeyR':
          resetBoard()
          break
        case 'KeyT':
          setAreNumbersVisible(current => !current)
      }
    },
    [resetBoard]
  )

  useEffect(() => {
    if (mode === Modes.TODAY) {
      setInterval(() => getDay() !== day && location.reload(), 1000)
    }
  }, [day, mode])

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
      setStatus(Statuses.COMPLETE)

      localStorage.setItem(String(BOARDS[puzzle.index].id), String(score))
    }
  }, [goal, score]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isKeyDown && !sizeOpening.isOpen && status === Statuses.COMPLETE) {
      showConfetti()
    }
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (puzzle) {
      setStatus(localStorage.getItem(String(BOARDS[puzzle.index].id)) ? Statuses.COMPLETE : Statuses.INITIAL)
    }
  }, [puzzle, size])

  const context = useMemo(
    () => ({
      aboutOpening,
      areNumbersVisible,
      from,
      goal,
      isKeyDown,
      keysOpening,
      mode,
      pathValues,
      puzzle: puzzle!,
      resetBoard,
      score,
      setFrom,
      setMode,
      setPathValues,
      setPuzzle,
      setSize,
      setValidCells,
      shareOpening,
      size,
      sizeOpening,
      status: status!,
      validCells
    }),
    [
      aboutOpening,
      areNumbersVisible,
      from,
      goal,
      isKeyDown,
      keysOpening,
      mode,
      pathValues,
      puzzle,
      resetBoard,
      score,
      setSize,
      shareOpening,
      size,
      sizeOpening,
      status,
      validCells
    ]
  )

  return <APP_CONTEXT.Provider value={context}>{children}</APP_CONTEXT.Provider>
}
