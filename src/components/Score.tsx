import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE } from '../const'
import { Statuses } from '../enum'
import { useContext } from '../hooks/context'

// styles

const styles = {
  box: {
    bottom: 9.5,
    color: ORANGE,
    fontFamily: 'bungee',
    fontSize: 25,
    fontWeight: 500,
    left: 19,
    position: 'absolute'
  }
}

// components

export const Score: FC = () => {
  const { goal, score, status } = useContext()

  return <Box sx={styles.box}>{status === Statuses.COMPLETE ? goal : score}</Box>
}
