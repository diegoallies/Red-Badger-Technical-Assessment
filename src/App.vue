<script setup lang="ts">
import { ref } from 'vue'
import { runAll } from './robots'

const input = ref(`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`)

const output = ref('')

function run() {
  output.value = runAll(input.value).join('\n')
}
</script>

<template>
  <main>
    <h1>Martian Robots</h1>

    <textarea v-model="input" rows="12"></textarea>
    <br />
    <button @click="run">Run</button>

    <pre v-if="output">{{ output }}</pre>
  </main>
</template>
