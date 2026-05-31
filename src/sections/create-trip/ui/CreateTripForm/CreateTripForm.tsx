'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TripFormData, tripFormSchema } from '@/shared/lib/validation/trip-schemas'
import { Input } from '@/shared/ui'
import styles from './CreateTripForm.module.css'
import { TransportSelector } from '../TransportSelector/TransportSelector'
import { createTrip } from '../../api'
import { useRouter } from 'next/navigation'


const defaultValues = {
  tags: '',
  transport: [],
  /*companions: 1,
  duration: 2,
  hasChildren: false,
  dates: {
    from: new Date(),
    to: new Date(),
  },
  countries: [],
  plans: [],*/
}

const CreateTripForm = () => {
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TripFormData>({
    resolver: zodResolver(tripFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: TripFormData) => {
    try {
      const result = await createTrip(data)
      if (!result) {
        alert('Сервер не вернул результат')
        return
      }

      if (result.success) {
        router.push(`/trips/${result.trip.id}`)
      } else {
        alert(result.error)
      }
    } catch (error) {
      alert('Ошибка при отправке формы')
    }
  }

  console.log('🔍 Проверка формы перед рендером:')
  console.log('  errors:', errors)
  console.log('  валидность:', Object.keys(errors).length === 0)

  return (
    <form onSubmit={(e) => {
      console.log('🔵 До handleSubmit')
      console.log('  текущие errors:', errors)
      handleSubmit(onSubmit)(e)
      console.log('🟢 После handleSubmit')
    }}>
      <div className={`${styles.baseFields} wrapper`}>
        <h2 className='visually-hidden'>Базовые параметры маршрута</h2>
        <fieldset className={styles.field}>
          <legend className={styles.fieldTitle}>
            теги
          </legend>
          <Input
            label='Список тегов'
            hiddenLabel={true}
            placeholder='#делатьдичь'
            {...register('tags')}
            error={errors.tags?.message}
          />
        </fieldset>
        <Controller
          name='transport'
          control={control}
          render={({ field, fieldState }) => (
            <TransportSelector
              selected={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <button type='submit'>Создать</button>
      </div>
    </form>
  )
}

export { CreateTripForm }
