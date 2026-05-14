import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../pages/DashboardPage.vue'
import CasesPage from '../pages/CasesPage.vue'
import EvidencePage from '../pages/EvidencePage.vue'
import TerminalPage from '../pages/TerminalPage.vue'
import CctvPage from '../pages/CctvPage.vue'
import SuspectsPage from '../pages/SuspectsPage.vue'
import TimelinePage from '../pages/TimelinePage.vue'
import MapPage from '../pages/MapPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'
import ReportsPage from '../pages/ReportsPage.vue'
import NotificationsPage from '../pages/NotificationsPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardPage, meta: { title: 'Панель управления' } },
    { path: '/cases', name: 'cases', component: CasesPage, meta: { title: 'Дела' } },
    { path: '/evidence', name: 'evidence', component: EvidencePage, meta: { title: 'Улики' } },
    { path: '/suspects', name: 'suspects', component: SuspectsPage, meta: { title: 'Подозреваемые' } },
    { path: '/timeline', name: 'timeline', component: TimelinePage, meta: { title: 'Хронология' } },
    { path: '/cctv', name: 'cctv', component: CctvPage, meta: { title: 'Камеры' } },
    { path: '/map', name: 'map', component: MapPage, meta: { title: 'Карта инцидентов' } },
    { path: '/terminal', name: 'terminal', component: TerminalPage, meta: { title: 'Терминал' } },
    { path: '/notifications', name: 'notifications', component: NotificationsPage, meta: { title: 'Уведомления' } },
    { path: '/reports', name: 'reports', component: ReportsPage, meta: { title: 'Отчеты' } },
    { path: '/settings', name: 'settings', component: SettingsPage, meta: { title: 'Настройки' } }
  ]
})
