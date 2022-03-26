import { Box } from '@mui/material'
import { FC } from 'react'
import { RED } from '../const'

// exports

export const Zig: FC = () => (
  <Box
    sx={{
      color: RED,
      fontFamily: 'bungee',
      fontSize: 25,
      fontWeight: 500,
      position: 'absolute',
      right: 18.5,
      textTransform: 'uppercase',
      top: 11
    }}
  >
    Zig!
  </Box>
)
