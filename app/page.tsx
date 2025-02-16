'use client'

import { useAppContext } from '@/comp/appContext'
import { Cell } from '@/comp/cell'
import { Goal } from '@/comp/goal'
import { Menu } from '@/comp/menu'
import { Score } from '@/comp/score'
import { Zig } from '@/comp/zig'
import { useMobileMediaQuery } from '@/hooks/mobileMediaQuery'
import { BOARDS } from '@/util/boards'
import { STOP_PROPAGATION } from '@/util/const'
import { getPuzzle } from '@/util/func'
import { Box, Paper } from '@mui/material'
import { FC, useEffect } from 'react'

// types

type _HomePageProps = { id?: number }

// constants

const BOARD_SX = { display: 'flex', flexWrap: 'wrap', height: ['100vw', 500], overflow: 'hidden', width: ['auto', 500] } as const
const PAPER_SX = { p: [0, 8], transition: 'border-radius 0.5s 1s', userSelect: 'none' } as const

// components

const HomePage: FC<_HomePageProps> = ({ id }) => {
  const { puzzle, resetBoard, setId, setPathValues, setPuzzle, setSize, size, status } = useAppContext()
  const isMobile = useMobileMediaQuery()

  useEffect(() => setId(id), [id, setId])

  useEffect(() => {
    if (!id && size) {
      localStorage.setItem('size', String(size))

      setPathValues([])
      setPuzzle(getPuzzle({ size }))
    }
  }, [id, setPathValues, setPuzzle, size])

  useEffect(() => {
    if (id) {
      const index = BOARDS.findIndex(board => board.id === id)

      setPathValues([])
      setPuzzle(getPuzzle({ index }))
      setSize(Math.sqrt(BOARDS[index].values.length))
    }
  }, [id, setPathValues, setPuzzle, setSize])

  if (!puzzle || !size || !status) return null

  return (
    <Box onClick={resetBoard} sx={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center' }}>
      <Paper elevation={isMobile ? 0 : 3} onClick={STOP_PROPAGATION} square={isMobile} sx={PAPER_SX}>
        <Box sx={BOARD_SX}>
          {BOARDS[puzzle.index].values.map((cell, index) => (
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
