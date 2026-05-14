import type { CameraFeed, CaseFile, EvidenceItem, IncidentPoint, NotificationItem, ReportItem, Suspect, TimelineEvent } from '../types/investigation'

export const cases: CaseFile[] = [
  {
    id: 'BW-2026-0417',
    title: 'Убийство в Блэквуде',
    status: 'В работе',
    priority: 'Высокий',
    detective: 'Детектив Миллер',
    opened: '17 апреля 2026',
    location: 'Главная улица, Блэквуд',
    description: 'Ночная сцена преступления возле старого квартала. Камеры зафиксировали три подозрительных силуэта.',
    summary: 'Главное дело отдела: связаны видеозапись CAM_07, часы жертвы и образец крови B-2781.',
    image: '/assets/crime-scene.png'
  },
  {
    id: 'RD-2026-0502',
    title: 'Исчезновение на Ривер-драйв',
    status: 'На проверке',
    priority: 'Средний',
    detective: 'Детектив Орлова',
    opened: '2 мая 2026',
    location: 'Ривер-драйв, склад №4',
    description: 'Пропал свидетель по делу о подмене финансовых документов. Последний сигнал телефона был возле склада.',
    summary: 'Нужна проверка маршрутов свидетеля и финансовых документов из склада №4.',
    image: '/assets/document1.png'
  },
  {
    id: 'CM-2026-0311',
    title: 'Архив «Красная папка»',
    status: 'Закрыто',
    priority: 'Низкий',
    detective: 'Детектив Волков',
    opened: '11 марта 2026',
    location: 'Центральный архив',
    description: 'Восстановлены утерянные записи камер и цепочка передачи улик.',
    summary: 'Дело закрыто после восстановления архивных записей и подтверждения цепочки хранения.',
    image: '/assets/watch.png'
  }
]

export const evidence: EvidenceItem[] = [
  { id: 'EV-001', title: 'Фото с места преступления', type: 'Фото', fileName: 'IMG_2026_0417_001.jpg', caseId: 'BW-2026-0417', image: '/assets/crime-scene.png', description: 'Главная улица, следы борьбы, два маркера улик.', pinned: true },
  { id: 'EV-002', title: 'Часы жертвы', type: 'Фото', fileName: 'EVID_2026_0417_042.jpg', caseId: 'BW-2026-0417', image: '/assets/watch.png', description: 'Стрелки остановились в 01:53. На ремешке есть повреждение.', pinned: true },
  { id: 'EV-003', title: 'Видео с камеры', type: 'Видео', fileName: 'CAM_07_2026_0417.mp4', caseId: 'BW-2026-0417', image: '/assets/cctv-street.png', description: 'Запись с главной улицы. Видны два автомобиля и силуэт у входа.', pinned: true },
  { id: 'EV-004', title: 'Образец крови', type: 'Биоматериал', fileName: 'B-2781', caseId: 'BW-2026-0417', image: '/assets/blood-sample.png', description: 'Передан в лабораторию. Результаты частично совпали с базой.', pinned: true },
  { id: 'EV-005', title: 'Показания свидетеля', type: 'Документ', fileName: 'WS_2026_0418_02.pdf', caseId: 'BW-2026-0417', image: '/assets/document1.png', description: 'Свидетель слышал короткий спор за 12 минут до вызова полиции.', pinned: true },
  { id: 'EV-006', title: 'Аудиозапись звонка', type: 'Аудио', fileName: 'CALL_0417_0312.wav', caseId: 'BW-2026-0417', image: '/assets/audio.png', description: 'Фрагмент звонка на 03:12. На фоне слышен шум дождя и сирена.', pinned: false },
  { id: 'EV-007', title: 'Финансовая ведомость', type: 'Документ', fileName: 'RD_DOC_0502.pdf', caseId: 'RD-2026-0502', image: '/assets/document2.png', description: 'Последний документ, который проверял пропавший свидетель.', pinned: false }
]

export const suspects: Suspect[] = [
  { id: 'SP-01', name: 'Джонатан Блэквуд', age: 42, status: 'Под стражей', caseId: 'BW-2026-0417', risk: 84, notes: 'Был замечен рядом с местом преступления.', image: '/assets/1.png', biography: 'Бывший владелец ночного клуба. Имеет конфликт с жертвой из-за долгов и показаний по старому делу. Последние две недели избегал официальных встреч.' },
  { id: 'SP-02', name: 'Майкл Рид', age: 35, status: 'Под наблюдением', caseId: 'BW-2026-0417', risk: 61, notes: 'Фигурирует в звонках жертвы.', image: '/assets/4.png', biography: 'Техник систем безопасности. Обслуживал камеры на Главной улице и имел доступ к архиву CAM_07. Утверждает, что в ночь преступления был дома.' },
  { id: 'SP-03', name: 'Дэниел Картер', age: 29, status: 'В розыске', caseId: 'BW-2026-0417', risk: 73, notes: 'Покинул город утром после инцидента.', image: '/assets/3.png', biography: 'Курьер, работал на складах в районе Ривер-драйв. Связан с машиной, замеченной на записи камеры через 7 минут после преступления.' },
  { id: 'SP-04', name: 'Анна Моррис', age: 31, status: 'Под наблюдением', caseId: 'RD-2026-0502', risk: 48, notes: 'Последний контакт пропавшего свидетеля.', image: '/assets/2.png', biography: 'Бухгалтер склада №4. Перед исчезновением свидетеля получила от него зашифрованный архив документов.' }
]

export const cameras: CameraFeed[] = [
  { id: 'CAM_07', title: 'CAM_07 — Главная улица', location: 'Блэквуд / Главная улица', image: '/assets/cctv-street2.png', status: 'В эфире', time: '15:42:07' },
  { id: 'CAM_11', title: 'CAM_11 — Северный переулок', location: 'Северный переулок', image: '/assets/cctv-street1.png', status: 'В эфире', time: '03:17:44' },
  { id: 'CAM_19', title: 'CAM_19 — Вход в архив', location: 'Центральный архив', image: '/assets/cctv-street.png', status: 'В эфире', time: '15:44:19' }
]

export const timeline: TimelineEvent[] = [
  { id: 'TL-01', caseId: 'BW-2026-0417', time: '03:05', title: 'Последний звонок жертвы', detail: 'Сигнал поступил с района Главной улицы.' },
  { id: 'TL-02', caseId: 'BW-2026-0417', time: '03:12', title: 'Аудио зафиксировало спор', detail: 'На записи различимы две мужские реплики.' },
  { id: 'TL-03', caseId: 'BW-2026-0417', time: '03:17', title: 'Остановка часов', detail: 'Часы жертвы повреждены механически.' },
  { id: 'TL-04', caseId: 'BW-2026-0417', time: '03:24', title: 'Камера CAM_07 теряет объект', detail: 'Автомобиль выходит из зоны видимости.' },
  { id: 'TL-05', caseId: 'RD-2026-0502', time: '21:10', title: 'Свидетель покинул офис', detail: 'Последняя отметка пропуска на турникете.' },
  { id: 'TL-06', caseId: 'RD-2026-0502', time: '21:43', title: 'Телефон найден у склада', detail: 'Устройство обнаружено без SIM-карты.' }
]

export const notifications: NotificationItem[] = [
  { id: 'N-01', title: 'Новая улика', text: 'Добавлена аудиозапись звонка CALL_0417_0312.wav', time: '15:21', level: 'info', read: false },
  { id: 'N-02', title: 'Риск подозреваемого вырос', text: 'Дэниел Картер покинул город утром после инцидента.', time: '14:58', level: 'warning', read: false },
  { id: 'N-03', title: 'Анализ крови завершен', text: 'Образец B-2781 частично совпал с архивной базой.', time: '14:33', level: 'success', read: true },
  { id: 'N-04', title: 'Камера недоступна', text: 'CAM_11 переведена в архивный режим.', time: '13:48', level: 'danger', read: true }
]

export const reports: ReportItem[] = [
  { id: 'REP-0417-01', title: 'Первичный отчет по месту преступления', caseId: 'BW-2026-0417', createdAt: '18 апреля 2026', author: 'Детектив Миллер', status: 'Готов', pages: 12 },
  { id: 'REP-0417-02', title: 'Сводка по подозреваемым', caseId: 'BW-2026-0417', createdAt: '19 апреля 2026', author: 'Детектив Миллер', status: 'На проверке', pages: 8 },
  { id: 'REP-0502-01', title: 'Финансовые документы склада №4', caseId: 'RD-2026-0502', createdAt: '5 мая 2026', author: 'Детектив Орлова', status: 'Черновик', pages: 19 }
]

export const incidents: IncidentPoint[] = [
  { id: 'M-01', caseId: 'BW-2026-0417', title: 'Место преступления', x: 31, y: 44, type: 'crime', time: '03:17', description: 'Обнаружены следы борьбы, кровь и поврежденные часы жертвы.' },
  { id: 'M-02', caseId: 'BW-2026-0417', title: 'Камера CAM_07', x: 61, y: 35, type: 'camera', time: '03:24', description: 'Зафиксирован автомобиль, покидающий район.' },
  { id: 'M-03', caseId: 'BW-2026-0417', title: 'Свидетель', x: 48, y: 70, type: 'witness', time: '03:12', description: 'Слышал спор и короткий сигнал автомобиля.' },
  { id: 'M-04', caseId: 'RD-2026-0502', title: 'Склад №4', x: 73, y: 54, type: 'crime', time: '21:43', description: 'Найден телефон пропавшего свидетеля.' }
]
