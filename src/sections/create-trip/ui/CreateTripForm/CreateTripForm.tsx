'use client'

import { Controller } from 'react-hook-form'
import { CounterInput, CountryPlans, Input, Textarea, Toggle } from '@/shared/ui'
import { TransportSelector } from '../TransportSelector/TransportSelector'
import { formContent } from '@/shared/config'
import { StepsNav } from '../StepsNav/StepsNav'
import { useTripForm } from '../../lib'
import { CountrySelect } from '@/widgets/country-select'
import { DatePicker } from '../DatePicker/DatePicker'
import styles from './CreateTripForm.module.css'

const CreateTripForm = () => {
  const {
    control,
    register,
    errors,
    isSubmitting,
    currentStep,
    handleNextClick,
    handleBackClick,
    handleSubmit,
    stepErrors,
    serverError,
    countries,
    handlePlanChange,
  } = useTripForm()

  return (
    <form>
      {serverError && <div className='error'>{serverError}</div>}
      <div className={`${styles.baseFields} wrapper`}>
        <h2 className='visually-hidden'>Базовые параметры маршрута</h2>
        <fieldset className={styles.field}>
          <legend className={styles.fieldTitle}>
            теги
          </legend>
          <Input
            className={styles.tags}
            label='Список тегов'
            hiddenLabel={true}
            placeholder='#делатьдичь'
            {...register('tags')}
            error={errors.tags?.message}
          />
        </fieldset>
        <fieldset className={styles.field}>
          <legend className={styles.fieldTitle}>
            транспорт
          </legend>
          <Controller
            name='transport'
            control={control}
            render={({ field, fieldState }) => (
              <TransportSelector
                className={styles.transport}
                selected={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </fieldset>
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
                  {formContent.map((item) => (
                    <li
                      className={`${styles.stepItem} ${currentStep === item.step ? styles.active : ''}`.trim()}
                      key={item.step}
                    >
                      <span className={styles.stepDot} aria-hidden="true" />
                      <span className={styles.stepNav}>{item.nav}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {stepConfig.step === 1 &&
                <>
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
                      name='hasChildren'
                      control={control}
                      render={({ field }) => (
                        <Toggle
                          className={styles.checkbox}
                          label='Можно с детьми'
                          checked={field.value}
                          onChange={field.onChange}
                          variant='transparent'
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
                  <Controller
                    name='dates'
                    control={control}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </>
              }
              {stepConfig.step === 2 &&
                <Controller
                  name='countries'
                  control={control}
                  render={({ field, fieldState }) => (
                    <CountrySelect
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              }
              {stepConfig.step === 3 &&
                <CountryPlans
                  countries={countries}
                  onPlanChange={handlePlanChange}
                  errors={stepErrors}
                />
              }
              <StepsNav
                currentStep={currentStep}
                onNext={currentStep === 3 ? handleSubmit : handleNextClick}
                onBack={handleBackClick}
                isSubmitting={isSubmitting}
              />
            </fieldset>
          )
        ))}
      </div>
    </form >
  )
}

export { CreateTripForm }
