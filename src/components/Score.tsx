import { Box } from '@mui/material'
import { FC } from 'react'
import { RED } from '../const'
import { useContext } from '../hooks/context'

// styles

const styles = {
  box: {
    bottom: 9.5,
    color: RED,
    fontFamily: 'bungee',
    fontSize: 25,
    fontWeight: 500,
    left: 19,
    position: 'absolute'
  }
}

// exports

export const Score: FC = () => {
  const { score } = useContext()

  return <Box sx={styles.box}>{score}</Box>
}
