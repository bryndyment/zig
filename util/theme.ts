'use client'

import { AMBER, ORANGE } from '@/util/const'
import { createTheme } from '@mui/material'

// constants

export const THEME = createTheme({
  breakpoints: {
    values: { lg: 660, md: 660, sm: 660, xl: 660, xs: 0 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { fontFamily: 'bungee' }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          MozTapHighlightColor: 'transparent',
          WebkitTapHighlightColor: 'transparent'
        },
        'html, body, div#app': {
          height: '100%'
        },
        p: {
          marginTop: '8px !important'
        }
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
        h2: { color: AMBER, fontFamily: 'bungee', fontSize: 20, textTransform: 'uppercase' }
      }
    }
  },
  palette: {
    primary: {
      main: ORANGE
    },
    secondary: {
      main: AMBER
    }
  }
})

export const PALETTE = THEME.palette
