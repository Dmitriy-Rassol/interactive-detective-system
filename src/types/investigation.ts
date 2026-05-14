export type CaseStatus = 'В работе' | 'На проверке' | 'Закрыто'
export type Priority = 'Высокий' | 'Средний' | 'Низкий'
export type EvidenceType = 'Фото' | 'Видео' | 'Документ' | 'Аудио' | 'Биоматериал'

export interface CaseFile {
  id: string
  title: string
  status: CaseStatus
  priority: Priority
  detective: string
  opened: string
  location: string
  description: string
  image: string
  summary: string
}

export interface EvidenceItem {
  id: string
  title: string
  type: EvidenceType
  fileName: string
  caseId: string
  image: string
  description: string
  pinned: boolean
}

export interface Suspect {
  id: string
  name: string
  age: number
  status: 'Под стражей' | 'Под наблюдением' | 'В розыске'
  caseId: string
  risk: number
  notes: string
  biography: string
  image: string
}

export interface CameraFeed {
  id: string
  title: string
  location: string
  image: string
  status: 'В эфире' | 'Архив' | 'Недоступна'
  time: string
}

export interface TimelineEvent {
  id: string
  caseId: string
  time: string
  title: string
  detail: string
}

export interface NotificationItem {
  id: string
  title: string
  text: string
  time: string
  level: 'info' | 'warning' | 'danger' | 'success'
  read: boolean
}

export interface ReportItem {
  id: string
  title: string
  caseId: string
  createdAt: string
  author: string
  status: 'Черновик' | 'Готов' | 'На проверке'
  pages: number
}

export interface IncidentPoint {
  id: string
  title: string
  caseId: string
  x: number
  y: number
  type: 'crime' | 'camera' | 'witness'
  description: string
  time: string
}
