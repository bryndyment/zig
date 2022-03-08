import { SIZE } from './const'

// exports

export const styles = {
  board: {
    display: 'flex',
    flexWrap: 'wrap',
    height: ['100vw', 500],
    overflow: 'hidden',
    transition: 'border-radius 0.5s, transform 0.5s 1s',
    width: ['auto', 500]
  },
  cell: {
    alignItems: 'center',
    color: 'transparent',
    display: 'flex',
    fontSize: [13, 16],
    fontWeight: 'bold',
    justifyContent: 'center',
    transition: 'background-color 0.5s, border-radius 0.5s, color 0.5s, opacity 0.5s',
    width: '100%'
  },
  cellWrapper: {
    display: 'flex',
    width: `${100 / SIZE}%`
  },
  paper: {
    boxSizing: ['content-box', 'border-box'],
    position: 'relative',
    px: [1, 8],
    py: [5, 8],
    transition: 'border-radius 500ms 1s',
    userSelect: 'none'
  }
} as any
