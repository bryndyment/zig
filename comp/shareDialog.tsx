'use client'

import { useAppContext } from '@/comp/appContext'
import { BOARDS } from '@/util/boards'
import { AMBER } from '@/util/const'
import { Opening } from '@hoologic/use-opening'
import { ContentCopy } from '@mui/icons-material'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { common } from '@mui/material/colors'
import { FC, useMemo, useState } from 'react'

// types

type _ShareDialogProps = { opening: Opening }

// constants

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://zig.vercel.app'

// components

export const ShareDialog: FC<_ShareDialogProps> = ({ opening }) => {
  const { puzzle } = useAppContext()
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`${BASE_URL}/${BOARDS[puzzle.index].id}`)
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
        <Typography>Share the following link with friends!</Typography>

        <Box sx={{ m: 3, mb: 0, position: 'relative', textAlign: 'center' }}>
          <Chip
            label={
              isCopied ? (
                'Link copied!'
              ) : (
                <Box
                  component="a"
                  href={`${BASE_URL}/${BOARDS[puzzle.index].id}`}
                  rel="noreferrer"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                  target="_blank"
                >
                  {`${BASE_URL.replace(/^https?:\/\//, '')}/${BOARDS[puzzle.index].id}`}
                </Box>
              )
            }
            sx={{ bgcolor: AMBER, borderRadius: 1, color: common.white, fontWeight: 600, minWidth: 180, mx: 1.25, textAlign: 'center' }}
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
