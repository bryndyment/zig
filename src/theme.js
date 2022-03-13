import { ORANGE, YELLOW } from './const'
import { createTheme } from '@mui/material/styles'

// exporteds

export const theme = createTheme({
  breakpoints: {
    values: {
      xl: 660,
      xs: 0
    }
  },
  palette: {
    primary: {
      main: ORANGE
    },
    secondary: {
      main: YELLOW
    }
  }
})
