import { ANSWER, BOARD, CORNERS, ORANGE, SIZE, YELLOW } from '../const'
import { Box } from '@mui/material'
import { CellProps, ValidCells } from '../type'
import { FC } from 'react'
import { isEmpty } from 'lodash'
import { updateValidCells } from '../function'
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
    transition: 'background-color 0.5s, border-radius 0.7s, color 0.5s, opacity 0.5s',
    width: '100%'
  },
  cellWrapper: {
    display: 'flex',
    width: `${100 / SIZE}%`
  }
} as any

// exports

export const Cell: FC<CellProps> = ({ cell, index }) => {
  const { areNumbersVisible, isAnswerVisible, isPuzzleSolved, origin, path, setOrigin, setPath, setValidCells, validCells } = useContext()

  let previousValidCells: ValidCells = new Set()

  const handleMouseDown = () => {
    if (!isPuzzleSolved) {
      if (!previousValidCells.has(index)) {
        const origin = CORNERS.get(index)

        if (origin) {
          setOrigin(origin)

          setPath([cell])

          updateValidCells(index, origin, setValidCells)
        }
      }
    }
  }

  const handleMouseOver = () => {
    if (!isPuzzleSolved) {
      if (isEmpty(path)) {
        handleMouseDown()
      } else if (validCells.has(index)) {
        setPath([...path, cell])

        previousValidCells = new Set(validCells)

        updateValidCells(index, origin!, setValidCells)
      } else if (path.includes(cell)) {
        setPath(path.slice(0, path.findIndex(number => number === cell) + 1))

        updateValidCells(index, origin!, setValidCells)
      }
    }
  }

  return (
    <Box onMouseDown={event => event.stopPropagation()} onMouseOver={handleMouseOver} sx={styles.cellWrapper}>
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          ...styles.cell,
          ...(!isAnswerVisible && validCells.has(index) && { cursor: 'pointer' }),
          ...(!isPuzzleSolved && { borderRadius: '35%' }),
          ...(areNumbersVisible && { color: '#fff' }),
          ...{ backgroundColor: isAnswerVisible ? (ANSWER.includes(cell) ? ORANGE : YELLOW) : path.includes(cell) ? ORANGE : YELLOW },
          opacity: (cell / BOARD.length) * 0.75 + 0.25
        }}
      >
        {cell}
      </Box>
    </Box>
  )
}
