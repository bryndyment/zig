import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography } from '@mui/material'
import { FC } from 'react'
import { GRAY } from '../../const'
import { Opening } from '../../hooks/opening'
import { Statuses } from '../../enum'
import { useContext } from '../../hooks/context'

// styles

const styles = {
  size: {
    '&': { color: GRAY },
    '&::after': { content: '" (disabled until tomorrow)"', fontSize: 14, textTransform: 'none' }
  }
}

// types

interface PrefsDialogParams {
  opening: Opening
}

// components

export const PrefsDialog: FC<PrefsDialogParams> = ({ opening }) => {
  const { color, setColor, setSize, size, status } = useContext()

  return (
    <Dialog fullWidth maxWidth="xs" onClose={opening.close} open={opening.isOpen}>
      <DialogTitle>Prefs!</DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="h2">Color</Typography>

          <Box sx={{ mt: 2, px: 2 }}>
            <Slider color="secondary" marks max={100} min={0} onChange={(_, value) => setColor(value as number)} step={10} value={color} />
          </Box>
        </Box>

        <Box sx={{ pb: 2, pt: 1 }}>
          <Typography sx={{ ...(status === Statuses.COMPLETE && styles.size) }} variant="h2">
            Size
          </Typography>

          <Box sx={{ mt: 2, px: 2 }}>
            <Slider
              color="secondary"
              disabled={status === Statuses.COMPLETE}
              marks
              max={12}
              min={6}
              onChange={(_, value) => setSize(value as number)}
              step={1}
              value={size}
            />
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
