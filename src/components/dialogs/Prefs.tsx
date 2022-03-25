import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography } from '@mui/material'
import { FC } from 'react'
import { Opening } from '../../hooks/opening'
import { useContext } from '../../hooks/context'

// types

interface PrefsDialogParams {
  opening: Opening
}

// components

export const PrefsDialog: FC<PrefsDialogParams> = ({ opening }) => {
  const { color, setColor, setSize, size } = useContext()

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>Prefs!</DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="h2">Size</Typography>

          <Box sx={{ mt: 2, px: 3 }}>
            <Slider color="secondary" marks max={12} min={6} onChange={(_, value) => setSize(value as number)} step={1} value={size} />
          </Box>
        </Box>

        <Box sx={{ py: 2 }}>
          <Typography variant="h2">Color</Typography>

          <Box sx={{ mt: 2, px: 3 }}>
            <Slider color="secondary" marks max={100} min={0} onChange={(_, value) => setColor(value as number)} step={10} value={color} />
          </Box>
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
