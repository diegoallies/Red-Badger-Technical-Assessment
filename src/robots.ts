function parseCoord(s: string) {
  const n = Number(s)
  if (!Number.isInteger(n) || n < 0 || n > 50) {
    throw new Error(`bad coordinate: ${s} (must be 0 to 50)`)
  }
  return n
}

export function parseInput(input: string) {
  const lines = input.split('\n').map((l) => l.trim()).filter((l) => l !== '')

  if (lines.length === 0) throw new Error('no input')

  const [maxX, maxY] = lines[0].split(/\s+/).map(parseCoord)

  const robots = []
  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, dir] = lines[i].split(/\s+/)
    const instructions = lines[i + 1]

    if (!DIRS.includes(dir)) throw new Error(`bad direction: ${dir}`)
    if (instructions === undefined) throw new Error(`robot at line ${i + 1} has no instructions`)
    if (instructions.length >= 100) throw new Error('instructions must be under 100 chars')
    if (!/^[LRF]*$/.test(instructions)) throw new Error(`bad instruction in: ${instructions}`)

    robots.push({ x: parseCoord(x), y: parseCoord(y), dir, instructions })
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
