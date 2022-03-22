import { AboutDialog } from './dialogs/About'
import { Button, Menu, MenuItem } from '@mui/material'
import { FC } from 'react'
import { ReactComponent as MenuIcon } from '../assets/images/menu.svg'
import { PrefsDialog } from './dialogs/Prefs'
import { useOpening } from '../hooks/opening'

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

// exports

export const MenuButton: FC = () => {
  const aboutOpening = useOpening()
  const menuOpening = useOpening()
  const prefsOpening = useOpening()
  // const statsOpening = useOpening()

  return (
    <>
      <Button onClick={menuOpening.open} sx={styles.button}>
        <MenuIcon />
      </Button>

      <Menu
        anchorEl={menuOpening.anchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        onClose={menuOpening.close}
        open={menuOpening.isOpen}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={aboutOpening.open}>About</MenuItem>

        <MenuItem onClick={prefsOpening.open}>Prefs</MenuItem>

        {/* <MenuItem onClick={statsOpening.open}>Stats</MenuItem> */}
      </Menu>

      <AboutDialog opening={aboutOpening} />

      <PrefsDialog opening={prefsOpening} />
    </>
  )
}
