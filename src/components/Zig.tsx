import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE, OUTLINE } from '../const'

// exports

export const Zig: FC = () => (
  <Box
    sx={{
      color: ORANGE,
      fontSize: 24,
      fontWeight: 'bold',
      left: 19,
      position: 'absolute',
      textShadow: OUTLINE,
      textTransform: 'uppercase',
      top: 12
    }}
  >
    Zig
  </Box>
)
