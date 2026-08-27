import { expect, it } from 'vitest'
import { moveForward, turnLeft, turnRight } from './robots'

it('turns left', () => {
  expect(turnLeft('N')).toBe('W')
  expect(turnLeft('W')).toBe('S')
  expect(turnLeft('S')).toBe('E')
  expect(turnLeft('E')).toBe('N')
})

it('turns right', () => {
  expect(turnRight('N')).toBe('E')
  expect(turnRight('E')).toBe('S')
  expect(turnRight('S')).toBe('W')
  expect(turnRight('W')).toBe('N')
})

it('moves forward in the direction it is facing', () => {
  expect(moveForward(1, 1, 'N')).toEqual({ x: 1, y: 2 })
  expect(moveForward(1, 1, 'S')).toEqual({ x: 1, y: 0 })
  expect(moveForward(1, 1, 'E')).toEqual({ x: 2, y: 1 })
  expect(moveForward(1, 1, 'W')).toEqual({ x: 0, y: 1 })
})
