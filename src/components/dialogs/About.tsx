import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Typography } from '@mui/material'
import { FC } from 'react'
import { Opening } from '../../hooks/opening'
import { useMobileMediaQuery } from '../../hooks/mobileMediaQuery'

// types

interface AboutDialogParams {
  opening: Opening
}

// styles

const styles = {
  list: { listStyleType: 'disc', py: 0.5 },
  listItem: { display: 'list-item', ml: 2.8, pb: 0.4, pl: 0.4 }
}

// components

export const AboutDialog: FC<AboutDialogParams> = ({ opening }) => {
  const isMobile = useMobileMediaQuery()

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>About!</DialogTitle>

      <DialogContent>
        <List sx={styles.list}>
          <ListItem sx={styles.listItem}>{isMobile ? 'tap on' : 'hover over'} any corner</ListItem>

          <ListItem sx={styles.listItem}>{isMobile ? 'tap' : 'move'} horizontally and vertically and connect to the other highlighted corner</ListItem>

          <ListItem sx={styles.listItem}>as you {isMobile ? 'tap' : 'move'}, your path will highlight</ListItem>

          <ListItem sx={styles.listItem}>the sum of your path is displayed bottom-left</ListItem>

          <ListItem sx={styles.listItem}>try to match the highest sum, displayed bottom-right</ListItem>
        </List>

        <Typography>There’s a new puzzle each day …</Typography>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={opening.close} variant="contained">
          OK!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
