<script setup lang="ts">
import { computed, ref } from 'vue'
import { useInvestigationStore } from '../stores/investigation'
import ModalWindow from '../widgets/ModalWindow.vue'
import type { IncidentPoint } from '../types/investigation'

const store = useInvestigationStore()
const selected = ref<IncidentPoint | null>(null)
const offset = ref({ x: 0, y: 0 })
const dragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const dragOrigin = ref({ x: 0, y: 0 })

const mapStyle = computed(() => ({
  transform: `translate3d(${offset.value.x}px, ${offset.value.y}px, 0)`
}))

function startDrag(event: PointerEvent) {
  const target = event.target as HTMLElement
  if (target.closest('button')) return
  dragging.value = true
  dragStart.value = { x: event.clientX, y: event.clientY }
  dragOrigin.value = { ...offset.value }
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function moveMap(event: PointerEvent) {
  if (!dragging.value) return
  const nextX = dragOrigin.value.x + event.clientX - dragStart.value.x
  const nextY = dragOrigin.value.y + event.clientY - dragStart.value.y
  offset.value = {
    x: Math.max(-180, Math.min(180, nextX)),
    y: Math.max(-120, Math.min(120, nextY))
  }
}

function stopDrag() {
  dragging.value = false
}

function resetMap() {
  offset.value = { x: 0, y: 0 }
}
</script>

<template>
  <section class="page">
    <div class="page-title">
      <div>
        <h1>Карта инцидентов</h1>
        <p>Перетаскивай карту мышкой. Точки кликабельные и открывают карточку события.</p>
      </div>
      <div class="title-actions">
        <select v-model="store.selectedCaseId" class="case-select">
          <option v-for="item in store.cases" :key="item.id" :value="item.id">{{ item.title }}</option>
        </select>
        <button class="primary-btn" type="button" @click="resetMap">Центрировать</button>
      </div>
    </div>

    <section
      class="panel fake-map interactive-map"
      :class="{ dragging }"
      @pointerdown="startDrag"
      @pointermove="moveMap"
      @pointerup="stopDrag"
      @pointercancel="stopDrag"
      @pointerleave="stopDrag"
    >
      <div class="map-canvas" :style="mapStyle">
        <div class="map-grid"></div>
        <div class="map-district district-one">Северный район</div>
        <div class="map-district district-two">Складской квартал</div>
        <div class="map-district district-three">Набережная</div>
        <div class="map-road road-main"></div>
        <div class="map-road road-second"></div>
        <div class="map-road road-third"></div>
        <div class="map-river"></div>
        <div class="map-block b1"></div>
        <div class="map-block b2"></div>
        <div class="map-block b3"></div>
        <div class="map-block b4"></div>
        <div class="map-block b5"></div>
        <button
          v-for="point in store.currentIncidents"
          :key="point.id"
          type="button"
          class="map-point"
          :class="point.type"
          :style="{ left: point.x + '%', top: point.y + '%' }"
          @click.stop="selected = point"
        >
          {{ point.title }}
        </button>
      </div>
      <div class="map-hint">DRAG MAP / CLICK INCIDENT</div>
    </section>

    <ModalWindow v-if="selected" title="Инцидент на карте" @close="selected = null">
      <h2>{{ selected.title }}</h2>
      <p>{{ selected.description }}</p>
      <dl>
        <dt>Время</dt><dd>{{ selected.time }}</dd>
        <dt>Дело</dt><dd>{{ selected.caseId }}</dd>
        <dt>Тип</dt><dd>{{ selected.type }}</dd>
      </dl>
    </ModalWindow>
  </section>
</template>
