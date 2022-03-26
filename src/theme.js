import { ORANGE, YELLOW } from './const'
import { createTheme } from '@mui/material/styles'

// constants

export const theme = createTheme({
  breakpoints: {
    values: {
      xl: 660,
      xs: 0
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { fontFamily: 'bungee' }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: { padding: '16px' }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: { padding: '0 16px' }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e0e0e0',
          color: ORANGE,
          fontFamily: 'bungee',
          fontSize: 25,
          margin: '8px 16px 4px',
          padding: '0 0 6px',
          textTransform: 'uppercase'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: { marginBottom: '12px' }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&': { cursor: 'pointer', fontFamily: 'bungee', fontSize: 14, marginLeft: '1px', textDecoration: 'none', textTransform: 'uppercase' },
          '&:hover': { textDecoration: 'underline' }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&': { color: ORANGE, fontFamily: 'bungee' },
          '&:hover, &.Mui-focusVisible': { backgroundColor: '#fdefcf' }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        h2: { color: YELLOW, fontFamily: 'monospace', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }
      }
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
