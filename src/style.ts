import { SIZE } from './const'

// exports

export const styles = {
  cell: {
    alignItems: 'center',
    color: 'transparent',
    display: 'flex',
    fontSize: [13, 16],
    fontWeight: 'bold',
    justifyContent: 'center',
    opacity: 1,
    transition: 'background-color 500ms, border-radius 500ms, color 500ms, opacity 500ms',
    width: '100%'
  },
  cellWrapper: {
    display: 'flex',
    width: `${100 / SIZE}%`
  },
  paper: {
    boxSizing: ['content-box', 'border-box'],
    display: 'flex',
    flexWrap: 'wrap',
    height: ['100vw', 660],
    position: 'relative',
    px: [1, 10],
    py: [5, 10],
    userSelect: 'none',
    width: ['auto', 660]
  }
} as any
