import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Close } from '../Close'
import { FC } from 'react'
import { Opening } from '../../hooks/opening'

// types

interface HelpDialogParams {
  opening: Opening
}

// styles

const styles = {
  actions: { pb: 2, pl: 0, pr: 2, pt: 4 },
  content: { pl: 2 },
  title: { borderBottom: '1px solid #d8d8d8', mb: 1, mt: 0, mx: 2, pl: 0 }
}

// components

export const HelpDialog: FC<HelpDialogParams> = ({ opening }) => {
  return (
    <Dialog maxWidth="xl" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle sx={styles.title}>Are you sure?</DialogTitle>

      <DialogContent sx={styles.content}>Content</DialogContent>

      <DialogActions sx={styles.actions}>
        <Button color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>

      <Close callback={opening.close} />
    </Dialog>
  )
}
