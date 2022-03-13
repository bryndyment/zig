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
        bottom: 9.5,
        color: ORANGE,
        fontSize: 25,
        fontWeight: 500,
        left: 19,
        position: 'absolute'
      }}
    >
      {score}
    </Box>
  )
}
