import { Box } from '@mui/material'
import { FC } from 'react'
import { GOAL, ORANGE, YELLOW } from '../const'
import { useContext } from '../hooks/context'

// exports

export const Goal: FC = () => {
  const { score } = useContext()

  return <Box sx={{ bottom: 8, color: GOAL === score ? ORANGE : YELLOW, fontWeight: 'bold', position: 'absolute', right: 12 }}>{GOAL}</Box>
}
