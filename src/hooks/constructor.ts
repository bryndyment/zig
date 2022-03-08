import { useState } from 'react'

// exports

export const useConstructor = (constructor: () => void) => useState(constructor)
