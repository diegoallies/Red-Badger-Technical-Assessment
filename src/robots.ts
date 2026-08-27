export function parseInput(input: string) {
  const lines = input.split('\n').filter((l) => l.trim() !== '')

  const [maxX, maxY] = lines[0].split(' ').map(Number)

  const robots = []
  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, dir] = lines[i].split(' ')
    robots.push({ x: Number(x), y: Number(y), dir, instructions: lines[i + 1] })
  }

  return { maxX, maxY, robots }
}

const DIRS = ['N', 'E', 'S', 'W']

export function turnLeft(dir: string) {
  return DIRS[(DIRS.indexOf(dir) + 3) % 4]
}

export function turnRight(dir: string) {
  return DIRS[(DIRS.indexOf(dir) + 1) % 4]
}

export function moveForward(x: number, y: number, dir: string) {
  if (dir === 'N') return { x, y: y + 1 }
  if (dir === 'S') return { x, y: y - 1 }
  if (dir === 'E') return { x: x + 1, y }
  return { x: x - 1, y }
}

export function runRobot(
  x: number,
  y: number,
  dir: string,
  instructions: string,
  maxX: number,
  maxY: number,
  scents: Set<string>,
) {
  for (const c of instructions) {
    if (c === 'L') dir = turnLeft(dir)
    else if (c === 'R') dir = turnRight(dir)
    else if (c === 'F') {
      const next = moveForward(x, y, dir)
      if (next.x < 0 || next.x > maxX || next.y < 0 || next.y > maxY) {
        if (scents.has(`${x},${y}`)) continue
        scents.add(`${x},${y}`)
        return { x, y, dir, lost: true }
      }
      x = next.x
      y = next.y
    }
  }
  return { x, y, dir, lost: false }
}

export function runAll(input: string) {
  const { maxX, maxY, robots } = parseInput(input)
  const scents = new Set<string>()

  return robots.map((r) => {
    const res = runRobot(r.x, r.y, r.dir, r.instructions, maxX, maxY, scents)
    return `${res.x} ${res.y} ${res.dir}` + (res.lost ? ' LOST' : '')
  })
}
