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

type Robot = { x: number; y: number; dir: string; lost: boolean }
type World = { maxX: number; maxY: number; scents: Set<string> } 

// each command takes the robot and returns the updated one
// adding a new command is just a new entry here
const commands: Record<string, (r: Robot, w: World) => Robot> = {
  L: (r) => ({ ...r, dir: turnLeft(r.dir) }),
  R: (r) => ({ ...r, dir: turnRight(r.dir) }),  
  F: (r, w) => {
    const next = moveForward(r.x, r.y, r.dir)

    if (next.x < 0 || next.x > w.maxX || next.y < 0 || next.y > w.maxY) {
      if (w.scents.has(`${r.x},${r.y}`))  return r
      w.scents.add(`${r.x},${r.y}`)
      return { ...r, lost: true }
    }

    return { ...r, x: next.x, y: next.y } 
  },
}

export function runRobot(x: number, y: number, dir: string, instructions: string, world: World) {
  let robot: Robot = { x, y, dir, lost: false }

  for (const c of instructions) {
    robot = commands[c](robot, world)
    if (robot.lost)  break
  }

  return robot
}

export function runAll(input: string) {
  const { maxX, maxY, robots } = parseInput(input)
  const world: World = { maxX, maxY, scents: new Set() } 

  return robots.map((r) => {
    const res = runRobot(r.x, r.y, r.dir, r.instructions, world)
    return `${res.x} ${res.y} ${res.dir}` + (res.lost ? ' LOST' : '')
  })
}
