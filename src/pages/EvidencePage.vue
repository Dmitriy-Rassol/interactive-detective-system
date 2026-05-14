<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useInvestigationStore } from '../stores/investigation'
import ModalWindow from '../widgets/ModalWindow.vue'
import type { EvidenceItem, EvidenceType } from '../types/investigation'
const store = useInvestigationStore()
const selected = ref<EvidenceItem | null>(null)
const touched = ref(false)
const form = reactive<{ title: string; type: EvidenceType | ''; fileName: string; description: string }>({ title: '', type: '', fileName: '', description: '' })
const isValid = computed(() => Boolean(form.title.trim() && form.type && form.fileName.trim() && form.description.trim()))
function submit() {
  touched.value = true
  if (!isValid.value) return
  const ok = store.addEvidence({ ...form })
  if (ok) { form.title = ''; form.type = ''; form.fileName = ''; form.description = ''; touched.value = false }
}
</script>
<template>
  <section class="page">
    <div class="page-title"><div><h1>Улики</h1><p>Кликабельная база улик, добавление и удаление без alert.</p></div></div>
    <form class="evidence-form" @submit.prevent="submit">
      <input v-model="form.title" placeholder="Название улики">
      <div class="custom-select"><select v-model="form.type"><option value="" disabled>Тип улики</option><option>Фото</option><option>Видео</option><option>Документ</option><option>Аудио</option><option>Биоматериал</option></select></div>
      <input v-model="form.fileName" placeholder="Имя файла">
      <input v-model="form.description" placeholder="Описание">
      <button type="submit" :disabled="!isValid">Добавить</button>
    </form>
    <p v-if="touched && !isValid" class="form-error">Заполните все поля перед добавлением улики.</p>
    <div class="evidence-grid">
      <article v-for="item in store.evidence" :key="item.id" class="evidence-card" @click="selected = item">
        <button class="pin" type="button" @click.stop="store.togglePinEvidence(item.id)">{{ item.pinned ? '★' : '☆' }}</button>
        <img :src="item.image" :alt="item.title"><div><strong>{{ item.title }}</strong><span>{{ item.fileName }}</span><small>{{ item.type }}</small></div>
        <button class="danger" type="button" @click.stop="store.removeEvidence(item.id)">Удалить</button>
      </article>
    </div>
    <ModalWindow v-if="selected" title="Улика" @close="selected = null">
      <div class="evidence-modal"><img :src="selected.image" :alt="selected.title"><h2>{{ selected.title }}</h2><p>{{ selected.description }}</p><dl><dt>ID</dt><dd>{{ selected.id }}</dd><dt>Тип</dt><dd>{{ selected.type }}</dd><dt>Файл</dt><dd>{{ selected.fileName }}</dd><dt>Дело</dt><dd>{{ selected.caseId }}</dd></dl></div>
    </ModalWindow>
  </section>
</template>
