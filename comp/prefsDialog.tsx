'use client'

import { useAppContext } from '@/comp/appContext'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography } from '@mui/material'
import { FC } from 'react'

// components

export const PrefsDialog: FC = () => {
  const { prefsOpening, setSize, size } = useAppContext()

  return (
    <Dialog fullWidth maxWidth="xs" onClose={prefsOpening.close} open={prefsOpening.isOpen}>
      <DialogTitle>Prefs</DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="h2">Size</Typography>

          <Box sx={{ mt: 2, px: 2 }}>
            <Slider color="secondary" marks max={12} min={6} onChange={(_, value) => setSize(value as number)} step={1} value={size} />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={prefsOpening.close} variant="contained">
          OK!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
