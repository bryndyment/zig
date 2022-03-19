import { FC } from 'react'
import { HelpDialog } from './dialogs/Help'
import { Link } from '@mui/material'
import { ORANGE } from '../const'
import { useOpening } from '../hooks/opening'
import MenuIcon from '@mui/icons-material/Menu'

// styles

const styles = {
  link: {
    color: ORANGE,
    cursor: 'pointer',
    left: 16,
    position: 'absolute',
    textDecoration: 'none',
    top: 11.5
  }
}

// exports

export const Menu: FC = () => {
  const opening = useOpening()

  return (
    <>
      <Link onClick={opening.open} sx={styles.link}>
        <MenuIcon fontSize="large" />
      </Link>

      <HelpDialog opening={opening} />
    </>
  )
}
