import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE, OUTLINE } from '../const'

// exports

export const Help: FC = () => (
  <Box
    sx={{
      color: ORANGE,
      fontSize: 24,
      fontWeight: 'bold',
      position: 'absolute',
      right: 19,
      textShadow: OUTLINE,
      textTransform: 'uppercase',
      top: 12
    }}
  >
    Help
  </Box>
)
