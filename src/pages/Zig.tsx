import { BOARD, GOAL, TODAY } from '../const'
import { Cell } from '../components/Cell'
import { Context } from '../context'
import { FC, useEffect, useMemo, useState } from 'react'
import { Goal } from '../components/Goal'
import { Grid, Paper } from '@mui/material'
import { Origin, ValidIndices } from '../type'
import { Score } from '../components/Score'
import { gtag } from '../function'
import { styles } from '../style'
import { useMobileMediaQuery } from '../hooks/mobileMediaQuery'

// exports

export const Zig: FC = () => {
  const isMobile = useMobileMediaQuery()

  const [areNumbersVisible, setAreNumbersVisible] = useState(false)

  const [isAnswerVisible, setIsAnswerVisible] = useState(false)

  const [origin, setOrigin] = useState<Origin | null>(null)

  const [path, setPath] = useState<number[]>([])

  const [validIndices, setValidIndices] = useState<ValidIndices>(new Set())

  const score = useMemo(() => path.reduce((accumulator, cell) => accumulator + cell, 0), [path])

  const context = useMemo(
    () => ({ areNumbersVisible, isAnswerVisible, isPuzzleSolved: score === GOAL, origin, path, score, setOrigin, setPath, setValidIndices, validIndices }),
    [areNumbersVisible, isAnswerVisible, origin, path, score, validIndices]
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
  }, [])

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
          <Paper elevation={isMobile ? 0 : 1} square={isMobile} sx={styles.paper}>
            {BOARD.map((cell, index) => (
              <Cell cell={cell} index={index} key={cell} />
            ))}

            <Goal />

            <Score />
          </Paper>
        </Grid>
      </Grid>
    </Context.Provider>
  )
}
