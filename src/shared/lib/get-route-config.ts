import { routesConfig, type RouteConfig } from '@/shared/config'

export const getRouteConfig = (pathname: string): RouteConfig => {
  // точное совпадение
  if (routesConfig[pathname]) {
    return routesConfig[pathname]
  }

  // динамические роуты (например, /profile/123)
  if (pathname.startsWith('/profile/')) {
    return routesConfig['/profile/']
  }

  if (pathname.startsWith('/trips/create/')) {
    return routesConfig['/trips/create']
  }

  if (/^\/trips\/[^/]+$/.test(pathname)) {
    return routesConfig['/trips/[id]']
  }

  // дефолтный конфиг
  return {
    withAvatar: false,
  }
}
