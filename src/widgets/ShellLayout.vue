<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useInvestigationStore } from '../stores/investigation'

const route = useRoute()
const router = useRouter()
const store = useInvestigationStore()
const searchOpen = ref(false)
const query = ref('')
const sidebarCollapsed = ref(false)

const title = computed(() => String(route.meta.title || 'Панель управления'))
const results = computed(() => {
  if (!query.value.trim()) return []
  return [
    ...store.searchCases(query.value).map((item) => ({ label: item.title, type: 'Дело', action: () => { store.selectCase(item.id); router.push('/cases') } })),
    ...store.searchEvidence(query.value).map((item) => ({ label: item.title, type: 'Улика', action: () => router.push('/evidence') })),
    ...store.searchSuspects(query.value).map((item) => ({ label: item.name, type: 'Подозреваемый', action: () => { store.selectCase(item.caseId); router.push('/suspects') } }))
  ].slice(0, 8)
})

const navItems = [
  { to: '/', icon: '⌂', label: 'Панель управления' },
  { to: '/cases', icon: '▤', label: 'Дела' },
  { to: '/evidence', icon: '◈', label: 'Улики' },
  { to: '/suspects', icon: '♙', label: 'Подозреваемые' },
  { to: '/timeline', icon: '⌁', label: 'Хронология' },
  { to: '/cctv', icon: '▣', label: 'Камеры' },
  { to: '/map', icon: '◇', label: 'Карта' },
  { to: '/terminal', icon: '›_', label: 'Терминал' },
  { to: '/notifications', icon: '◉', label: 'Уведомления' },
  { to: '/reports', icon: '☷', label: 'Отчеты' },
  { to: '/settings', icon: '⚙', label: 'Настройки' }
]

function logout() { store.logout() }
function goSettings() { router.push('/settings') }
function goNotifications() { router.push('/notifications') }
function toggleSidebar() { sidebarCollapsed.value = !sidebarCollapsed.value }
</script>

<template>
  <div class="shell" :class="{ 'shell--collapsed': sidebarCollapsed }">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand__top">
          <strong>IDS</strong>
          <button type="button" class="sidebar-toggle" :title="sidebarCollapsed ? 'Развернуть меню' : 'Свернуть меню'" @click="toggleSidebar">X</button>
        </div>
        <small>v1.4.0</small>
        <p>ИНТЕРАКТИВНАЯ<br>ДЕТЕКТИВНАЯ<br>СИСТЕМА</p>
      </div>
      <nav class="nav">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav__item" active-class="nav__item--active" :class="{ 'nav__item--active': item.to === '/' && route.path === '/' }" :title="sidebarCollapsed ? item.label : undefined">
          <span class="nav__icon">{{ item.icon }}</span>
          <span class="nav__label">{{ item.label }}</span>
        </RouterLink>
      </nav>
      <div class="profile-card">
        <img src="/assets/detective.png" alt="Детектив">
        <div class="profile-card__text"><strong>Детектив Миллер</strong><span>ID: 28475</span></div>
      </div>
      <button class="logout" type="button" @click="logout"><span class="logout__icon">↪</span><span class="logout__text">Выйти</span></button>
    </aside>

    <main class="content">
      <header class="topbar">
        <div class="breadcrumb">// {{ title }}</div>
        <div class="topbar__actions">
          <button type="button" class="top-icon" title="Поиск" @click="searchOpen = !searchOpen">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/></svg>
          </button>
          <button type="button" class="top-icon bell" title="Уведомления" @click="goNotifications">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z"/><path d="M10 21h4"/></svg>
            <b v-if="store.unreadNotifications">{{ store.unreadNotifications }}</b>
          </button>
          <button type="button" class="top-icon" title="Настройки" @click="goSettings">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M4 12h2m12 0h2M12 4v2m0 12v2M6.5 6.5l1.4 1.4m8.2 8.2 1.4 1.4m0-11-1.4 1.4m-8.2 8.2-1.4 1.4"/></svg>
          </button>
        </div>
      </header>
      <div v-if="searchOpen" class="search-panel">
        <input v-model="query" placeholder="Поиск по делам, уликам, подозреваемым..." autofocus>
        <div v-if="results.length" class="search-results">
          <button v-for="result in results" :key="result.type + result.label" type="button" @click="result.action(); searchOpen=false; query=''">
            <strong>{{ result.label }}</strong><span>{{ result.type }}</span>
          </button>
        </div>
        <p v-else-if="query" class="muted">Ничего не найдено</p>
      </div>
      <RouterView />
    </main>
  </div>
</template>
