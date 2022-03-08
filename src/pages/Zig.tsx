import { BOARD, GOAL, RANDOM, TODAY } from '../const'
import { Box, Grid, Paper } from '@mui/material'
import { Cell } from '../components/Cell'
import { Context } from '../context'
import { FC, useEffect, useMemo, useState } from 'react'
import { Goal } from '../components/Goal'
import { Origin, ValidIndices } from '../type'
import { Score } from '../components/Score'
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
    position: 'relative',
    px: [1, 8],
    py: [5, 8],
    transition: 'border-radius 500ms 1s',
    userSelect: 'none'
  }
} as any

// exports

export const Zig: FC = () => {
  const isMobile = useMobileMediaQuery()

  const [areNumbersVisible, setAreNumbersVisible] = useState(true)

  const [day] = useState<number>(getDay)

  const [isAnswerVisible, setIsAnswerVisible] = useState(false)

  const [origin, setOrigin] = useState<Origin | null>(null)

  const [path, setPath] = useState<number[]>([])

  const [validIndices, setValidIndices] = useState<ValidIndices>(new Set())

  useConstructor(() => setInterval(() => getDay() !== day && location.reload(), 1000))

  const score = useMemo(() => path.reduce((accumulator, cell) => accumulator + cell, 0), [path])

  const isPuzzleSolved = useMemo(() => score === GOAL, [score])

  const context = useMemo(
    () => ({ areNumbersVisible, isAnswerVisible, isPuzzleSolved, origin, path, score, setOrigin, setPath, setValidIndices, validIndices }),
    [areNumbersVisible, isAnswerVisible, isPuzzleSolved, origin, path, score, validIndices]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPuzzleSolved) {
        if (event.code === 'KeyC') {
          setAreNumbersVisible(areNumbersVisible => !areNumbersVisible)
        } else if (event.code === 'KeyA') {
          setIsAnswerVisible(isAnswerVisible => !isAnswerVisible)
        }
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

  // useInterval(() => {
  //   if (getDay() !== day) {
  //     location.reload()
  //   }
  // }, 1000)

  return (
    <Context.Provider value={context}>
      <Grid container height="100%" justifyContent="center" onMouseDown={() => setPath([])}>
        <Grid alignItems="center" display="flex" item justifyContent="center" xs={12}>
          <Paper
            elevation={0}
            square={isMobile}
            sx={{
              ...styles.paper,
              ...(isPuzzleSolved && { borderRadius: '35%' })
            }}
          >
            <Box
              sx={{
                ...styles.board,
                ...(isPuzzleSolved && {
                  borderRadius: '35%',
                  transform: `rotate(${RANDOM * 90}deg)`,
                  transition: `border-radius 0.5s 1s, transform ${RANDOM * 0.5}s 2s`
                })
              }}
            >
              {BOARD.map((cell, index) => (
                <Cell cell={cell} index={index} key={cell} />
              ))}
            </Box>

            <Goal />

            <Score />
          </Paper>
        </Grid>
      </Grid>
    </Context.Provider>
  )
}
