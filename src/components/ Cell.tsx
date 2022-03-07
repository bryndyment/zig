import { ANSWER, BACKDROP, BOARD, CORNERS, GOAL, ORANGE, YELLOW } from '../const'
import { Box, keyframes } from '@mui/material'
import { CellProps } from '../type'
import { FC } from 'react'
import { isEmpty } from 'lodash'
import { styles } from '../style'
import { updateValidIndices } from '../function'
import { useContext } from '../hooks/context'

// exports

export const Cell: FC<CellProps> = ({ cell, index }) => {
  const { areNumbersHidden, isAnswerVisible, origin, path, score, setOrigin, setPath, setValidIndices, validIndices } = useContext()

  const handleMouseDown = () => {
    const origin = CORNERS.get(index)

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

  const SEQUENCE = BACKDROP.findIndex(backdrop => backdrop === cell)

  const animation = keyframes`
  0% {
    opacity: 0.2
  }
  100% {
    opacity: 0.8
  }
  `

  return (
    <Box onMouseDown={event => event.stopPropagation()} onMouseOver={handleMouseOver} sx={styles.cellWrapper}>
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          ...styles.cell,
          ...{ backgroundColor: isAnswerVisible ? (ANSWER.includes(cell) ? ORANGE : YELLOW) : path.includes(cell) ? ORANGE : YELLOW },
          ...(areNumbersHidden && { color: 'transparent' }),
          ...(!isAnswerVisible && validIndices.has(index) && { cursor: 'pointer' }),
          ...(!path.includes(cell) && score === GOAL && { animation: `${animation} 1s ${SEQUENCE / 5}s infinite alternate` }),
          opacity: (cell / BOARD.length) * 0.75 + 0.25
        }}
      >
        {cell}
      </Box>
    </Box>
  )
}
