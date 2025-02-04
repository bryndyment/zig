'use client'

import { useAppContext } from '@/comp/appContext'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography } from '@mui/material'
import { FC } from 'react'

// components

export const SizeDialog: FC = () => {
  const { setSize, size, sizeOpening } = useAppContext()

  return (
    <Dialog fullWidth maxWidth="xs" onClose={sizeOpening.close} open={sizeOpening.isOpen}>
      <DialogTitle>Size</DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', mt: 2, px: 2 }}>
          <Slider color="secondary" marks max={12} min={6} onChange={(_, value) => setSize(value as number)} step={1} value={size} />

          <Typography sx={{ textAlign: 'center' }} variant="h2">
            {size} × {size}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={sizeOpening.close} variant="contained">
          OK!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
