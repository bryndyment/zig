import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Typography } from '@mui/material'
import { FC } from 'react'
import { Opening } from '../../hooks/opening'
import { useMobileMediaQuery } from '../../hooks/mobileMediaQuery'

// types

interface AboutDialogProps {
  opening: Opening
}

// styles

const styles = {
  list: { listStyleType: 'disc', pb: 0.5, pt: 1 },
  listItem: { display: 'list-item', ml: 2.8, pb: 0.4, pl: 0.4 }
}

// components

export const AboutDialog: FC<AboutDialogProps> = ({ opening }) => {
  const isMobile = useMobileMediaQuery()

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>About!</DialogTitle>

      <DialogContent>
        <Typography>A daily find-the-best-path puzzle …</Typography>

        <List sx={styles.list}>
          <ListItem sx={styles.listItem}>{isMobile ? 'tap on' : 'hover over'} any corner</ListItem>

          <ListItem sx={styles.listItem}>{isMobile ? 'tap' : 'move'} horizontally and vertically and connect to the other highlighted corner</ListItem>

          <ListItem sx={styles.listItem}>as you {isMobile ? 'tap' : 'move'}, your path will highlight</ListItem>

          <ListItem sx={styles.listItem}>the sum of your path is displayed bottom-left</ListItem>

          <ListItem sx={styles.listItem}>try to match the highest sum, displayed bottom-right</ListItem>
        </List>

        <Typography>… with a new puzzle each day.</Typography>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={opening.close} variant="contained">
          OK!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
