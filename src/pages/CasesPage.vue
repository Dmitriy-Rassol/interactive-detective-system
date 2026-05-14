<script setup lang="ts">
import { computed, ref } from 'vue'
import { useInvestigationStore } from '../stores/investigation'
import ModalWindow from '../widgets/ModalWindow.vue'
const store = useInvestigationStore()
const openedId = ref<string | null>(null)
const openedCase = computed(() => store.cases.find(c => c.id === openedId.value))
function openCase(id: string) { store.selectCase(id); openedId.value = id }
</script>
<template>
  <section class="page">
    <div class="page-title"><div><h1>Дела</h1><p>Список расследований. Каждое дело открывается отдельно.</p></div></div>
    <div class="case-list">
      <article v-for="item in store.cases" :key="item.id" class="case-row" @click="openCase(item.id)">
        <img :src="item.image" :alt="item.title"><div><strong>{{ item.title }}</strong><span>{{ item.id }}</span><p>{{ item.summary }}</p></div><b class="priority">{{ item.priority }}</b><button type="button">Открыть</button>
      </article>
    </div>
    <ModalWindow v-if="openedCase" title="Карточка дела" @close="openedId = null">
      <div class="case-modal">
        <img :src="openedCase.image" :alt="openedCase.title">
        <h2>{{ openedCase.title }}</h2>
        <p>{{ openedCase.description }}</p>
        <dl><dt>ID дела</dt><dd>{{ openedCase.id }}</dd><dt>Статус</dt><dd>{{ openedCase.status }}</dd><dt>Ведущий</dt><dd>{{ openedCase.detective }}</dd><dt>Локация</dt><dd>{{ openedCase.location }}</dd><dt>Открыто</dt><dd>{{ openedCase.opened }}</dd></dl>
      </div>
    </ModalWindow>
  </section>
</template>
