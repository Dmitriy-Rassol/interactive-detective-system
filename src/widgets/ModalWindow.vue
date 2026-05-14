<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title: string }>()
const emit = defineEmits<{ close: [] }>()
const visible = ref(true)

function requestClose() {
  visible.value = false
}

function afterLeave() {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade" appear @after-leave="afterLeave">
      <div v-if="visible" class="modal-backdrop" @click.self="requestClose">
        <section class="modal-window panel">
          <header>
            <h3>{{ title }}</h3>
            <button type="button" @click="requestClose">Х</button>
          </header>
          <slot />
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
