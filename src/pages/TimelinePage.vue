<script setup lang="ts">
import { useInvestigationStore } from '../stores/investigation'
const store = useInvestigationStore()
</script>
<template>
  <section class="page">
    <div class="page-title"><div><h1>Хронология</h1><p>События показываются только по выбранному делу.</p></div><select v-model="store.selectedCaseId" class="case-select"><option v-for="item in store.cases" :key="item.id" :value="item.id">{{ item.title }}</option></select></div>
    <section class="panel selected-case-line"><strong>{{ store.selectedCase.title }}</strong><span>{{ store.selectedCase.id }} · {{ store.selectedCase.status }}</span></section>
    <div class="timeline-list">
      <article v-for="item in store.currentTimeline" :key="item.id" class="timeline-item"><b>{{ item.time }}</b><div><strong>{{ item.title }}</strong><p>{{ item.detail }}</p></div></article>
    </div>
  </section>
</template>
