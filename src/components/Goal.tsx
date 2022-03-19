import { Box } from '@mui/material'
import { FC } from 'react'
import { GOAL, ORANGE } from '../const'

// styles

const styles = {
  box: {
    bottom: 9.5,
    color: ORANGE,
    fontSize: 25,
    fontWeight: 500,
    position: 'absolute',
    right: 18.5
  }
}

// exports

export const Goal: FC = () => <Box sx={styles.box}>{GOAL}</Box>
