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
