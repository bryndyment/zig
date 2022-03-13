import { BOARD, GOAL, TODAY } from '../const'
import { Box, Grid, Paper } from '@mui/material'
import { Cell } from '../components/Cell'
import { Context } from '../context'
import { FC, useEffect, useMemo, useState } from 'react'
import { Goal } from '../components/Goal'
import { Help } from '../components/Help'
import { Origin, ValidCells } from '../type'
import { Score } from '../components/Score'
import { Zig } from '../components/Zig'
import { getDay, gtag } from '../function'
import { useConstructor } from '../hooks/constructor'
import { useMobileMediaQuery } from '../hooks/mobileMediaQuery'

// styles

const styles = {
  board: {
    display: 'flex',
    flexWrap: 'wrap',
    height: ['100vw', 500],
    overflow: 'hidden',
    width: ['auto', 500]
  },
  paper: {
    boxSizing: ['content-box', 'border-box'],
    px: [1, 8],
    py: [5, 8],
    transition: 'border-radius 0.5s 1s',
    userSelect: 'none'
  }
} as any

// exports

export const App: FC = () => {
  const isMobile = useMobileMediaQuery()

  const [areNumbersVisible, setAreNumbersVisible] = useState(true)
  const [day] = useState(getDay)
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)
  const [origin, setOrigin] = useState<Origin | null>(null)
  const [path, setPath] = useState<number[]>([])
  const [validCells, setValidCells] = useState<ValidCells>(new Set())

  useConstructor(() => setInterval(() => getDay() !== day && location.reload(), 1000))

  const score = useMemo(() => path.reduce((accumulator, cell) => accumulator + cell, 0), [path])
  const isPuzzleSolved = useMemo(() => score === GOAL, [score])

  const context = useMemo(
    () => ({ areNumbersVisible, isAnswerVisible, isPuzzleSolved, origin, path, score, setOrigin, setPath, setValidCells, validCells }),
    [areNumbersVisible, isAnswerVisible, isPuzzleSolved, origin, path, score, validCells]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyC') {
        setAreNumbersVisible(areNumbersVisible => !areNumbersVisible)
      } else if (event.code === 'KeyA') {
        setIsAnswerVisible(isAnswerVisible => !isAnswerVisible)
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

  return (
    <Context.Provider value={context}>
      <Grid container height="100%" justifyContent="center" onMouseDown={() => setPath([])}>
        <Grid alignItems="center" display="flex" item justifyContent="center" xs={12}>
          <Paper
            elevation={3}
            square={isMobile}
            sx={{
              ...styles.paper
              // ...(isPuzzleSolved && { borderRadius: '35%' })
            }}
          >
            <Box
              sx={{
                ...styles.board
                // ...(isPuzzleSolved && {
                //   borderRadius: '35%',
                //   transform: `rotate(${RANDOM * 90}deg)`,
                //   transition: `border-radius 0.5s 1s, transform ${RANDOM * 0.5}s 2s`
                // })
              }}
            >
              {BOARD.map((cell, index) => (
                <Cell cell={cell} index={index} key={cell} />
              ))}
            </Box>

            <Goal />

            <Help />

            <Score />

            <Zig />
          </Paper>
        </Grid>
      </Grid>
    </Context.Provider>
  )
}
