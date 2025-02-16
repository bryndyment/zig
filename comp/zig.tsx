'use client'

import { useAppContext } from '@/comp/appContext'
import { ORANGE } from '@/util/const'
import { Box, Link } from '@mui/material'
import RouterLink from 'next/link'
import { FC } from 'react'

// components

export const Zig: FC = () => {
  const { id } = useAppContext()

  const zig = (
    <Box sx={{ color: ORANGE, fontFamily: 'bungee', fontSize: 25, fontWeight: 500, left: 18.5, position: 'absolute', textTransform: 'uppercase', top: 11 }}>
      Zig!
    </Box>
  )

  return id ? (
    <Link component={RouterLink} href="/" sx={{ cursor: 'pointer' }}>
      {zig}
    </Link>
  ) : (
    zig
  )
}
