'use client'

import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { type TripFormData, tripFormSchema } from '@/shared/lib'
import { getStepFields } from '@/shared/lib'
import { createTrip } from '../api'

const defaultValues = {
  tags: '',
  transport: [],
  companions: 1,
  duration: 2,
  hasChildren: false,
  /*dates: {
    from: new Date(),
    to: new Date(),
  },*/
  countries: [],
}

const DRAFT_KEY = 'tripDraft'

export const useTripForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [serverError, setServerError] = useState<string | null>(null)
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const {
    control,
    trigger,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<TripFormData>({
    resolver: zodResolver(tripFormSchema),
    defaultValues,
  })

  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        reset(parsed)
      } catch (error) {
        console.error('Failed to restore draft:', error)
      }
    }
  }, [reset])

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const countries = watch('countries')

  const handlePlanChange = useCallback((code: string, value: string) => {
    const newCountries = countries.map(country =>
      country.code === code ? { ...country, plan: value } : country
    )
    setValue('countries', newCountries)
  }, [countries, setValue])

  const handleNextClick = async () => {
    const stepFields = getStepFields(currentStep)
    const isValid = await trigger(stepFields)
    if (isValid && currentStep < 3) {
      setCurrentStep(prev => (prev + 1))
    }
  }

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => (prev - 1))
    }
  }

  const onSubmit = async (data: TripFormData) => {
    setServerError(null)

    const errors: Record<string, string> = {}
    data.countries.forEach((country) => {
      const plan = country.plan || ''
      if (plan.trim().length < 3 || plan.length > 200) {
        errors[`plan-${country.code}`] = 'От 3 до 200 символов'
      }
    })
    setStepErrors(errors)
    if (Object.keys(errors).length > 0) return

    const result = await createTrip(data)

    if (result.error) {
      setServerError(result.error)
      return
    }

    if (result.success) {
      localStorage.removeItem(DRAFT_KEY)
      router.push(`/trips/${result.trip.id}`)
    }
  }

  return {
    control,
    register,
    errors,
    isSubmitting,
    currentStep,
    handleNextClick,
    handleBackClick,
    handleSubmit: handleSubmit(onSubmit),
    stepErrors,
    serverError,
    countries,
    handlePlanChange,
  }
}
