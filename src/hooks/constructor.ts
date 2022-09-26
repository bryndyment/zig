import { useState } from 'react'

export const useConstructor = (constructor: () => void) => useState(constructor)
