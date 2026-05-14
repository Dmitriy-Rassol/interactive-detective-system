<script setup lang="ts">
import { useInvestigationStore } from '../stores/investigation'
defineProps<{ large?: boolean }>()
const store = useInvestigationStore()
</script>
<template>
  <section class="panel cctv-panel">
    <div class="panel__head"><h3>Камеры наблюдения</h3><span>{{ store.selectedCamera.status }}</span></div>
    <div class="camera-frame" :class="{ large }">
      <img :src="store.selectedCamera.image" :alt="store.selectedCamera.title">
      <b class="live-dot">● {{ store.selectedCamera.status }}</b>
      <i class="scanline"></i>
    </div>
    <div class="camera-caption"><span>{{ store.selectedCamera.title }}</span><time>{{ store.selectedCamera.time }}</time></div>
    <div class="camera-switcher"><button v-for="camera in store.cameras" :key="camera.id" type="button" :class="{ active: camera.id === store.selectedCameraId }" @click="store.selectCamera(camera.id)">{{ camera.id }}</button></div>
  </section>
</template>
