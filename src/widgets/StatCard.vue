<script setup lang="ts">
defineProps<{ icon: string; label: string; value: string | number; note?: string }>()
</script>
<template>
  <article class="stat-card">
    <span class="stat-card__icon">{{ icon }}</span>
    <div><span>{{ label }}</span><strong>{{ value }}</strong><small>{{ note }}</small></div>
  </article>
</template>
