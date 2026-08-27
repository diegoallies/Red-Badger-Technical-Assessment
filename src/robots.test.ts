import { expect, it } from 'vitest'
import { turnLeft, turnRight } from './robots'

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
