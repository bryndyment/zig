import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { FC } from 'react'
import { Opening } from '../../hooks/opening'
import { useMobileMediaQuery } from '../../hooks/mobileMediaQuery'

// types

interface AboutDialogParams {
  opening: Opening
}

// components

export const AboutDialog: FC<AboutDialogParams> = ({ opening }) => {
  const isMobile = useMobileMediaQuery()

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>About!</DialogTitle>

      <DialogContent>
        <Typography>{isMobile ? 'Tap on' : 'Hover over'} any corner. It will highlight.</Typography>

        <Typography>{isMobile ? 'Tap' : 'Move'} horizontally and vertically toward the diagonally opposite corner.</Typography>

        <Typography></Typography>

        <Typography>As you {isMobile ? 'tap' : 'move'}, your path will highlight.</Typography>

        <Typography>The sum of the highlighted cells is displayed bottom-left.</Typography>

        <Typography>Aim for the highest sum, displayed bottom-right.</Typography>

        <Typography>There’s a new puzzle each day.</Typography>

        <Typography>That’s it!</Typography>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={opening.close} variant="contained">
          OK!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
