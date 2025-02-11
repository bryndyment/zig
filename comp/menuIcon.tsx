'use client'

import { FC } from 'react'

// components

export const Menu: FC = props => (
  <svg height={24} width={30} {...props}>
    <rect height={6} rx={1.5} width={30} />
    <rect height={6} rx={1.5} width={30} y={9} />
    <rect height={6} rx={1.5} width={30} y={18} />
  </svg>
)
