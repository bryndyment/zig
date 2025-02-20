import type { Metadata } from 'next'
import { Client } from '@/comp/client'
import { BACKGROUND } from '@/util/const'
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
  <Box className={`${BUNGEE.className} ${ROBOTO.className}`} component="html" lang="en-US">
    <Box component="body" sx={{ bgcolor: BACKGROUND }}>
      <Client>{children}</Client>
    </Box>
  </Box>
)

export default Layout
