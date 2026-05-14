<script setup lang="ts">
import { useInvestigationStore } from '../stores/investigation'
import CctvPanel from '../widgets/CctvPanel.vue'
const store = useInvestigationStore()
</script>
<template>
  <section class="page">
    <div class="page-title"><div><h1>Камеры</h1><p>Переключение между камерами наблюдения.</p></div></div>
    <div class="camera-page-grid"><section class="panel"><div class="panel__head"><h3>Список камер</h3></div><div class="camera-list"><button v-for="camera in store.cameras" :key="camera.id" type="button" :class="{ active: camera.id === store.selectedCameraId }" @click="store.selectCamera(camera.id)"><strong>{{ camera.title }}</strong><small>{{ camera.location }} · {{ camera.status }}</small></button></div></section><CctvPanel large /></div>
  </section>
</template>
