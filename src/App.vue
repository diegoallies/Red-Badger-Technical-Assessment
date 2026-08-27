<script setup lang="ts">
import { computed, ref } from 'vue'
import { parseInput, runAll, runRobot } from './robots'

const input = ref(`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`)

const output = ref('')
const error = ref('')
const grid = ref<{ maxX: number; maxY: number } | null>(null)
const robots = ref<{ x: number; y: number; dir: string; lost: boolean }[]>([])

function run() {
  error.value = ''
  output.value = ''
  grid.value = null
  robots.value = []

  try {
    output.value = runAll(input.value).join('\n')

    // run it again just to get the positions for the grid
    const parsed = parseInput(input.value)
    const world = { maxX: parsed.maxX, maxY: parsed.maxY, scents: new Set<string>() }
    grid.value = { maxX: parsed.maxX, maxY: parsed.maxY }
    robots.value = parsed.robots.map((r) => runRobot(r.x, r.y, r.dir, r.instructions, world))
  } catch (e) {
    error.value = (e as Error).message
  }
}

const arrows: Record<string, string> = { N: '↑', E: '→', S: '↓', W: '←' }

// rows from top (maxY) down to 0 so it draws the right way up
const rows = computed(() => {
  if (!grid.value) return []
  const out = []
  for (let y = grid.value.maxY; y >= 0; y--) {
    const row = []
    for (let x = 0; x <= grid.value.maxX; x++) {
      row.push(robots.value.filter((r) => r.x === x && r.y === y))
    }
    out.push(row)
  }
  return out
})
</script>

<template>
  <main>
    <h1>Martian Robots</h1>

    <div class="cols">
      <section>
        <label for="input">Input</label>
        <textarea id="input" v-model="input" rows="12"></textarea>
        <button @click="run">Run</button>
      </section>

      <section>
        <label>Output</label>
        <pre>{{ output || ' ' }}</pre>
        <p v-if="error" class="error">{{ error }}</p>
      </section>
    </div>

    <section v-if="grid" class="positions">
      <label>Final positions</label>
      <table class="grid">
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="(cell, j) in row" :key="j">
            <span v-for="(r, k) in cell" :key="k" :class="{ lost: r.lost }" :title="r.lost ? 'LOST' : ''">
              {{ arrows[r.dir] }}
            </span>
          </td>
        </tr>
      </table>
    </section>
  </main>
</template>
