'use client'

import { useAppContext } from '@/comp/appContext'
import { AMBER, BOARDS } from '@/util/const'
import { Opening } from '@hoologic/use-opening'
import { ContentCopy } from '@mui/icons-material'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { common } from '@mui/material/colors'
import { FC, useMemo, useState } from 'react'

// types

type _ShareDialogProps = { opening: Opening }

// components

export const ShareDialog: FC<_ShareDialogProps> = ({ opening }) => {
  const { puzzleIndex } = useAppContext()
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://zig.vercel.app/${BOARDS[puzzleIndex].id}`)
    setIsCopied(true)
  }

  useMemo(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 1500)

      return () => clearTimeout(timer)
    }
  }, [isCopied])

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>Share</DialogTitle>

      <DialogContent>
        <Box sx={{ m: 3, mt: 4, position: 'relative', textAlign: 'center' }}>
          <Chip
            label={
              isCopied ? (
                'Link copied!'
              ) : (
                <Box
                  component="a"
                  href={`https://zig.vercel.app/${BOARDS[puzzleIndex].id}`}
                  rel="noreferrer"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                  target="_blank"
                >
                  {`https://zig.vercel.app/${BOARDS[puzzleIndex].id}`}
                </Box>
              )
            }
            sx={{ bgcolor: AMBER, borderRadius: 1, color: common.white, fontWeight: 600, minWidth: 222, mx: 1.25, textAlign: 'center' }}
          />

          <ContentCopy onClick={handleCopy} sx={{ color: AMBER, cursor: 'pointer', position: 'absolute', top: 5 }} />
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
