'use client'

import { AppContext } from '@/comp/appContext'
import { THEME } from '@/util/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { FC, ReactNode, useMemo } from 'react'

// types

type _ClientProps = { children: ReactNode }

// components

export const Client: FC<_ClientProps> = ({ children }) => {
  const isClient = useMemo(() => typeof window !== 'undefined', [])

  return (
    <ThemeProvider theme={THEME}>
      <CssBaseline />

      <AppContext isClient={isClient}>{children}</AppContext>
    </ThemeProvider>
  )
}
