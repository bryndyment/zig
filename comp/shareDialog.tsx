'use client'

import { useAppContext } from '@/comp/appContext'
import { AMBER, BOARDS } from '@/util/const'
import { Opening } from '@hoologic/use-opening'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ContentCopy } from '@mui/icons-material'
import { common } from '@mui/material/colors'
import { FC } from 'react'

// types

type _ShareDialogProps = { opening:
  Opening }

// components

export const ShareDialog:  FC<_ShareDialogProps> = ({ opening }) => {
  const { puzzleIndex } = useAppContext()

  const handleCopy = () =>  {
    navigator.clipboard.writeText(`https://zig.vercel.app/${BOARDS[puzzleIndex].id}`)
  }

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>Share</DialogTitle>

      <DialogContent>
        <Box
          sx={{
             alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            my: 2,
            position:  'relative',
          }}
        >
          <Chip
            label={`https://zig.vercel.app/${BOARDS[puzzleIndex].id}`}
            sx={{
              bgcolor:  AMBER,
              borderRadius: 1,
              color: common.white,
              fontWeight: 600
            }}
          />

          <ContentCopy
            onClick={handleCopy}
            sx={{
              color: AMBER,
              cursor: 'pointer',
              position: 'absolute',
              top: '50%',
              right: 16,
              transform: 'translateY(-50%)'
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={opening.close} variant="contained">
          OK!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
