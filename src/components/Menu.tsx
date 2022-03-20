import { FC } from 'react'
import { HelpDialog } from './dialogs/Help'
import { Link } from '@mui/material'
import { ReactComponent as MenuIcon } from '../assets/images/menu.svg'
import { useOpening } from '../hooks/opening'

// styles

const styles = {
  link: {
    cursor: 'pointer',
    height: 24.5,
    left: 21,
    position: 'absolute',
    textDecoration: 'none',
    top: 20
  }
}

// exports

export const Menu: FC = () => {
  const opening = useOpening()

  return (
    <>
      <Link onClick={opening.open} sx={styles.link}>
        <MenuIcon />
      </Link>

      <HelpDialog opening={opening} />
    </>
  )
}
