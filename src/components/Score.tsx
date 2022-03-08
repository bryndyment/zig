import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE } from '../const'
import { useContext } from '../hooks/context'

// exports

export const Score: FC = () => {
  const { areNumbersVisible, isPuzzleSolved, score } = useContext()

  return (
    <Box
      sx={{
        bottom: 8,
        color: ORANGE,
        fontWeight: 'bold',
        left: 12,
        position: 'absolute',
        transition: 'color 0.5s',
        ...(!areNumbersVisible && { color: 'transparent' }),
        ...(isPuzzleSolved && { color: 'transparent' })
      }}
    >
      {score}
    </Box>
  )
}
