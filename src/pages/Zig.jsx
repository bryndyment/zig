import { Box, Grid, Paper } from '@mui/material'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useMobileMediaQuery } from '../hooks/mobileMediaQuery'

// constants

const board = [
  39, 91, 87, 104, 10, 13, 143, 83, 56, 31, 2, 108, 3, 40, 14, 64, 138, 28, 48, 63, 33, 101, 17, 96, 21, 86, 137, 52, 105, 110, 74, 18, 37, 8, 25, 11, 20, 55,
  6, 136, 43, 22, 123, 9, 79, 144, 84, 67, 85, 90, 34, 93, 44, 98, 114, 58, 12, 71, 16, 38, 29, 128, 59, 130, 69, 19, 24, 47, 102, 112, 78, 99, 126, 80, 119,
  103, 53, 68, 46, 95, 140, 26, 15, 142, 92, 62, 4, 65, 81, 42, 121, 1, 66, 131, 115, 30, 139, 97, 75, 77, 132, 72, 135, 107, 129, 49, 109, 73, 61, 54, 45, 122,
  41, 100, 124, 113, 106, 89, 7, 133, 141, 82, 57, 70, 94, 50, 35, 36, 118, 23, 125, 32, 51, 117, 127, 27, 60, 116, 5, 111, 134, 88, 120, 76
]

const Context = createContext()

const size = Math.sqrt(board.length)

// styles

const styles = {
  box: {
    alignItems: 'center',
    backgroundColor: '#ffbc00',
    borderRadius: '43%',
    color: '#fff',
    display: 'flex',
    fontSize: [13, 16],
    fontWeight: 'bold',
    height: `${100 / size}%`,
    justifyContent: 'center',
    transition: 'color 200ms',
    width: `${100 / size}%`
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    height: ['100vw', 660],
    p: [1, 10],
    width: ['100vw', 660]
  }
}

// components

const Board = () => {
  const { areNumbersHidden } = useContext(Context)

  return (
    <>
      {board.map(cell => (
        <Box key={cell} sx={{ ...styles.box, ...(areNumbersHidden && { color: 'transparent' }), opacity: (cell / board.length) * 0.75 + 0.25 }}>
          {cell}
        </Box>
      ))}
    </>
  )
}

// exported components

export const Zig = () => {
  const isMobile = useMobileMediaQuery()

  const [areNumbersHidden, setAreNumbersHidden] = useState(false)

  const context = useMemo(() => ({ areNumbersHidden }), [areNumbersHidden])

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'KeyC') {
        setAreNumbersHidden(areNumbersHidden => !areNumbersHidden)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Context.Provider value={context}>
      <Grid container height="100%" justifyContent="center">
        <Grid alignItems="center" display="flex" item justifyContent="center" xs={12}>
          <Paper elevation={isMobile ? 0 : 1} square={isMobile} sx={styles.paper}>
            <Board />
          </Paper>
        </Grid>
      </Grid>
    </Context.Provider>
  )
}
