import { ANSWERS, BOARDS, TODAY } from '../const'
import { Analytics } from '@vercel/analytics/react'
import { Box, Grid, Paper } from '@mui/material'
import { Cell } from '../components/Cell'
import { Context } from '../context'
import { Corner, ValidCells } from '../type'
import { FC, useEffect, useMemo, useState } from 'react'
import { Goal } from '../components/Goal'
import { Menu } from '../components/Menu'
import { Score } from '../components/Score'
import { Statuses } from '../enum'
import { Zig } from '../components/Zig'
import { calcCornerIndices, calcCorners, calcPuzzleIndex, getDay, gtag, showConfetti } from '../func'
import { useConstructor } from '../hooks/constructor'
import { useContext } from '../hooks/context'
import { useMobileMediaQuery } from '../hooks/mobileMediaQuery'
import { useOpening } from '../hooks/opening'

// styles

const styles = {
  board: {
    display: 'flex',
    flexWrap: 'wrap',
    height: ['calc(100vw - 16px)', 500],
    overflow: 'hidden',
    width: ['auto', 500]
  },
  paper: {
    p: [1, 8],
    transition: 'border-radius 0.5s 1s',
    userSelect: 'none'
  }
} as any

// components

const Prefs: FC = () => {
  const { color, setCornerIndices, setCorners, setPath, setPuzzleIndex, size } = useContext()

  useEffect(() => {
    document.querySelector('html')!.style.filter = `grayscale(${(100 - color) / 100})`

    localStorage.setItem('color', String(color))
  }, [color])

  useEffect(() => {
    localStorage.setItem('size', String(size))

    const puzzleIndex = calcPuzzleIndex(size)

    setCornerIndices(calcCornerIndices(puzzleIndex, size))
    setCorners(calcCorners(size))
    setPath([])
    setPuzzleIndex(puzzleIndex)
  }, [setCornerIndices, setCorners, setPath, setPuzzleIndex, size])

  return null
}

export const App: FC = () => {
  const isMobile = useMobileMediaQuery()
  const prefsOpening = useOpening()

  const [areNumbersVisible, setAreNumbersVisible] = useState(true)
  const [color, setColor] = useState('color' in localStorage ? Number(localStorage.getItem('color')) : 100)
  const [day] = useState(getDay)
  const [from, setFrom] = useState<Corner | null>(null)
  const [isKeyDown, setIsKeyDown] = useState(false)
  const [path, setPath] = useState<number[]>([])
  const [size, setSize] = useState('size' in localStorage ? Number(localStorage.getItem('size')) : 6)
  const [status, setStatus] = useState(localStorage.getItem(`${TODAY}_${String(size)}`) ? Statuses.COMPLETE : Statuses.INITIAL)
  const [to, setTo] = useState<Corner | null>(null)
  const [validCells, setValidCells] = useState<ValidCells>(new Set())

  const [puzzleIndex, setPuzzleIndex] = useState(calcPuzzleIndex(size))
  const [corners, setCorners] = useState(calcCorners(size))

  const [cornerIndices, setCornerIndices] = useState(calcCornerIndices(puzzleIndex, size))

  const goal = useMemo(() => ANSWERS[puzzleIndex].reduce((accumulator, cell) => accumulator + cell, 0), [puzzleIndex])
  const score = useMemo(() => path.reduce((accumulator, cell) => accumulator + cell, 0), [path])

  useConstructor(() => setInterval(() => getDay() !== day && location.reload(), 1000))

  const context = useMemo(
    () => ({
      areNumbersVisible,
      color,
      cornerIndices,
      corners,
      from,
      goal,
      isKeyDown,
      path,
      prefsOpening,
      puzzleIndex,
      score,
      setColor,
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
    [areNumbersVisible, color, cornerIndices, corners, from, goal, isKeyDown, path, prefsOpening, puzzleIndex, score, size, status, to, validCells]
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

      localStorage.setItem(key, value)

      gtag(key, { value })
    }
  }, [goal, score]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isKeyDown && !prefsOpening.isOpen && status === Statuses.COMPLETE) {
      showConfetti()
    }
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => setStatus(localStorage.getItem(`${TODAY}_${String(size)}`) ? Statuses.COMPLETE : Statuses.INITIAL), [size])

  return (
    <Context.Provider value={context}>
      <Prefs />

      <Grid container height="100%" justifyContent="center" onClick={() => setPath([])}>
        <Grid alignItems="center" display="flex" item justifyContent="center" xs={12}>
          <Paper elevation={3} onClick={event => event.stopPropagation()} square={isMobile} sx={styles.paper}>
            <Box sx={styles.board}>
              {BOARDS[puzzleIndex].map((cell, index) => (
                <Cell cell={cell} index={index} key={cell} />
              ))}
            </Box>

            <Goal />

            <Menu prefsOpening={prefsOpening} />

            <Score />

            <Zig />
          </Paper>
        </Grid>
      </Grid>

      <Analytics />
    </Context.Provider>
  )
}
