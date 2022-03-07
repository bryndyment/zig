import { SIZE } from './const'

// exports

export const styles = {
  cell: {
    alignItems: 'center',
    borderRadius: '43%',
    color: '#fff',
    display: 'flex',
    fontSize: [13, 16],
    fontWeight: 'bold',
    justifyContent: 'center',
    transition: 'background-color 150ms, color 150ms',
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
