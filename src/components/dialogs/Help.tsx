import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import { FC } from 'react'
import { ORANGE } from '../../const'
import { Opening } from '../../hooks/opening'

// types

interface HelpDialogParams {
  opening: Opening
}

// styles

const styles = {
  actions: { p: 2 },
  content: { p: 2 },
  divider: { mb: 1.5 },
  p: { mt: 1 },
  title: { color: ORANGE, mt: 0.5, px: 2, py: 1, textTransform: 'uppercase' }
}

// components

export const HelpDialog: FC<HelpDialogParams> = ({ opening }) => {
  return (
    <Dialog fullWidth maxWidth="xl" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle sx={styles.title}>Zig</DialogTitle>

      <DialogContent sx={styles.content}>
        <Divider sx={styles.divider} />

        <Typography>Choose a corner.</Typography>

        <Typography sx={styles.p}>Zig to the opposite corner, trying to get the score displayed at the bottom right.</Typography>

        <Typography sx={styles.p}>There is only one solution.</Typography>

        <Typography sx={styles.p}></Typography>
      </DialogContent>

      <DialogActions sx={styles.actions}>
        <Button color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
