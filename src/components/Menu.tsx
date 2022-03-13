import { Box, Link } from '@mui/material'
import { FC } from 'react'
import { HelpDialog } from './dialogs/Help'
import { ORANGE } from '../const'
import { useOpening } from '../hooks/opening'
import MenuIcon from '@mui/icons-material/Menu'

// exports

export const Menu: FC = () => {
  const opening = useOpening()

  return (
    <>
      <Box sx={{ left: 16, position: 'absolute', top: 11.5 }}>
        <Link onClick={opening.open} sx={{ color: ORANGE, cursor: 'pointer', display: 'none', textDecoration: 'none' }}>
          <MenuIcon fontSize="large" />
        </Link>
      </Box>

      <HelpDialog opening={opening} />
    </>
  )
}
