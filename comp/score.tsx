'use client'

import { useAppContext } from '@/comp/appContext'
import { ORANGE } from '@/util/const'
import { Statuses } from '@/util/enum'
import { Box } from '@mui/material'
import { FC } from 'react'

// constants

const BOX_SX = { bottom: 9.5, color: ORANGE, fontFamily: 'bungee', fontSize: 25, fontWeight: 500, left: 19, position: 'absolute' } as const

// components

export const Score: FC = () => {
  const { goal, score, status } = useAppContext()

  return <Box sx={BOX_SX}>{status === Statuses.COMPLETE ? goal : score}</Box>
}
