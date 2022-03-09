import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE } from '../const'

// exports

export const Zig: FC = () => (
  <Box
    sx={{
      '-webkit-text-stroke': '2px #fff',
      color: ORANGE,
      fontSize: 32,
      fontWeight: 'bold',
      left: 20,
      letterSpacing: -3,
      position: 'absolute',
      textTransform: 'uppercase',
      top: 10
    }}
  >
    Zig
  </Box>
)
