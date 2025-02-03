'use client'

import { AboutDialog } from '@/comp/aboutDialog'
import { useAppContext } from '@/comp/appContext'
import { KeysDialog } from '@/comp/keysDialog'
import { PrefsDialog } from '@/comp/prefsDialog'
import { useOpening } from '@hoologic/use-opening'
import { useWhen } from '@hoologic/use-when'
import { Button, MenuItem, Menu as MuiMenu } from '@mui/material'
import { FC } from 'react'

// constants

const BUTTON_SX = { cursor: 'pointer', height: 24.5, minWidth: 0, p: 0, position: 'absolute', right: 21, textDecoration: 'none', top: 20 } as const

// components

const Icon: FC = () => (
  <svg fill="#ff5c00" height={24} width={30}>
    <rect height={6} rx={1.5} width={30} />
    <rect height={6} rx={1.5} width={30} y={9} />
    <rect height={6} rx={1.5} width={30} y={18} />
  </svg>
)

export const Menu: FC = () => {
  const { isClient, prefsOpening } = useAppContext()
  const aboutOpening = useOpening()
  const keysOpening = useOpening()
  const menuOpening = useOpening()

  useWhen(() => {
    if (isClient && !localStorage.getItem('size')) aboutOpening.open()
  }, [])

  return (
    <>
      <Button onClick={menuOpening.open} sx={BUTTON_SX}>
        <Icon />
      </Button>

      <MuiMenu
        anchorEl={menuOpening.anchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        MenuListProps={{ sx: { ml: 0, py: 0 } }}
        onClick={menuOpening.close}
        onClose={menuOpening.close}
        open={menuOpening.isOpen}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={aboutOpening.open}>About</MenuItem>

        <MenuItem onClick={keysOpening.open}>Keys</MenuItem>

        <MenuItem onClick={prefsOpening.open}>Prefs</MenuItem>
      </MuiMenu>

      <AboutDialog opening={aboutOpening} />

      <KeysDialog opening={keysOpening} />

      <PrefsDialog />
    </>
  )
}
