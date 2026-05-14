<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useInvestigationStore } from '../stores/investigation'

const props = defineProps<{ compact?: boolean }>()
const store = useInvestigationStore()
const input = ref('')
const outputRef = ref<HTMLElement | null>(null)
const lines = ref<string[]>([
  'IDS Terminal v2.2.0',
  'Введите help для списка команд.'
])

function scrollToBottom() {
  nextTick(() => {
    if (!outputRef.value) return
    outputRef.value.scrollTop = outputRef.value.scrollHeight
  })
}

function push(text: string | string[]) {
  if (Array.isArray(text)) lines.value.push(...text)
  else lines.value.push(text)
  scrollToBottom()
}

function run() {
  const raw = input.value.trim()
  if (!raw) return
  push(`ids> ${raw}`)
  input.value = ''
  const [command, ...args] = raw.split(' ')
  const query = args.join(' ').trim()

  if (command === 'help') {
    push([
      'Команды:',
      'help — список команд',
      'search <имя или текст> — поиск по подозреваемым, делам и уликам',
      'evidence — список улик выбранного дела',
      'open <id дела> — открыть дело',
      'camera <id камеры> — выбрать камеру',
      'clear — очистить терминал'
    ])
    return
  }

  if (command === 'clear') {
    lines.value = ['IDS Terminal v2.2.0']
    scrollToBottom()
    return
  }

  if (command === 'search') {
    if (!query) { push('Укажите запрос: search Джонатан'); return }
    const suspects = store.searchSuspects(query).map(s => `Подозреваемый: ${s.name} / ${s.status} / риск ${s.risk}%`)
    const cases = store.searchCases(query).map(c => `Дело: ${c.id} / ${c.title} / ${c.status}`)
    const evidence = store.searchEvidence(query).map(e => `Улика: ${e.id} / ${e.title} / ${e.fileName}`)
    const result = [...suspects, ...cases, ...evidence]
    push(result.length ? [`Найдено: ${result.length}`, ...result] : 'Ничего не найдено')
    return
  }

  if (command === 'evidence') {
    push(store.currentEvidence.length ? store.currentEvidence.map(e => `${e.id}: ${e.title} (${e.type})`) : 'По выбранному делу улик нет')
    return
  }

  if (command === 'open') {
    const found = store.cases.find(c => c.id.toLowerCase() === query.toLowerCase())
    if (!found) { push('Дело не найдено'); return }
    store.selectCase(found.id)
    push(`Открыто дело: ${found.title}`)
    return
  }

  if (command === 'camera') {
    const found = store.cameras.find(c => c.id.toLowerCase() === query.toLowerCase())
    if (!found) { push('Камера не найдена'); return }
    store.selectCamera(found.id)
    push(`Активная камера: ${found.title}`)
    return
  }

  push('Неизвестная команда. Введите help.')
}
</script>

<template>
  <section class="panel terminal-panel" :class="{ compact: props.compact }">
    <div class="panel__head"><h3>Терминал</h3><span>ACTIVE</span></div>
    <div ref="outputRef" class="terminal-output terminal-output--hidden-scroll"><p v-for="(line, index) in lines" :key="index">{{ line }}</p></div>
    <form class="terminal-input" @submit.prevent="run"><span>ids&gt;</span><input v-model="input" placeholder="help"><button type="submit">↵</button></form>
  </section>
</template>
