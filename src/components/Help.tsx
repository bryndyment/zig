import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE } from '../const'

// exports

export const Help: FC = () => (
  <Box
    sx={{
      '-webkit-text-stroke': '2px #fff',
      color: ORANGE,
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: -3,
      position: 'absolute',
      right: 20,
      textTransform: 'uppercase',
      top: 10
    }}
  >
    Help
  </Box>
)
