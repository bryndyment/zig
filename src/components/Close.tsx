import { Box, IconButton } from '@mui/material'
import { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'

// types

interface CloseProps {
  callback: () => void
}

// components

export const Close: FC<CloseProps> = ({ callback }) => (
  <Box position="absolute" right={4} top={4}>
    <IconButton onClick={callback}>
      <CloseIcon />
    </IconButton>
  </Box>
)
