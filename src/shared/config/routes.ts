export type RouteConfig = {
  isPrivate: boolean;
  headerTitle?: string;
}

export const routesConfig: Record<string, RouteConfig> = {
  '/': {
    isPrivate: false,
  },
  '/profile': {
    isPrivate: true,
    headerTitle: 'Профиль',
  },
  '/trips': {
    isPrivate: false,
    headerTitle: 'Попутчики',
  },
  '/trips/[id]': {
    isPrivate: false,
    headerTitle: 'Маршрут',
  },
  '/trips/create': {
    isPrivate: true,
    headerTitle: 'Направления',
  },
}
