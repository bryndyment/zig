import { Box } from '@mui/material'
import { FC } from 'react'
import { ORANGE } from '../const'
import { useContext } from '../hooks/context'

// styles

const styles = {
  box: {
    bottom: 9.5,
    color: ORANGE,
    fontFamily: 'bungee',
    fontSize: 25,
    fontWeight: 500,
    position: 'absolute',
    right: 18.5
  }
}

// exports

export const Goal: FC = () => {
  const { goal } = useContext()

  return <Box sx={styles.box}>{goal}</Box>
}
