<script setup lang="ts">
import { useInvestigationStore } from '../stores/investigation'
const store = useInvestigationStore()
</script>
<template>
  <section class="panel case-hero">
    <div>
      <div class="panel__head"><h3>Активное дело</h3></div>
      <h2>{{ store.selectedCase.title }}</h2>
      <p class="priority">● {{ store.selectedCase.priority }} приоритет</p>
      <p>ID дела: {{ store.selectedCase.id }}</p>
      <p>Ведущий детектив: {{ store.selectedCase.detective }}</p>
      <p>Статус: {{ store.selectedCase.status }}</p>
      <p>Открыто: {{ store.selectedCase.opened }}</p>
      <RouterLink to="/cases"><button type="button">Открыть дело</button></RouterLink>
    </div>
    <img :src="store.selectedCase.image" :alt="store.selectedCase.title" />
  </section>
</template>
