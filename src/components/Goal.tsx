import { Box } from '@mui/material'
import { FC } from 'react'
import { GOAL, ORANGE } from '../const'
import { useContext } from '../hooks/context'

// exports

export const Goal: FC = () => {
  const { areNumbersVisible, isPuzzleSolved } = useContext()

  return (
    <Box
      sx={{
        bottom: 8,
        color: ORANGE,
        fontWeight: 'bold',
        position: 'absolute',
        right: 12,
        transition: 'color 0.5s',
        ...(!areNumbersVisible && { color: 'transparent' }),
        ...(isPuzzleSolved && { color: 'transparent' })
      }}
    >
      {GOAL}
    </Box>
  )
}
