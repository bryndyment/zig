'use client'

import { ORANGE } from '@/util/const'
import { Box } from '@mui/material'
import { FC } from 'react'

// components

export const Zig: FC = () => (
  <Box
    sx={{
      color: ORANGE,
      fontFamily: 'bungee',
      fontSize: 25,
      fontWeight: 500,
      left: 18.5,
      position: 'absolute',
      textTransform: 'uppercase',
      top: 11
    }}
  >
    Zig!
  </Box>
)
