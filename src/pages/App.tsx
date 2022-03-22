import { BOARD, GOAL, TODAY } from '../const'
import { Box, Grid, Paper } from '@mui/material'
import { Cell } from '../components/Cell'
import { Context } from '../context'
import { FC, useEffect, useMemo, useState } from 'react'
import { Goal } from '../components/Goal'
import { MenuButton } from '../components/MenuButton'
import { Origin, ValidCells } from '../type'
import { Score } from '../components/Score'
import { Zig } from '../components/Zig'
import { getDay, gtag, showConfetti } from '../function'
import { useConstructor } from '../hooks/constructor'
import { useContext } from '../hooks/context'

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
  const { color } = useContext()

  useEffect(() => {
    document.querySelector('html')!.style.filter = `grayscale(${(100 - color) / 100})`

    localStorage.setItem('color', String(color))
  }, [color])

  return null
}

export const App: FC = () => {
  const [areNumbersVisible, setAreNumbersVisible] = useState(true)
  const [color, setColor] = useState('color' in localStorage ? Number(localStorage.getItem('color')) : 100)
  const [day] = useState(getDay)
  const [isAnswerVisible] = useState(false)
  const [origin, setOrigin] = useState<Origin | null>(null)
  const [path, setPath] = useState<number[]>([])
  const [validCells, setValidCells] = useState<ValidCells>(new Set())

  useConstructor(() => setInterval(() => getDay() !== day && location.reload(), 1000))

  const score = useMemo(() => path.reduce((accumulator, cell) => accumulator + cell, 0), [path])
  const isPuzzleSolved = useMemo(() => score === GOAL, [score])

  const context = useMemo(
    () => ({ areNumbersVisible, color, isAnswerVisible, isPuzzleSolved, origin, path, score, setColor, setOrigin, setPath, setValidCells, validCells }),
    [areNumbersVisible, color, isAnswerVisible, isPuzzleSolved, origin, path, score, validCells]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyC') {
        setAreNumbersVisible(areNumbersVisible => !areNumbersVisible)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isPuzzleSolved])

  useEffect(() => {
    if (score === GOAL) {
      if (!localStorage.getItem(TODAY)) {
        gtag(TODAY, { event_category: 'general' })

        localStorage.setItem(TODAY, '✓')
      }
    }
  }, [score])

  useEffect(() => {
    if (isPuzzleSolved) {
      showConfetti()
    }
  }, [isPuzzleSolved])

  return (
    <Context.Provider value={context}>
      <Prefs />

      <Grid container height="100%" justifyContent="center" onClick={() => setPath([])}>
        <Grid alignItems="center" display="flex" item justifyContent="center" xs={12}>
          <Paper elevation={3} onClick={event => event.stopPropagation()} sx={styles.paper}>
            <Box sx={styles.board}>
              {BOARD.map((cell, index) => (
                <Cell cell={cell} index={index} key={cell} />
              ))}
            </Box>

            <Goal />

            <MenuButton />

            <Score />

            <Zig />
          </Paper>
        </Grid>
      </Grid>
    </Context.Provider>
  )
}
