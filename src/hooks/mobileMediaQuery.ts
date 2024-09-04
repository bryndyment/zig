import { useMediaQuery } from '@mui/material'
import { theme } from '../theme'

// exported hooks

export const useMobileMediaQuery = (breakpoint: any = 'xl') => useMediaQuery(theme.breakpoints.down(breakpoint))
