import { ANSWER, BOARD, CORNERS, ORANGE, SIZE, YELLOW } from '../const'
import { Box } from '@mui/material'
import { CellProps } from '../type'
import { FC } from 'react'
import { isEmpty } from 'lodash'
import { updateValidIndices } from '../function'
import { useContext } from '../hooks/context'

// styles

const styles = {
  cell: {
    alignItems: 'center',
    color: 'transparent',
    display: 'flex',
    fontSize: [13, 16],
    fontWeight: 'bold',
    justifyContent: 'center',
    transition: 'background-color 0.5s, border-radius 0.5s, color 0.5s, opacity 0.5s',
    width: '100%'
  },
  cellWrapper: {
    display: 'flex',
    width: `${100 / SIZE}%`
  }
} as any

// exports

export const Cell: FC<CellProps> = ({ cell, index }) => {
  const { areNumbersVisible, isAnswerVisible, isPuzzleSolved, origin, path, setOrigin, setPath, setValidIndices, validIndices } = useContext()

  const handleMouseDown = () => {
    if (!isPuzzleSolved) {
      const origin = CORNERS.get(index)

      if (origin) {
        setOrigin(origin)

        setPath([cell])

        updateValidIndices(index, origin, setValidIndices)
      }
    }
  }

  const handleMouseOver = () => {
    if (!isPuzzleSolved) {
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
  }

  return (
    <Box onMouseDown={event => event.stopPropagation()} onMouseOver={handleMouseOver} sx={styles.cellWrapper}>
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          ...styles.cell,
          ...(!isAnswerVisible && validIndices.has(index) && { cursor: 'pointer' }),
          ...(!isPuzzleSolved && { borderRadius: '35%' }),
          ...(!isPuzzleSolved && areNumbersVisible && { color: '#fff' }),
          ...(isPuzzleSolved && areNumbersVisible && { transition: 'background-color 0.5s, border-radius 0.5s, color 0.5s 1s, opacity 0.5s' }),
          ...{ backgroundColor: isAnswerVisible ? (ANSWER.includes(cell) ? ORANGE : YELLOW) : path.includes(cell) ? ORANGE : YELLOW },
          opacity: (cell / BOARD.length) * 0.75 + 0.25
        }}
      >
        {cell}
      </Box>
    </Box>
  )
}
