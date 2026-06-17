'use client'

import { useEffect, useState } from 'react'
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
  },
  countries: [],
  plans: [],*/
}

const DRAFT_KEY = 'tripDraft'

export const useTripForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  const {
    control,
    trigger,
    register,
    handleSubmit,
    reset,
    watch,
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
      console.log('Saving draft:', value)
      localStorage.setItem(DRAFT_KEY, JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch])

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
    serverError,
  }
}
