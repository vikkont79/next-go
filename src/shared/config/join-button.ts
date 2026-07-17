export type JoinRequestStatus = 'idle' | 'pending' | 'approved' | 'rejected'

export const JOIN_BUTTON_STATUSES: Record<JoinRequestStatus, { text: string; disabled: boolean }> = {
  idle: { text: 'Хочу!', disabled: false },
  pending: { text: 'Жду', disabled: true },
  approved: { text: 'Еду', disabled: true },
  rejected: { text: 'Не еду', disabled: true },
}
