'use server'

import { db } from '../../../../db/client'
import { trips } from '../../../../db/schema'
import { getCurrentUser } from '@/shared/lib/get-current-user'
import { tripFormSchema } from '@/shared/lib/validation/trip-schemas'

export async function createTrip(input: unknown) {

  // 1. Валидация
  const result = tripFormSchema.safeParse(input)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  // 2. Авторизация
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Необходимо авторизоваться' }
  }

  //const { dates, countries, plans, ...rest } = result.data
  const { tags, transport } = result.data

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
    companions: 1,
    duration: 1,
    fromDate: new Date(),
    toDate: new Date(),
    countries: [],
    createdAt: new Date(),
  }

  // 4. Сохранение
  try {
    const [newTrip] = await db.insert(trips).values(tripForDB).returning()
    return { success: true, trip: newTrip }
  } catch (error) {
    console.error('Ошибка создания трипа:', error)
    return { error: 'Не удалось создать маршрут' }
  }
}
