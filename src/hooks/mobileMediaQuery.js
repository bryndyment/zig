import { theme } from '../theme'
import { useMediaQuery } from '@mui/material'

// exported hooks

export const useMobileMediaQuery = (breakpoint = 'desktop') => useMediaQuery(theme.breakpoints.down(breakpoint))
