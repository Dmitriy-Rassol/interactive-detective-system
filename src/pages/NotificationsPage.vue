<script setup lang="ts">
import { computed, ref } from 'vue'
import { useInvestigationStore } from '../stores/investigation'
import ModalWindow from '../widgets/ModalWindow.vue'
const store = useInvestigationStore()
const openedId = ref<string | null>(null)
const openedNotification = computed(() => store.notifications.find(item => item.id === openedId.value))
const levelLabel: Record<string, string> = { danger: 'Критично', warning: 'Внимание', success: 'Выполнено', info: 'Информация' }
function openNotification(id: string) {
  openedId.value = id
  const item = store.notifications.find(target => target.id === id)
  if (item) item.read = true
}
</script>
<template>
  <section class="page">
    <div class="page-title"><div><h1>Уведомления</h1><p>События системы и новые сигналы по расследованиям.</p></div><button class="primary-btn" type="button" @click="store.markAllNotificationsRead">Отметить прочитанными</button></div>
    <div class="notification-list">
      <article v-for="item in store.notifications" :key="item.id" class="panel notification-item clickable" :class="[item.level, { unread: !item.read }]" @click="openNotification(item.id)">
        <b>{{ item.time }}</b><div><strong>{{ item.title }}</strong><p>{{ item.text }}</p></div><span>{{ item.read ? 'Прочитано' : 'Новое' }}</span>
      </article>
    </div>
    <ModalWindow v-if="openedNotification" title="Уведомление" @close="openedId = null">
      <div class="notification-modal">
        <span class="notification-badge" :class="openedNotification.level">{{ levelLabel[openedNotification.level] || 'Информация' }}</span>
        <h2>{{ openedNotification.title }}</h2>
        <p>{{ openedNotification.text }}</p>
        <dl><dt>Время</dt><dd>{{ openedNotification.time }}</dd><dt>Статус</dt><dd>{{ openedNotification.read ? 'Прочитано' : 'Новое' }}</dd><dt>Тип</dt><dd>{{ levelLabel[openedNotification.level] || 'Информация' }}</dd></dl>
      </div>
    </ModalWindow>
  </section>
</template>
