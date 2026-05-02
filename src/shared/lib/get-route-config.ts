import { routesConfig, type RouteConfig } from '@/shared/config/routes'

export const getRouteConfig = (pathname: string): RouteConfig => {
  // точное совпадение
  if (routesConfig[pathname]) {
    return routesConfig[pathname]
  }

  // динамические роуты (например, /profile/123)
  if (pathname.startsWith('/profile/')) {
    return routesConfig['/profile']
  }

  if (pathname.startsWith('/trips/create/')) {
    return routesConfig['/trips/create']
  }

  // дефолтный конфиг
  return {
    isPrivate: false,
    headerAction: 'auth',
  }
}
