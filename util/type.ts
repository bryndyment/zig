import { Positions } from './enum'

export type _Corners = { positions: Map<number, Positions>; values: number[] }
export type _Puzzle = { corners: _Corners; index: number }
export type _ValidCells = Set<number>
