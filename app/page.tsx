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
import { getPuzzle, getPuzzleIndex } from '@/util/func'
import { Box, Paper } from '@mui/material'
import { FC, useEffect, useState, useTransition } from 'react'

// types

type _HomePageProps = { id?: false | number }

// constants

const BOARD_SX = { display: 'flex', flexWrap: 'wrap', height: ['100vw', 500], overflow: 'hidden', width: ['auto', 500] } as const
const PAPER_SX = { p: [0, 8], transition: 'border-radius 0.5s 1s', userSelect: 'none' } as const

// components

const HomePage: FC<_HomePageProps> = ({ id }) => {
  const { puzzle, resetBoard, setId, setPathValues, setPuzzle, setSize, size } = useAppContext()
  const isMobile = useMobileMediaQuery()
  const [outgoingPuzzleIndex, setOutgoingPuzzleIndex] = useState(puzzle.index)
  const [isPending, startTransition] = useTransition()

  useEffect(() => setId(id || false), [id, setId])

  useEffect(() => {
    if (id === false && size) {
      localStorage.setItem('size', String(size))

      startTransition(() => {
        setOutgoingPuzzleIndex(getPuzzleIndex(size))
        setPathValues([])
        setPuzzle(getPuzzle({ size }))
      })
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

  return (
    <Box onClick={resetBoard} sx={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center' }}>
      <Paper elevation={isMobile ? 0 : 3} onClick={STOP_PROPAGATION} square={isMobile} sx={PAPER_SX}>
        <Box sx={BOARD_SX}>
          {BOARDS[isPending ? outgoingPuzzleIndex : puzzle.index].values.map((cell, index) => (
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
