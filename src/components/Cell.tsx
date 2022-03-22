import { ANSWER, BOARD, CORNERS, ORANGE, SIZE, YELLOW } from '../const'
import { Box } from '@mui/material'
import { CellProps } from '../type'
import { FC } from 'react'
import { isEmpty } from 'lodash'
import { updateValidCells } from '../function'
import { useContext } from '../hooks/context'
import { useMobileMediaQuery } from '../hooks/mobileMediaQuery'

// styles

const styles = {
  cell: {
    alignItems: 'center',
    color: 'transparent',
    display: 'flex',
    fontSize: [13, 16],
    fontWeight: 'bold',
    justifyContent: 'center',
    transition: 'background-color 0.5s, border-radius 0.7s 0.1s, color 0.5s, opacity 0.5s',
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

  const isMobile = useMobileMediaQuery()

  const handleCorner = () => {
    if (!isPuzzleSolved) {
      const origin = CORNERS.get(index)

      if (origin) {
        setOrigin(origin)

        setPath([cell])

        updateValidCells(index, origin, setValidCells)
      }
    }
  }

  const handlePath = () => {
    if (!isPuzzleSolved) {
      if (validCells.has(index)) {
        setPath([...path, cell])

        updateValidCells(index, origin!, setValidCells)
      } else if (path.includes(cell)) {
        setPath(path.slice(0, path.findIndex(number => number === cell) + 1))

        updateValidCells(index, origin!, setValidCells)
      } else if (isEmpty(path) || isMobile) {
        handleCorner()
      }
    }
  }

  return (
    <Box onClick={event => event.stopPropagation()} onMouseOver={isMobile ? undefined : handlePath} sx={styles.cellWrapper}>
      <Box
        onClick={isMobile ? handlePath : handleCorner}
        sx={{
          ...styles.cell,
          ...(!isAnswerVisible && (validCells.has(index) || path.includes(cell)) && { cursor: 'pointer' }),
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
