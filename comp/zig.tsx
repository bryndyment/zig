'use client'

import { useAppContext } from '@/comp/appContext'
import { ORANGE } from '@/util/const'
import { Modes } from '@/util/enum'
import { Box, Link } from '@mui/material'
import RouterLink from 'next/link'
import { FC, useCallback } from 'react'

// components

export const Zig: FC = () => {
  const { aboutOpening, mode } = useAppContext()

  const handleClick = useCallback(() => aboutOpening.open(), [aboutOpening])

  const zig = (
    <Box sx={{ color: ORANGE, fontFamily: 'bungee', fontSize: 25, fontWeight: 500, left: 18.5, position: 'absolute', textTransform: 'uppercase', top: 11 }}>
      Zig!
    </Box>
  )

  return mode === Modes.SHARED ? (
    <Link component={RouterLink} href="/">
      {zig}
    </Link>
  ) : (
    <Link onClick={handleClick} sx={{ cursor: 'pointer' }}>
      {zig}
    </Link>
  )
}
