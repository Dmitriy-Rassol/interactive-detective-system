import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { cameras as cameraSeed, cases as caseSeed, evidence as evidenceSeed, incidents as incidentSeed, notifications as notificationSeed, reports as reportSeed, suspects as suspectSeed, timeline as timelineSeed } from '../data/mock'
import type { CameraFeed, CaseFile, EvidenceItem, EvidenceType, IncidentPoint, NotificationItem, ReportItem, Suspect, TimelineEvent } from '../types/investigation'

export const useInvestigationStore = defineStore('investigation', () => {
  const cases = ref<CaseFile[]>([...caseSeed])
  const evidence = ref<EvidenceItem[]>([...evidenceSeed])
  const suspects = ref<Suspect[]>([...suspectSeed])
  const cameras = ref<CameraFeed[]>([...cameraSeed])
  const timeline = ref<TimelineEvent[]>([...timelineSeed])
  const notifications = ref<NotificationItem[]>([...notificationSeed])
  const reports = ref<ReportItem[]>([...reportSeed])
  const incidents = ref<IncidentPoint[]>([...incidentSeed])
  const selectedCaseId = ref(cases.value[0]?.id ?? '')
  const selectedCameraId = ref(cameras.value[0]?.id ?? '')
  const isAuthorized = ref(true)

  const selectedCase = computed(() => cases.value.find((item) => item.id === selectedCaseId.value) ?? cases.value[0])
  const selectedCamera = computed(() => cameras.value.find((item) => item.id === selectedCameraId.value) ?? cameras.value[0])
  const pinnedEvidence = computed(() => evidence.value.filter((item) => item.pinned))
  const currentEvidence = computed(() => evidence.value.filter((item) => item.caseId === selectedCaseId.value))
  const currentSuspects = computed(() => suspects.value.filter((item) => item.caseId === selectedCaseId.value))
  const currentTimeline = computed(() => timeline.value.filter((item) => item.caseId === selectedCaseId.value))
  const currentIncidents = computed(() => incidents.value.filter((item) => item.caseId === selectedCaseId.value))
  const unreadNotifications = computed(() => notifications.value.filter((item) => !item.read).length)

  function login() { isAuthorized.value = true }
  function logout() { isAuthorized.value = false }
  function selectCase(id: string) { selectedCaseId.value = id }
  function selectCamera(id: string) { selectedCameraId.value = id }
  function markAllNotificationsRead() { notifications.value = notifications.value.map((item) => ({ ...item, read: true })) }

  function addEvidence(payload: { title: string; type: EvidenceType | ''; fileName: string; description: string; caseId?: string }) {
    if (!payload.title.trim() || !payload.type || !payload.fileName.trim() || !payload.description.trim()) return false
    const assetByType: Record<EvidenceType, string> = {
      Фото: '/assets/crime-scene.svg',
      Видео: '/assets/cctv-street.svg',
      Документ: '/assets/document.svg',
      Аудио: '/assets/audio.svg',
      Биоматериал: '/assets/blood-sample.svg'
    }
    evidence.value.unshift({
      id: `EV-${String(Date.now()).slice(-5)}`,
      title: payload.title.trim(),
      type: payload.type,
      fileName: payload.fileName.trim(),
      description: payload.description.trim(),
      caseId: payload.caseId || selectedCaseId.value,
      image: assetByType[payload.type],
      pinned: false
    })
    notifications.value.unshift({ id: `N-${Date.now()}`, title: 'Улика добавлена', text: payload.title.trim(), time: 'сейчас', level: 'success', read: false })
    return true
  }

  function removeEvidence(id: string) { evidence.value = evidence.value.filter((item) => item.id !== id) }
  function togglePinEvidence(id: string) { const item = evidence.value.find((target) => target.id === id); if (item) item.pinned = !item.pinned }
  function searchSuspects(query: string) { const normalized = query.trim().toLowerCase(); return suspects.value.filter((suspect) => suspect.name.toLowerCase().includes(normalized)) }
  function searchEvidence(query: string) { const normalized = query.trim().toLowerCase(); return evidence.value.filter((item) => item.title.toLowerCase().includes(normalized) || item.fileName.toLowerCase().includes(normalized)) }
  function searchCases(query: string) { const normalized = query.trim().toLowerCase(); return cases.value.filter((item) => item.title.toLowerCase().includes(normalized) || item.id.toLowerCase().includes(normalized)) }

  return { cases, evidence, suspects, cameras, timeline, notifications, reports, incidents, selectedCaseId, selectedCameraId, isAuthorized, selectedCase, selectedCamera, pinnedEvidence, currentEvidence, currentSuspects, currentTimeline, currentIncidents, unreadNotifications, login, logout, selectCase, selectCamera, markAllNotificationsRead, addEvidence, removeEvidence, togglePinEvidence, searchSuspects, searchEvidence, searchCases }
})
