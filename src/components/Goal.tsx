import { Box } from '@mui/material'
import { FC } from 'react'
import { GOAL, ORANGE, OUTLINE } from '../const'

// exports

export const Goal: FC = () => (
  <Box
    sx={{
      bottom: 11,
      color: ORANGE,
      fontSize: 24,
      fontWeight: 'bold',
      position: 'absolute',
      right: 19,
      textShadow: OUTLINE
    }}
  >
    {GOAL}
  </Box>
)
