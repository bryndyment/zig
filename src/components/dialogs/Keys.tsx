import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Typography } from '@mui/material'
import { FC } from 'react'
import { Opening } from '../../hooks/opening'
import { WHITE, YELLOW } from '../../const'

// types

interface KeysDialogProps {
  opening: Opening
}

// styles

const styles = {
  key: { backgroundColor: YELLOW, borderRadius: 1, color: WHITE, display: 'inline', fontWeight: 'bold', margin: 0.2, padding: '0 4px' },
  list: { listStyleType: 'disc', pb: 0.5, pt: 1 },
  listItem: { display: 'list-item', ml: 2.8, pb: 0.4, pl: 0.4 }
}

// components

export const KeysDialog: FC<KeysDialogProps> = ({ opening }) => (
  <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
    <DialogTitle>Keys!</DialogTitle>

    <DialogContent>
      <Typography>Some keyboard options …</Typography>

      <List sx={styles.list}>
        <ListItem sx={styles.listItem}>
          <>the</> <Box sx={styles.key}>C</Box> <>key toggles the number display</>
        </ListItem>

        <ListItem sx={styles.listItem}>
          <>the</> <Box sx={styles.key}>◄</Box> <>and</> <Box sx={styles.key}>►</Box> <>keys cycle through the board sizes</>
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
