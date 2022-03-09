import { Box } from '@mui/material'
import { FC } from 'react'
import { GOAL, ORANGE } from '../const'

// exports

export const Goal: FC = () => (
  <Box
    sx={{
      '-webkit-text-stroke': '2px #fff',
      bottom: 8,
      color: ORANGE,
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: -3,
      position: 'absolute',
      right: 20
    }}
  >
    {GOAL}
  </Box>
)
