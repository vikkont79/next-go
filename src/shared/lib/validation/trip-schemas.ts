import { optional, z } from 'zod'
import { TRANSPORT_OPTIONS } from '@/shared/config'

const tagsRegex = /#\w+/

const dateRangeSchema = z.object({
  from: z.date().refine((date) => date !== undefined, {
    message: 'Укажите дату начала',
  }),
  to: z.date().refine((date) => date !== undefined, {
    message: 'Укажите дату окончания',
  }),
}).refine((data) => data.to >= data.from, {
  message: 'Дата окончания не может быть раньше даты начала',
  path: ['to'],
})

export const tripFormSchema = z.object({
  tags: z.string()
    .min(1, 'Добавьте хотя бы один тег')
    .refine((val) => tagsRegex.test(val), {
      message: 'Тег должен начинаться с # (например, #путешествие)',
    }),

  transport: z.array(z.enum(TRANSPORT_OPTIONS))
    .min(1, 'Выберите хотя бы один вид транспорта'),

  companions: z.number()
    .int()
    .min(1, 'От 1 до 10 чел.')
    .max(10, 'От 1 до 10 чел.'),

  duration: z.number()
    .int()
    .min(2, 'От 2 до 31 дня')
    .max(31, 'От 2 до 31 дня'),

  hasChildren: z.boolean().optional(),

  /*dates: dateRangeSchema,

  countries: z.array(z.object({
    code: z.string().min(1, 'Выберите страну'),
  })).min(1, 'Добавьте хотя бы одну страну'),

  plans: z.array(z.string()
    .min(3, 'От 3 до 200 символов')
    .max(200, 'От 3 до 200 символов')
  ).min(1, 'Заполните планы для всех стран'),*/
})

export type TripFormData = z.infer<typeof tripFormSchema>
