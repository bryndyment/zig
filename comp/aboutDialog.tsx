'use client'

import { useMobileMediaQuery } from '@/hooks/mobileMediaQuery'
import { Opening } from '@hoologic/use-opening'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, List, ListItem, Typography } from '@mui/material'
import { FC, useCallback } from 'react'
import { useAppContext } from './appContext'

// types

type _AboutDialogProps = { opening: Opening }

// components

export const AboutDialog: FC<_AboutDialogProps> = ({ opening }) => {
  const { shareOpening, sizeOpening } = useAppContext()
  const isMobile = useMobileMediaQuery()

  const handleSharingClick = useCallback(() => {
    opening.close()
    shareOpening.open()
  }, [opening, shareOpening])

  const handleSizesClick = useCallback(() => {
    opening.close()
    sizeOpening.open()
  }, [opening, sizeOpening])

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>About</DialogTitle>

      <DialogContent>
        <Typography>A find-the-best-path puzzle:</Typography>

        <List>
          <ListItem>{isMobile ? 'tap on' : 'hover over'} any highlighted corner</ListItem>
          <ListItem>{isMobile ? 'tap' : 'move'} towards the other highlighted corner</ListItem>
          <ListItem>the sum of your path is displayed bottom-left</ListItem>
          <ListItem>try to match the highest-possible sum, displayed bottom-right</ListItem>
          <ListItem>
            <Link onClick={handleSharingClick} sx={{ cursor: 'pointer' }}>
              sharing
            </Link>

            <>, different </>

            <Link onClick={handleSizesClick} sx={{ cursor: 'pointer' }}>
              sizes
            </Link>

            <>, and a new puzzle each day!</>
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={opening.close} variant="contained">
          OK!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
