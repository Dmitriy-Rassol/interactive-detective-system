<script setup lang="ts">
import { useInvestigationStore } from '../stores/investigation'
import type { EvidenceItem } from '../types/investigation'

const props = defineProps<{ items?: EvidenceItem[]; editable?: boolean }>()
const store = useInvestigationStore()

function openItem(item: EvidenceItem) {
  alert(`${item.title}\n\n${item.description}\n\nФайл: ${item.fileName}`)
}
</script>

<template>
  <div class="evidence-grid">
    <article v-for="item in props.items ?? store.evidence" :key="item.id" class="evidence-card" @click="openItem(item)">
      <button class="pin" type="button" @click.stop="store.togglePinEvidence(item.id)">{{ item.pinned ? '★' : '☆' }}</button>
      <img :src="item.image" :alt="item.title" />
      <div>
        <strong>{{ item.title }}</strong>
        <span>{{ item.fileName }}</span>
        <small>{{ item.type }}</small>
      </div>
      <button v-if="props.editable" class="danger" type="button" @click.stop="store.removeEvidence(item.id)">Удалить</button>
    </article>
  </div>
</template>
