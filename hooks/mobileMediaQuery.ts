import { THEME } from '@/util/theme'
import { useMediaQuery } from '@mui/material'
import { Breakpoint } from '@mui/material/styles'

// hooks

export const useMobileMediaQuery = (breakpoint: Breakpoint = 'xl') => useMediaQuery(THEME.breakpoints.down(breakpoint))
