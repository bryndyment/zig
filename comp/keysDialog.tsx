'use client'

import { AMBER } from '@/util/const'
import { Modes } from '@/util/enum'
import { Opening } from '@hoologic/use-opening'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem } from '@mui/material'
import { common } from '@mui/material/colors'
import { FC } from 'react'
import { useAppContext } from './appContext'

// types

type _KeysDialogProps = { opening: Opening }

// constants

const BOX_SX = {
  alignItems: 'center',
  bgcolor: AMBER,
  borderRadius: 1,
  color: common.white,
  cursor: 'pointer',
  display: 'inline-flex',
  height: 24,
  justifyContent: 'center',
  mx: 0.25,
  width: 24
} as const

// components

export const KeysDialog: FC<_KeysDialogProps> = ({ opening }) => {
  const { mode } = useAppContext()

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>Keys</DialogTitle>

      <DialogContent>
        <List>
          <ListItem>
            <>the </>

            <Box onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyN' }))} sx={BOX_SX}>
              N
            </Box>

            <> key toggles the number display</>
          </ListItem>

          <ListItem>
            <>the </>

            <Box onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyR' }))} sx={BOX_SX}>
              R
            </Box>

            <> key restarts the current board (clicking on the background also works)</>
          </ListItem>

          {mode === Modes.TODAY && (
            <ListItem>
              <>the </>

              <Box onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }))} sx={BOX_SX}>
                ◄
              </Box>

              <> and </>

              <Box onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }))} sx={BOX_SX}>
                ►
              </Box>

              <> keys cycle through the board sizes</>
            </ListItem>
          )}
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
