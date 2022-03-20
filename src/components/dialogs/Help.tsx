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
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle sx={styles.title}>Zig!</DialogTitle>

      <DialogContent sx={styles.content}>
        <Divider sx={styles.divider} />

        <Typography>Hover over any corner. It will highlight.</Typography>

        <Typography sx={styles.p}>Move toward the diagonally opposite corner. As you move, your path highlights.</Typography>

        <Typography sx={styles.p}>The sum of the highlighted cells is displayed bottom-left.</Typography>

        <Typography sx={styles.p}>Aim for the highest possible sum, displayed bottom-right.</Typography>
      </DialogContent>

      <DialogActions sx={styles.actions}>
        <Button color="primary" onClick={opening.close} variant="contained">
          OK!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
