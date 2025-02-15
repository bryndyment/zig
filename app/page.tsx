'use client'

import { useAppContext } from '@/comp/appContext'
import { Cell } from '@/comp/cell'
import { Goal } from '@/comp/goal'
import { Menu } from '@/comp/menu'
import { Score } from '@/comp/score'
import { Zig } from '@/comp/zig'
import { useMobileMediaQuery } from '@/hooks/mobileMediaQuery'
import { BOARDS, STOP_PROPAGATION } from '@/util/const'
import { calcCorners, calcPuzzleIndex, getCornerValues } from '@/util/func'
import { Box, Paper } from '@mui/material'
import { FC, useEffect, useState, useTransition } from 'react'

// constants

const BOARD_SX = { display: 'flex', flexWrap: 'wrap', height: ['100vw', 500], overflow: 'hidden', width: ['auto', 500] } as const
const PAPER_SX = { p: [0, 8], transition: 'border-radius 0.5s 1s', userSelect: 'none' } as const

// components

const HomePage: FC = () => {
  const { puzzleIndex, resetBoard, setCorners, setCornerValues, setPath, setPuzzleIndex, size } = useAppContext()
  const isMobile = useMobileMediaQuery()
  const [outgoingPuzzleIndex, setOutgoingPuzzleIndex] = useState(puzzleIndex)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (size) {
      localStorage.setItem('size', String(size))

      const newPuzzleIndex = calcPuzzleIndex(size)

      startTransition(() => {
        setCornerValues(getCornerValues(newPuzzleIndex, size))
        setCorners(calcCorners(size))
        setOutgoingPuzzleIndex(newPuzzleIndex)
        setPath([])
        setPuzzleIndex(newPuzzleIndex)
      })
    }
  }, [setCornerValues, setCorners, setPath, setPuzzleIndex, size])

  return (
    <Box onClick={resetBoard} sx={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center' }}>
      <Paper elevation={isMobile ? 0 : 3} onClick={STOP_PROPAGATION} square={isMobile} sx={PAPER_SX}>
        <Box sx={BOARD_SX}>
          {BOARDS[isPending ? outgoingPuzzleIndex : puzzleIndex].map((cell, index) => (
            <Cell cell={cell} index={index} isPending={isPending} key={cell} />
          ))}
        </Box>

        <Goal />
        <Menu />
        <Score />
        <Zig />
      </Paper>
    </Box>
  )
}

export default HomePage
