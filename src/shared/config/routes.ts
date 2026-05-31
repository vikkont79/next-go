export type RouteConfig = {
  withAvatar: boolean;
  headerTitle?: string;
}

export const routesConfig: Record<string, RouteConfig> = {
  '/': {
    withAvatar: false,
  },
  '/profile': {
    withAvatar: true,
    headerTitle: 'Профиль',
  },
  '/profile/': {
    withAvatar: false,
    headerTitle: 'Профиль',
  },
  '/trips': {
    withAvatar: false,
    headerTitle: 'Попутчики',
  },
  '/trips/[id]': {
    withAvatar: false,
    headerTitle: 'Маршрут',
  },
  '/trips/create': {
    withAvatar: true,
    headerTitle: 'Направления',
  },
}
