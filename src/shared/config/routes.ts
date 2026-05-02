export type RouteConfig = {
  title: string;
  isPrivate: boolean;
  headerTitle?: string; // подпись в хедере (как "Направления" на скриншоте)
  headerAction?: 'auth' | 'userInfo'; // что показывать справа в хедере
}

export const routesConfig: Record<string, RouteConfig> = {
  '/': {
    title: 'Главная',
    isPrivate: false,
    headerAction: 'auth',
  },
  '/profile': {
    title: 'Профиль',
    isPrivate: true,
    headerTitle: 'Профиль',
    headerAction: 'userInfo',
  },
  '/trips/create': {
    title: 'Создание маршрута',
    isPrivate: true,
    headerTitle: 'Направления',
  },
  // добавишь другие приватные роуты сюда
}
