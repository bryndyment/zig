import { Box, Grid, Paper } from '@mui/material'
import { Dispatch, FC, MouseEvent, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from 'react'
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

const ANSWER = [39, 91, 40, 86, 137, 52, 136, 93, 130, 103, 65, 81, 132, 72, 135, 124, 113, 106, 118, 134, 88, 120, 76]

const BOARD = [
  39, 91, 87, 104, 10, 13, 143, 83, 56, 31, 2, 108, 3, 40, 14, 64, 138, 28, 48, 63, 33, 101, 17, 96, 21, 86, 137, 52, 105, 110, 74, 18, 37, 8, 25, 11, 20, 55,
  6, 136, 43, 22, 123, 9, 79, 144, 84, 67, 85, 90, 34, 93, 44, 98, 114, 58, 12, 71, 16, 38, 29, 128, 59, 130, 69, 19, 24, 47, 102, 112, 78, 99, 126, 80, 119,
  103, 53, 68, 46, 95, 140, 26, 15, 142, 92, 62, 4, 65, 81, 42, 121, 1, 66, 131, 115, 30, 139, 97, 75, 77, 132, 72, 135, 107, 129, 49, 109, 73, 61, 54, 45, 122,
  41, 100, 124, 113, 106, 89, 7, 133, 141, 82, 57, 70, 94, 50, 35, 36, 118, 23, 125, 32, 51, 117, 127, 27, 60, 116, 5, 111, 134, 88, 120, 76
]

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
  box: {
    alignItems: 'center',
    backgroundColor: YELLOW,
    borderRadius: '43%',
    color: '#fff',
    display: 'flex',
    fontSize: [13, 16],
    fontWeight: 'bold',
    height: `${100 / SIZE}%`,
    justifyContent: 'center',
    transition: 'background-color 150ms, color 150ms',
    width: `${100 / SIZE}%`
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    height: ['100vw', 660],
    p: [1, 10],
    userSelect: 'none',
    width: ['100vw', 660]
  }
} as any

// functions

const getBottomLeftValidIndices = (index: number) => {
  const validIndices: ValidIndices = new Set()

  if (index + 1 > SIZE) {
    validIndices.add(index - SIZE)
  }

  if ((index + 1) % SIZE) {
    validIndices.add(index + 1)
  }

  return new Set(validIndices)
}

const getBottomRightValidIndices = (index: number) => {
  const validIndices: ValidIndices = new Set()

  if (index + 1 > SIZE) {
    validIndices.add(index - SIZE)
  }

  if (index % SIZE) {
    validIndices.add(index - 1)
  }

  return new Set(validIndices)
}

const getTopLeftValidIndices = (index: number) => {
  const validIndices: ValidIndices = new Set()

  if (index + SIZE < SIZE_SQUARED) {
    validIndices.add(index + SIZE)
  }

  if ((index + 1) % SIZE) {
    validIndices.add(index + 1)
  }

  return new Set(validIndices)
}

const getTopRightValidIndices = (index: number) => {
  const validIndices: ValidIndices = new Set()

  if (index + SIZE < SIZE_SQUARED) {
    validIndices.add(index + SIZE)
  }

  if (index % SIZE) {
    validIndices.add(index - 1)
  }

  return new Set(validIndices)
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

const Board: FC = () => (
  <>
    {BOARD.map((cell, index) => (
      <Cell cell={cell} index={index} key={cell} />
    ))}
  </>
)

const Cell: FC<CellProps> = ({ cell, index }) => {
  const { areNumbersHidden, isAnswerVisible, origin, path, setOrigin, setPath, setValidIndices, validIndices } = useLocalContext()

  const handleMouseDown = (event?: MouseEvent) => {
    const corner = FOUR_CORNERS.get(index)

    if (corner) {
      setOrigin(corner)

      setPath([cell])

      updateValidIndices(corner, index)
    }

    event?.stopPropagation()
  }

  const handleMouseOver = () => {
    if (isEmpty(path)) {
      handleMouseDown()
    } else if (validIndices.has(index)) {
      setPath([...path, cell])

      updateValidIndices(origin!, index)
    }
  }

  const updateValidIndices = (origin: Origin, index: number) => {
    switch (origin) {
      case Origins.TOP_LEFT:
        setValidIndices(getTopLeftValidIndices(index))
        break

      case Origins.TOP_RIGHT:
        setValidIndices(getTopRightValidIndices(index))
        break

      case Origins.BOTTOM_LEFT:
        setValidIndices(getBottomLeftValidIndices(index))
        break

      default:
        setValidIndices(getBottomRightValidIndices(index))
    }
  }

  return (
    <Box
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      sx={{
        ...styles.box,
        ...{ backgroundColor: isAnswerVisible ? (ANSWER.includes(cell) ? ORANGE : YELLOW) : path.includes(cell) ? ORANGE : YELLOW },
        ...(areNumbersHidden && { color: 'transparent' }),
        ...(!isAnswerVisible && validIndices.has(index) && { cursor: 'pointer' }),
        opacity: (cell / BOARD.length) * 0.75 + 0.25
      }}
    >
      {cell}
    </Box>
  )
}

// exports

export const Zig: FC = () => {
  const isMobile = useMobileMediaQuery()

  const [areNumbersHidden, setAreNumbersHidden] = useState(false)

  const [isAnswerVisible, setIsAnswerVisible] = useState(false)

  const [origin, setOrigin] = useState<Origin | null>(null)

  const [path, setPath] = useState<number[]>([])

  const [validIndices, setValidIndices] = useState<ValidIndices>(new Set())

  const context = useMemo(
    () => ({ areNumbersHidden, isAnswerVisible, origin, path, setOrigin, setPath, setValidIndices, validIndices }),
    [areNumbersHidden, isAnswerVisible, origin, path, validIndices]
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

  const handleMouseDown = (event: MouseEvent) => {
    setPath([])
  }

  return (
    <Context.Provider value={context}>
      <Grid container height="100%" justifyContent="center">
        <Grid alignItems="center" display="flex" item justifyContent="center" xs={12}>
          <Paper elevation={isMobile ? 0 : 1} onMouseDown={handleMouseDown} square={isMobile} sx={styles.paper}>
            <Board />
          </Paper>
        </Grid>
      </Grid>
    </Context.Provider>
  )
}
