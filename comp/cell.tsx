'use client'

import { useAppContext } from '@/comp/appContext'
import { useMobileMediaQuery } from '@/hooks/mobileMediaQuery'
import { ANSWERS } from '@/util/answers'
import { BOARDS } from '@/util/boards'
import { AMBER, ORANGE, STOP_PROPAGATION } from '@/util/const'
import { Statuses } from '@/util/enum'
import { calcToCell, updateValidCells } from '@/util/func'
import { Box } from '@mui/material'
import { common } from '@mui/material/colors'
import { isEmpty } from 'lodash'
import { FC, useCallback, useMemo } from 'react'

// types

type _CellProps = { cell: number; index: number; isPending: boolean }

// constants

const BOX_SX = {
  alignItems: 'center',
  borderColor: common.white,
  borderStyle: 'solid',
  borderWidth: 0.5,
  color: 'transparent',
  display: 'flex',
  fontFamily: 'lucida grande',
  fontSize: [13, 16],
  fontWeight: 'bold',
  justifyContent: 'center',
  transition: 'background-color 0.5s, border-color 0.5s, color 0.5s',
  width: '100%'
} as const

// components

export const Cell: FC<_CellProps> = ({ cell, index, isPending }) => {
  const { areNumbersVisible, from, isKeyDown, pathValues, puzzle, setFrom, setPathValues, setValidCells, size, sizeOpening, status, validCells } =
    useAppContext()

  const isMobile = useMobileMediaQuery()

  const handleCorner = useCallback(() => {
    if (status !== Statuses.COMPLETE) {
      const corner = puzzle.corners.positions.get(index)

      if (corner && !pathValues.includes(cell)) {
        setFrom(corner)
        setPathValues([calcToCell(index, puzzle.index, size), cell])
        updateValidCells(index, corner, setValidCells, size)
      }
    }
  }, [cell, index, pathValues, puzzle, setFrom, setPathValues, setValidCells, size, status])

  const handlePath = useCallback(() => {
    if (status !== Statuses.COMPLETE) {
      if (!isEmpty(pathValues) && validCells.has(index) && pathValues[0] !== cell) {
        setPathValues([...pathValues, cell])
        updateValidCells(index, from!, setValidCells, size)
      } else if (!isEmpty(pathValues) && [...pathValues.slice(1)].includes(cell)) {
        setPathValues(pathValues.slice(0, pathValues.findIndex(number => number === cell) + 1))
        updateValidCells(index, from!, setValidCells, size)
      } else if (isEmpty(pathValues) || isMobile) {
        handleCorner()
      }
    }
  }, [cell, from, handleCorner, index, isMobile, pathValues, setPathValues, setValidCells, size, status, validCells])

  const bgcolor = useMemo(
    () => ((status === Statuses.COMPLETE ? ANSWERS[puzzle.index] : isEmpty(pathValues) ? puzzle.corners.values : pathValues).includes(cell) ? ORANGE : AMBER),
    [cell, pathValues, puzzle, status]
  )

  const opacity = useMemo(
    () => (cell / BOARDS[puzzle.index].values.length) * (bgcolor === ORANGE ? 0.5 : 0.8) + (bgcolor === ORANGE ? 0.5 : 0.2),
    [bgcolor, cell, puzzle]
  )

  return (
    <Box onClick={STOP_PROPAGATION} onMouseOver={isMobile ? undefined : handlePath} sx={{ display: 'flex', width: `${100 / size}%` }}>
      <Box
        onClick={isMobile ? handlePath : handleCorner}
        sx={{
          ...BOX_SX,
          ...(status !== Statuses.COMPLETE && (validCells.has(index) || pathValues.includes(cell)) && { cursor: 'pointer' }),
          ...(status === Statuses.COMPLETE && { borderColor: bgcolor }),
          ...(areNumbersVisible && { color: common.white }),
          ...((isKeyDown || sizeOpening.isOpen) && { transition: 'none' }),
          bgcolor,
          opacity: isPending ? 0 : opacity
        }}
      >
        {cell}
      </Box>
    </Box>
  )
}
