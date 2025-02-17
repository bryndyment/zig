'use client'

import { AboutDialog } from '@/comp/aboutDialog'
import { useAppContext } from '@/comp/appContext'
import { KeysDialog } from '@/comp/keysDialog'
import { SizeDialog } from '@/comp/sizeDialog'
import { ORANGE } from '@/util/const'
import { Modes } from '@/util/enum'
import { useOpening } from '@hoologic/use-opening'
import { Button, MenuItem, Menu as MuiMenu } from '@mui/material'
import { FC, useEffect } from 'react'
import { ShareDialog } from './shareDialog'

// constants

const BUTTON_SX = { cursor: 'pointer', height: 24.5, minWidth: 0, p: 0, position: 'absolute', right: 21, textDecoration: 'none', top: 20 } as const

// components

const Icon: FC = () => (
  <svg fill={ORANGE} height={24} width={30}>
    <rect height={6} rx={1.5} width={30} />
    <rect height={6} rx={1.5} width={30} y={9} />
    <rect height={6} rx={1.5} width={30} y={18} />
  </svg>
)

export const Menu: FC = () => {
  const { aboutOpening, keysOpening, mode, shareOpening, sizeOpening } = useAppContext()
  const menuOpening = useOpening()

  useEffect(() => {
    if (!localStorage.getItem('onboarded')) {
      localStorage.setItem('onboarded', 'true')
      aboutOpening.open()
    }
  }, [aboutOpening])

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

        <MenuItem onClick={shareOpening.open}>Share</MenuItem>

        {mode === Modes.TODAY && <MenuItem onClick={sizeOpening.open}>Size</MenuItem>}
      </MuiMenu>

      <AboutDialog opening={aboutOpening} />

      <KeysDialog opening={keysOpening} />

      <ShareDialog opening={shareOpening} />

      {mode === Modes.TODAY && <SizeDialog />}
    </>
  )
}
