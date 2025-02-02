'use client'

import { AMBER } from '@/util/const'
import { Opening } from '@hoologic/use-opening'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem } from '@mui/material'
import { common } from '@mui/material/colors'
import { FC } from 'react'

// types

type _KeysDialogProps = { opening: Opening }

// constants

const BOX_SX = {
  alignItems: 'center',
  bgcolor: AMBER,
  borderRadius: 1,
  color: common.white,
  display: 'inline-flex',
  height: 24,
  justifyContent: 'center',
  mx: 0.25,
  width: 24
} as const

const LIST_ITEM_SX = { display: 'list-item', ml: 2.8, pb: 0.4, pl: 0.4 } as const
const LIST_SX = { listStyleType: 'disc', pb: 0.5, pt: 1 } as const

// components

export const KeysDialog: FC<_KeysDialogProps> = ({ opening }) => (
  <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
    <DialogTitle>Keys</DialogTitle>

    <DialogContent>
      <List sx={LIST_SX}>
        <ListItem sx={LIST_ITEM_SX}>
          <>the </>

          <Box sx={{ ...BOX_SX, fontWeight: 600 }}>C</Box>

          <> key toggles the number display</>
        </ListItem>

        <ListItem sx={LIST_ITEM_SX}>
          <>the </>

          <Box sx={{ ...BOX_SX, fontSize: 14 }}>◄</Box>

          <> and </>

          <Box sx={{ ...BOX_SX, fontSize: 14 }}>►</Box>

          <> keys cycle through the board sizes</>
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
