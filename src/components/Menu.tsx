import { Button, MenuItem, Menu as MuiMenu } from '@mui/material'
import { FC } from 'react'
import { ReactComponent as MenuIcon } from '../assets/images/menu.svg'
import { useConstructor } from '../hooks/constructor'
import { Opening, useOpening } from '../hooks/opening'
import { AboutDialog } from './dialogs/About'
import { KeysDialog } from './dialogs/Keys'
import { PrefsDialog } from './dialogs/Prefs'

// types

interface MenuProps {
  prefsOpening: Opening
}

// styles

const styles = {
  button: {
    cursor: 'pointer',
    height: 24.5,
    left: 21,
    minWidth: 0,
    padding: 0,
    position: 'absolute',
    textDecoration: 'none',
    top: 20
  }
}

// components

export const Menu: FC<MenuProps> = ({ prefsOpening }) => {
  const aboutOpening = useOpening()
  const keysOpening = useOpening()
  const menuOpening = useOpening()

  useConstructor(() => {
    if (!localStorage.getItem('size')) {
      aboutOpening.open()
    }
  })

  return (
    <>
      <Button onClick={menuOpening.open} sx={styles.button}>
        <MenuIcon />
      </Button>

      <MuiMenu
        anchorEl={menuOpening.anchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
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

      <PrefsDialog opening={prefsOpening} />
    </>
  )
}
