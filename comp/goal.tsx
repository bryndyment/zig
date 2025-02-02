'use client'

import { useAppContext } from '@/comp/appContext'
import { ORANGE } from '@/util/const'
import { Box } from '@mui/material'
import { FC } from 'react'

// constants

const BOX_SX = { bottom: 9.5, color: ORANGE, fontFamily: 'bungee', fontSize: 25, fontWeight: 500, position: 'absolute', right: 18.5 } as const

// components

export const Goal: FC = () => {
  const { goal } = useAppContext()

  return <Box sx={BOX_SX}>{goal}</Box>
}
