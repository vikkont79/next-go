'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TripFormData, tripFormSchema } from '@/shared/lib/validation/trip-schemas'
import { CounterInput, Input } from '@/shared/ui'
import { TransportSelector } from '../TransportSelector/TransportSelector'
import { createTrip } from '../../api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formContent } from '@/shared/config'
import { StepsNav } from '../StepsNav/StepsNav'
import styles from './CreateTripForm.module.css'


const defaultValues = {
  tags: '',
  transport: [],
  companions: 1,
  duration: 2,
  /*hasChildren: false,
  dates: {
    from: new Date(),
    to: new Date(),
  },
  countries: [],
  plans: [],*/
}

const CreateTripForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
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

  const handleNextClick = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => (prev + 1))
    }
  }

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => (prev - 1))
    }
  }

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

  return (
    <form>
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
      </div>
      <div className={`${styles.stepFields} wrapper`}>
        <h2 className='visually-hidden'>Пошаговый план маршрута</h2>
        <p className={styles.stepsTitle}>Добавить план:</p>
        {formContent.map((stepConfig) => (
          currentStep === stepConfig.step && (
            <fieldset className={styles.stepField} key={stepConfig.step}>
              <legend className='visually-hidden'>{stepConfig.legend}
              </legend>
              <div className={styles.stepContent}>
                <div className={styles.stepIntro}>
                  <p className={styles.stepTitle}>
                    Шаг {stepConfig.step}. {stepConfig.title}
                  </p>
                  <p className={styles.stepDescription}>
                    {stepConfig.description}
                  </p>
                </div>
                <ul className={styles.stepList}>
                  {formContent.map((stepConfig) => (
                    <li
                      className={`${styles.stepItem} ${currentStep === stepConfig.step ? styles.active : ''}`.trim()}
                      key={stepConfig.step}
                    >
                      {stepConfig.nav}
                    </li>
                  ))}
                </ul>
              </div>
              {stepConfig.step === 1 &&
                <div className={styles.counters}>
                  <Controller
                    name='companions'
                    control={control}
                    render={({ field, fieldState }) => (
                      <CounterInput
                        className={styles.counterInput}
                        label='Ищу попутчиков:'
                        value={field.value}
                        unit='чел.'
                        onChange={field.onChange}
                        min={1}
                        max={10}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    name='duration'
                    control={control}
                    render={({ field, fieldState }) => (
                      <CounterInput
                        className={styles.counterInput}
                        label='Длительность'
                        value={field.value}
                        unit='дн.'
                        onChange={field.onChange}
                        min={2}
                        max={31}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
              }
              <StepsNav
                currentStep={currentStep}
                onNext={currentStep === 3 ? handleSubmit(onSubmit) : handleNextClick}
                onBack={handleBackClick}
              />
            </fieldset>
          )
        ))}
      </div>
    </form >
  )
}

export { CreateTripForm }
