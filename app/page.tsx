'use client'

import { useAppContext } from '@/comp/appContext'
import { Cell } from '@/comp/cell'
import { Goal } from '@/comp/goal'
import { Menu } from '@/comp/menu'
import { Score } from '@/comp/score'
import { Zig } from '@/comp/zig'
import { useMobileMediaQuery } from '@/hooks/mobileMediaQuery'
import { BOARDS, STOP_PROPAGATION } from '@/util/const'
import { calcCornerIndices, calcCorners, calcPuzzleIndex } from '@/util/func'
import { Box, Paper } from '@mui/material'
import { FC, useEffect } from 'react'

// constants

const BOX_SX = { display: 'flex', flexWrap: 'wrap', height: ['calc(100vw - 16px)', 500], overflow: 'hidden', width: ['auto', 500] } as const
const PAPER_SX = { p: [1, 8], transition: 'border-radius 0.5s 1s', userSelect: 'none' } as const

// hooks

const usePrefs = () => {
  const { isClient, setCornerIndices, setCorners, setPath, setPuzzleIndex, size } = useAppContext()

  useEffect(() => {
    if (isClient) localStorage.setItem('size', String(size))

    const puzzleIndex = calcPuzzleIndex(size)

    setCornerIndices(calcCornerIndices(puzzleIndex, size))
    setCorners(calcCorners(size))
    setPath([])
    setPuzzleIndex(puzzleIndex)
  }, [isClient, setCornerIndices, setCorners, setPath, setPuzzleIndex, size])
}

// components

const HomePage: FC = () => {
  const { puzzleIndex, setPath } = useAppContext()
  const isMobile = useMobileMediaQuery()
  usePrefs()

  return (
    <Box onClick={() => setPath([])} sx={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center' }}>
      <Paper elevation={3} onClick={STOP_PROPAGATION} square={isMobile} sx={PAPER_SX}>
        <Box sx={BOX_SX}>
          {BOARDS[puzzleIndex].map((cell, index) => (
            <Cell cell={cell} index={index} key={cell} />
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
