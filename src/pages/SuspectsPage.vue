<script setup lang="ts">
import { ref } from 'vue'
import { useInvestigationStore } from '../stores/investigation'
import ModalWindow from '../widgets/ModalWindow.vue'
import type { Suspect } from '../types/investigation'
const store = useInvestigationStore()
const selected = ref<Suspect | null>(null)
</script>
<template>
  <section class="page">
    <div class="page-title"><div><h1>Подозреваемые</h1><p>При клике открывается биография и данные по делу.</p></div></div>
    <div class="suspect-grid">
      <article v-for="item in store.suspects" :key="item.id" class="panel suspect-card clickable" @click="selected = item">
        <img :src="item.image" :alt="item.name"><h3>{{ item.name }}</h3><p>{{ item.notes }}</p><div class="risk"><span :style="{ width: item.risk + '%' }"></span></div><small>Риск: {{ item.risk }}% · {{ item.status }}</small>
      </article>
    </div>
    <ModalWindow v-if="selected" title="Биография подозреваемого" @close="selected = null">
      <div class="suspect-modal"><img :src="selected.image" :alt="selected.name"><h2>{{ selected.name }}</h2><p>{{ selected.biography }}</p><dl><dt>Возраст</dt><dd>{{ selected.age }}</dd><dt>Статус</dt><dd>{{ selected.status }}</dd><dt>Дело</dt><dd>{{ selected.caseId }}</dd><dt>Риск</dt><dd>{{ selected.risk }}%</dd></dl></div>
    </ModalWindow>
  </section>
</template>
