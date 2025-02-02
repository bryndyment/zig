'use client'

import { useAppContext } from '@/comp/appContext'
import { useMobileMediaQuery } from '@/hooks/mobileMediaQuery'
import { AMBER, ANSWERS, BOARDS, DESTINATION, ORANGE, STOP_PROPAGATION } from '@/util/const'
import { Statuses } from '@/util/enum'
import { calcToCell, updateValidCells } from '@/util/func'
import { Box } from '@mui/material'
import { common } from '@mui/material/colors'
import { isEmpty } from 'lodash'
import { FC, useCallback, useMemo } from 'react'

// types

type _CellProps = { cell: number; index: number }

// constants

const BOX_SX = {
  alignItems: 'center',
  color: 'transparent',
  display: 'flex',
  fontFamily: 'lucida grande',
  fontSize: [13, 16],
  fontWeight: 'bold',
  justifyContent: 'center',
  transition: 'background-color 0.5s, border-radius 0.7s 0.1s, color 0.5s, opacity 0.5s',
  width: '100%'
} as const

// components

export const Cell: FC<_CellProps> = ({ cell, index }) => {
  const {
    areNumbersVisible,
    cornerIndices,
    corners,
    from,
    isKeyDown,
    path,
    prefsOpening,
    puzzleIndex,
    setFrom,
    setPath,
    setTo,
    setValidCells,
    size,
    status,
    validCells
  } = useAppContext()

  const isMobile = useMobileMediaQuery()

  const handleCorner = useCallback(() => {
    if (status !== Statuses.COMPLETE) {
      const corner = corners.get(index)

      if (corner && !path.includes(cell)) {
        setFrom(corner)
        setTo(DESTINATION.get(corner)!)
        setPath([calcToCell(index, puzzleIndex, size), cell])
        updateValidCells(index, corner, setValidCells, size)
      }
    }
  }, [cell, corners, index, path, puzzleIndex, setFrom, setPath, setTo, setValidCells, size, status])

  const handlePath = useCallback(() => {
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
  }, [cell, from, handleCorner, index, isMobile, path, setPath, setValidCells, size, status, validCells])

  const bgcolor = useMemo(
    () => ((status === Statuses.COMPLETE ? ANSWERS[puzzleIndex] : isEmpty(path) ? cornerIndices : path).includes(cell) ? ORANGE : AMBER),
    [cell, cornerIndices, path, puzzleIndex, status]
  )

  const opacity = useMemo(
    () => (cell / BOARDS[puzzleIndex].length) * (bgcolor === ORANGE ? 0.5 : 0.8) + (bgcolor === ORANGE ? 0.5 : 0.2),
    [bgcolor, cell, puzzleIndex]
  )

  return (
    <Box onClick={STOP_PROPAGATION} onMouseOver={isMobile ? undefined : handlePath} sx={{ display: 'flex', width: `${100 / size}%` }}>
      <Box
        onClick={isMobile ? handlePath : handleCorner}
        sx={{
          ...BOX_SX,
          ...(status !== Statuses.COMPLETE && (validCells.has(index) || path.includes(cell)) && { cursor: 'pointer' }),
          ...(status !== Statuses.COMPLETE && { borderRadius: '35%' }),
          ...(areNumbersVisible && { color: common.white }),
          ...((isKeyDown || prefsOpening.isOpen) && { transition: 'none' }),
          bgcolor,
          opacity
        }}
      >
        {cell}
      </Box>
    </Box>
  )
}
