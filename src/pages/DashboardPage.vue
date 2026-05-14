<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useInvestigationStore } from '../stores/investigation'
import StatCard from '../widgets/StatCard.vue'
import ActivityPanel from '../widgets/ActivityPanel.vue'
import CctvPanel from '../widgets/CctvPanel.vue'
import TerminalPanel from '../widgets/TerminalPanel.vue'
import AudioPanel from '../widgets/AudioPanel.vue'
import ChartsRow from '../widgets/ChartsRow.vue'
import ModalWindow from '../widgets/ModalWindow.vue'

const router = useRouter()
const store = useInvestigationStore()
const openedId = ref<string | null>(null)
const openedCase = computed(() => store.cases.find(c => c.id === openedId.value))
function openCaseModal(id: string) { store.selectCase(id); openedId.value = id }
</script>
<template>
  <section class="page">
    <div class="page-title">
      <div><h1>Панель управления</h1><p>Общая сводка отдела расследований и состояние системы</p></div>
      <div class="title-actions"><div class="date-box">14 мая 2026<br>15:42:07</div><div class="rec-button">● Запись</div></div>
    </div>
    <div class="stats-grid">
      <StatCard icon="▤" label="Активные дела" :value="String(store.cases.filter(c => c.status !== 'Закрыто').length)" note="+2 за неделю" />
      <StatCard icon="◈" label="Улики" :value="String(store.evidence.length)" note="в базе отдела" />
      <StatCard icon="♙" label="Подозреваемые" :value="String(store.suspects.length)" note="3 под наблюдением" />
      <StatCard icon="◉" label="Уведомления" :value="String(store.unreadNotifications)" note="новые события" />
    </div>
    <div class="main-grid">
      <div>
        <div class="two-col">
          <section class="panel overview-panel">
            <div class="panel__head"><h3>Общая оперативная сводка</h3><span>IDS / CENTER</span></div>
            <h2>Центр расследований</h2>
            <p>Система объединяет дела, улики, камеры, хронологию событий, подозреваемых, отчеты и карту инцидентов. Панель показывает состояние всего отдела, а не конкретного дела.</p>
            <div class="overview-actions">
              <button @click="router.push('/cases')">Все дела</button>
              <button @click="router.push('/evidence')">База улик</button>
            </div>
          </section>
          <ActivityPanel />
        </div>
        <ChartsRow />
        <section class="panel">
          <div class="panel__head"><h3>Последние активные дела</h3><RouterLink to="/cases">Все дела</RouterLink></div>
          <div class="mini-cases">
            <button v-for="item in store.cases" :key="item.id" type="button" @click="openCaseModal(item.id)">
              <img :src="item.image" :alt="item.title"><strong>{{ item.title }}</strong><span>{{ item.status }} · {{ item.priority }}</span>
            </button>
          </div>
        </section>
      </div>
      <aside class="right-rail"><CctvPanel /><TerminalPanel compact /><AudioPanel /></aside>
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
