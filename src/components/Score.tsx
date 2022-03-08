import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE, YELLOW } from '../const'
import { useContext } from '../hooks/context'

// exports

export const Score: FC = () => {
  const { areNumbersVisible, isPuzzleSolved, score } = useContext()

  return (
    <Box
      sx={{
        bottom: 8,
        color: score ? ORANGE : YELLOW,
        fontWeight: 'bold',
        left: 12,
        position: 'absolute',
        transition: 'opacity 0.5s 1s',
        ...(!areNumbersVisible && { opacity: 0 }),
        ...(isPuzzleSolved && { opacity: 0 })
      }}
    >
      {score}
    </Box>
  )
}
