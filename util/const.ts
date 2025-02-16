import { amber, deepOrange, orange } from '@mui/material/colors'
import { MouseEvent } from 'react'

// constants

export const AMBER = amber[500]

export const BACKGROUND = orange[50]

export const ORANGE = deepOrange[500]
export const STOP_PROPAGATION = (event: MouseEvent) => event.stopPropagation()
export const TODAY = new Date().toLocaleString('sv').slice(0, 10).replace(/\D/g, '')
