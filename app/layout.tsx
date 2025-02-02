import type { Metadata } from 'next'
import { Client } from '@/comp/client'
import { Box } from '@mui/material'
import { Bungee, Roboto } from 'next/font/google'
import { FC, ReactNode } from 'react'

// types

type _LayoutProps = { children: ReactNode }

// constants

const BUNGEE = Bungee({ subsets: ['latin'], weight: '400' })
const ROBOTO = Roboto({ subsets: ['latin'], weight: '400' })

// metadata

export const metadata: Metadata = {
  title: 'Zig!'
}

// layout

const Layout: FC<_LayoutProps> = ({ children }) => (
  <html className={`${BUNGEE.className} ${ROBOTO.className}`} lang="en-US" suppressHydrationWarning>
    <Box component="body" sx={{ bgcolor: '#f9ebd1' }}>
      <Client>{children}</Client>
    </Box>
  </html>
)

export default Layout
