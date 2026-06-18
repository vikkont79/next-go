'use server'

import { db } from '../../../../db/client'
import { trips } from '../../../../db/schema'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { tripFormSchema } from '@/shared/lib/validation'

export async function createTrip(input: unknown) {

  // 1. Валидация
  const result = tripFormSchema.safeParse(input)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  try {
    // 2. Авторизация
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Необходимо авторизоваться' }
    }

    //const { dates, countries, plans, ...rest } = result.data
    const { tags, transport, companions, duration, hasChildren, countries } = result.data

    // 3. Подготовка данных для БД
    /*const tripForDB = {
      ...rest,
      id: crypto.randomUUID(),
      userId: user.id,
      fromDate: dates.from,
      toDate: dates.to,
      countries: countries.map((country, idx) => ({
        code: country.code,
        plan: plans[idx],
      })),
    }*/

    const tripForDB = {
      id: crypto.randomUUID(),
      userId: user.id,
      tags: tags,
      transport: transport,
      companions: companions,
      duration: duration,
      hasChildren: hasChildren ? 1 : 0,
      fromDate: new Date(),
      toDate: new Date(),
      countries: countries.map(country => ({
        code: country.code,
        plan: country.plan || '',
      })),
      createdAt: new Date(),
    }

    // 4. Сохранение
    const [newTrip] = await db.insert(trips).values(tripForDB).returning()
    return { success: true, trip: newTrip }
  } catch (error) {
    console.error(error)
    return { error: 'Не удалось создать маршрут' }
  }
}
