import { ANSWERS, BOARDS } from '../const'
import { Box, Grid, Paper } from '@mui/material'
import { Dispatch, FC, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { isEmpty } from 'lodash'
import { useMobileMediaQuery } from '../hooks/mobileMediaQuery'

// types

interface CellProps {
  cell: number
  index: number
}

interface ContextInterface {
  areNumbersHidden: boolean
  isAnswerVisible: boolean
  origin: Origin | null
  path: number[]
  score: number
  setOrigin: Dispatch<SetStateAction<Origin | null>>
  setPath: Dispatch<SetStateAction<number[]>>
  setValidIndices: Dispatch<SetStateAction<ValidIndices>>
  validIndices: ValidIndices
}

type Origin = Origins

type ValidIndices = Set<number>

// enums

enum Origins {
  BOTTOM_LEFT = 1,
  BOTTOM_RIGHT,
  TOP_LEFT,
  TOP_RIGHT
}

// constants

const RANDOM = Number(new Date().toLocaleString('sv').slice(0, 10).replace(/\D/g, '')) - 20220307

const ANSWER = ANSWERS[RANDOM]

const BOARD = BOARDS[RANDOM]

const GOAL = ANSWER.reduce((accumulator, cell) => accumulator + cell, 0)

const SIZE = Math.sqrt(BOARD.length)

const SIZE_SQUARED = SIZE ** 2

const FOUR_CORNERS = new Map([
  [0, Origins.TOP_LEFT],
  [SIZE - 1, Origins.TOP_RIGHT],
  [SIZE_SQUARED - SIZE, Origins.BOTTOM_LEFT],
  [SIZE_SQUARED - 1, Origins.BOTTOM_RIGHT]
])

const ORANGE = '#ff5c00'

const YELLOW = '#ffbc00'

// context

const Context = createContext<ContextInterface | null>(null)

// styles

const styles = {
  cell: {
    alignItems: 'center',
    borderRadius: '43%',
    color: '#fff',
    display: 'flex',
    fontSize: [13, 16],
    fontWeight: 'bold',
    justifyContent: 'center',
    transition: 'background-color 150ms, color 150ms',
    width: '100%'
  },
  cellWrapper: {
    display: 'flex',
    width: `${100 / SIZE}%`
  },
  paper: {
    boxSizing: ['content-box', 'border-box'],
    display: 'flex',
    flexWrap: 'wrap',
    height: ['100vw', 660],
    position: 'relative',
    px: [1, 10],
    py: [5, 10],
    userSelect: 'none',
    width: ['auto', 660]
  }
} as any

// functions

const updateValidIndices = (index: number, origin: Origin, setValidIndices: Dispatch<SetStateAction<ValidIndices>>) => {
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

// hooks

const useLocalContext = () => {
  const context = useContext(Context)

  if (context === null) {
    throw new Error()
  }

  return context
}

// components

const Cell: FC<CellProps> = ({ cell, index }) => {
  const { areNumbersHidden, isAnswerVisible, origin, path, setOrigin, setPath, setValidIndices, validIndices } = useLocalContext()

  const handleMouseDown = () => {
    const origin = FOUR_CORNERS.get(index)

    if (origin) {
      setOrigin(origin)

      setPath([cell])

      updateValidIndices(index, origin, setValidIndices)
    }
  }

  const handleMouseOver = () => {
    if (isEmpty(path)) {
      handleMouseDown()
    } else if (validIndices.has(index)) {
      setPath([...path, cell])

      updateValidIndices(index, origin!, setValidIndices)
    } else if (path.includes(cell)) {
      setPath(path.slice(0, path.findIndex(number => number === cell) + 1))

      updateValidIndices(index, origin!, setValidIndices)
    }
  }

  return (
    <Box onMouseDown={event => event.stopPropagation()} onMouseOver={handleMouseOver} sx={styles.cellWrapper}>
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          ...styles.cell,
          ...{ backgroundColor: isAnswerVisible ? (ANSWER.includes(cell) ? ORANGE : YELLOW) : path.includes(cell) ? ORANGE : YELLOW },
          ...(areNumbersHidden && { color: 'transparent' }),
          ...(!isAnswerVisible && validIndices.has(index) && { cursor: 'pointer' }),
          opacity: (cell / BOARD.length) * 0.75 + 0.25
        }}
      >
        {cell}
      </Box>
    </Box>
  )
}

const Goal: FC = () => {
  const { score } = useLocalContext()

  return <Box sx={{ bottom: 8, color: GOAL === score ? ORANGE : YELLOW, fontWeight: 'bold', position: 'absolute', right: 12 }}>{GOAL}</Box>
}

const Score: FC = () => {
  const { score } = useLocalContext()

  return <Box sx={{ bottom: 8, color: ORANGE, fontWeight: 'bold', left: 12, position: 'absolute' }}>{score}</Box>
}

// exports

export const Zig: FC = () => {
  const isMobile = useMobileMediaQuery()

  const [areNumbersHidden, setAreNumbersHidden] = useState(false)

  const [isAnswerVisible, setIsAnswerVisible] = useState(false)

  const [origin, setOrigin] = useState<Origin | null>(null)

  const [path, setPath] = useState<number[]>([])

  const [validIndices, setValidIndices] = useState<ValidIndices>(new Set())

  const score = useMemo(() => path.reduce((accumulator, cell) => accumulator + cell, 0), [path])

  const context = useMemo(
    () => ({ areNumbersHidden, isAnswerVisible, origin, path, score, setOrigin, setPath, setValidIndices, validIndices }),
    [areNumbersHidden, isAnswerVisible, origin, path, score, validIndices]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyC') {
        setAreNumbersHidden(areNumbersHidden => !areNumbersHidden)
      } else if (event.code === 'KeyA') {
        setIsAnswerVisible(isAnswerVisible => !isAnswerVisible)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

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
