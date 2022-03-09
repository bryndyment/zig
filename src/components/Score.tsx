import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE } from '../const'
import { useContext } from '../hooks/context'

// exports

export const Score: FC = () => {
  const { score } = useContext()

  return (
    <Box
      sx={{
        '-webkit-text-stroke': '2px #fff',
        bottom: 8,
        color: ORANGE,
        fontSize: 32,
        fontWeight: 'bold',
        left: 20,
        letterSpacing: -3,
        position: 'absolute'
      }}
    >
      {score}
    </Box>
  )
}
