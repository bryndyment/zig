import { Box, Link } from '@mui/material'
import { FC } from 'react'
import { HelpDialog } from './dialogs/Help'
import { ORANGE, OUTLINE } from '../const'
import { useOpening } from '../hooks/opening'
import MenuIcon from '@mui/icons-material/Menu'

// exports

export const Menu: FC = () => {
  const opening = useOpening()

  return (
    <>
      <Box
        sx={{
          fontSize: 24,
          fontWeight: 'bold',
          left: 15,
          position: 'absolute',
          textShadow: OUTLINE,
          textTransform: 'uppercase',
          top: 15
        }}
      >
        <Link onClick={opening.open} sx={{ color: ORANGE, cursor: 'pointer', textDecoration: 'none' }}>
          <MenuIcon />
        </Link>
      </Box>

      <HelpDialog opening={opening} />
    </>
  )
}
