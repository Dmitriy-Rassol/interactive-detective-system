<script setup lang="ts">
import { useInvestigationStore } from '../stores/investigation'
const store = useInvestigationStore()
</script>
<template>
  <section class="panel">
    <div class="panel__head"><h3>Последняя активность</h3><RouterLink to="/notifications">Показать все</RouterLink></div>
    <div class="activity-list">
      <div v-for="item in store.notifications.slice(0,5)" :key="item.id" class="activity-item"><span>{{ item.time }}</span><div><strong>{{ item.title }}</strong><small>{{ item.text }}</small></div></div>
    </div>
  </section>
</template>
