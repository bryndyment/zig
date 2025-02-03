'use client'

import { useMobileMediaQuery } from '@/hooks/mobileMediaQuery'
import { Opening } from '@hoologic/use-opening'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Typography } from '@mui/material'
import { FC } from 'react'

// types

type _AboutDialogProps = { opening: Opening }

// components

export const AboutDialog: FC<_AboutDialogProps> = ({ opening }) => {
  const isMobile = useMobileMediaQuery()

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>About</DialogTitle>

      <DialogContent>
        <Typography>A find-the-best-path puzzle:</Typography>

        <List>
          <ListItem>{isMobile ? 'tap on' : 'hover over'} any corner</ListItem>
          <ListItem>{isMobile ? 'tap' : 'move'} horizontally and vertically and connect to the other highlighted corner</ListItem>
          <ListItem>as you {isMobile ? 'tap' : 'move'}, your path will highlight</ListItem>
          <ListItem>the sum of your path is displayed bottom-left</ListItem>
          <ListItem>try to match the highest sum, displayed bottom-right</ListItem>
        </List>

        <Typography>… with a new puzzle each day!</Typography>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={opening.close} variant="contained">
          OK!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
