import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE, OUTLINE } from '../const'
import { useContext } from '../hooks/context'

// exports

export const Score: FC = () => {
  const { score } = useContext()

  return (
    <Box
      sx={{
        bottom: 11,
        color: ORANGE,
        fontSize: 24,
        fontWeight: 'bold',
        left: 19,
        position: 'absolute',
        textShadow: OUTLINE
      }}
    >
      {score}
    </Box>
  )
}
