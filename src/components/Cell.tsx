import { ANSWERS, BOARDS, DESTINATION, ORANGE, YELLOW } from '../const'
import { Box } from '@mui/material'
import { CellProps } from '../type'
import { FC } from 'react'
import { Statuses } from '../enum'
import { calcToCell, updateValidCells } from '../func'
import { isEmpty } from 'lodash'
import { useContext } from '../hooks/context'
import { useMobileMediaQuery } from '../hooks/mobileMediaQuery'

// styles

const styles = {
  cell: {
    alignItems: 'center',
    color: 'transparent',
    display: 'flex',
    fontFamily: 'lucida grande',
    fontSize: [13, 16],
    fontWeight: 'bold',
    justifyContent: 'center',
    transition: 'background-color 0.5s, border-radius 0.7s 0.1s, color 0.5s, opacity 0.5s',
    width: '100%'
  },
  cellWrapper: { display: 'flex' }
} as any

// exports

export const Cell: FC<CellProps> = ({ cell, index }) => {
  const { areNumbersVisible, cornerIndices, corners, from, path, puzzleIndex, setFrom, setPath, setTo, setValidCells, size, status, validCells } = useContext()

  const isMobile = useMobileMediaQuery()

  const handleCorner = () => {
    if (status !== Statuses.COMPLETE) {
      const corner = corners.get(index)

      if (corner && !path.includes(cell)) {
        setFrom(corner)

        setTo(DESTINATION.get(corner)!)

        setPath([calcToCell(index, puzzleIndex, size), cell])

        updateValidCells(index, corner, setValidCells, size)
      }
    }
  }

  const handlePath = () => {
    if (status !== Statuses.COMPLETE) {
      if (validCells.has(index) && path[0] !== cell) {
        setPath([...path, cell])

        updateValidCells(index, from!, setValidCells, size)
      } else if ([...path.slice(1)].includes(cell)) {
        setPath(path.slice(0, path.findIndex(number => number === cell) + 1))

        updateValidCells(index, from!, setValidCells, size)
      } else if (isEmpty(path) || isMobile) {
        handleCorner()
      }
    }
  }

  const backgroundColor = (status === Statuses.COMPLETE ? ANSWERS[puzzleIndex] : isEmpty(path) ? cornerIndices : path).includes(cell) ? ORANGE : YELLOW
  const opacity = (cell / BOARDS[puzzleIndex].length) * (backgroundColor === ORANGE ? 0.5 : 0.8) + (backgroundColor === ORANGE ? 0.5 : 0.2)

  return (
    <Box onClick={event => event.stopPropagation()} onMouseOver={isMobile ? undefined : handlePath} sx={{ ...styles.cellWrapper, width: `${100 / size}%` }}>
      <Box
        onClick={isMobile ? handlePath : handleCorner}
        sx={{
          ...styles.cell,
          ...(status !== Statuses.COMPLETE && (validCells.has(index) || path.includes(cell)) && { cursor: 'pointer' }),
          ...(status !== Statuses.COMPLETE && { borderRadius: '35%' }),
          ...(areNumbersVisible && { color: '#fff' }),
          backgroundColor,
          opacity
        }}
      >
        {cell}
      </Box>
    </Box>
  )
}
