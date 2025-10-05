'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator } from 'lucide-react'
import { BMIResult } from './bmi-result'
import { GenderSelector } from './gender-selector'

interface BMIData {
  id: string
  name: string
  dateOfBirth: string
  gender: 'male' | 'female'
  height: number
  weight: number
  bmi: number
  category: string
  date: string
}

export function BMICalculator() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '' as 'male' | 'female' | '',
    height: '',
    weight: '',
  })
  const [result, setResult] = useState<BMIData | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const debounceTimeoutRef = useRef<NodeJS.Timeout>()

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender'
    }

    const height = Number.parseFloat(formData.height)
    if (!formData.height || isNaN(height) || height <= 0 || height > 300) {
      newErrors.height = 'Please enter a valid height (1-300 cm)'
    }

    const weight = Number.parseFloat(formData.weight)
    if (!formData.weight || isNaN(weight) || weight <= 0 || weight > 500) {
      newErrors.weight = 'Please enter a valid weight (1-500 kg)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      setFormData((prev) => ({ ...prev, [field]: value }))

      debounceTimeoutRef.current = setTimeout(() => {
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: '' }))
        }
      }, 300)
    },
    [errors]
  )

  const handleGenderChange = useCallback((gender: 'male' | 'female') => {
    setFormData((prev) => ({ ...prev, gender }))
  }, [])

  const calculateBMI = useCallback(() => {
    if (!validateForm()) return

    const height = Number.parseFloat(formData.height) / 100
    const weight = Number.parseFloat(formData.weight)
    const bmi = weight / (height * height)

    let category = ''
    if (bmi < 18.5) category = 'Underweight'
    else if (bmi < 25) category = 'Normal Weight'
    else if (bmi < 30) category = 'Overweight'
    else category = 'Obese'

    const newResult: BMIData = {
      id: Date.now().toString(),
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender as 'male' | 'female',
      height: Number.parseFloat(formData.height),
      weight: Number.parseFloat(formData.weight),
      bmi: Number.parseFloat(bmi.toFixed(1)),
      category,
      date: new Date().toLocaleDateString(),
    }

    setResult(newResult)

    setFormData({
      name: '',
      dateOfBirth: '',
      gender: '',
      height: '',
      weight: '',
    })
    setErrors({})

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        try {
          const existingHistory = JSON.parse(
            localStorage.getItem('bmiHistory') || '[]'
          )
          const updatedHistory = [newResult, ...existingHistory.slice(0, 9)]
          localStorage.setItem('bmiHistory', JSON.stringify(updatedHistory))
        } catch (error) {
          console.error('Failed to save to localStorage:', error)
        }
      })
    } else {
      setTimeout(() => {
        try {
          const existingHistory = JSON.parse(
            localStorage.getItem('bmiHistory') || '[]'
          )
          const updatedHistory = [newResult, ...existingHistory.slice(0, 9)]
          localStorage.setItem('bmiHistory', JSON.stringify(updatedHistory))
        } catch (error) {
          console.error('Failed to save to localStorage:', error)
        }
      }, 0)
    }
  }, [formData, validateForm])

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      dateOfBirth: '',
      gender: '',
      height: '',
      weight: '',
    })
    setResult(null)
    setErrors({})
  }, [])

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])

  return (
    <div className='space-y-6'>
      <Card className='shadow-lg border-0 bg-card'>
        <CardHeader className='text-center pb-6'>
          <CardTitle className='text-2xl font-bold flex items-center justify-center gap-2'>
            <Calculator className='h-6 w-6 text-primary' />
            Calculate Your BMI
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-sm font-medium'>
                Full Name
              </Label>
              <Input
                id='name'
                placeholder='Enter your full name'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`transition-colors duration-150 ${
                  errors.name ? 'border-destructive' : 'focus:border-primary'
                }`}
              />
              {errors.name && (
                <p className='text-sm text-destructive'>{errors.name}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='dob' className='text-sm font-medium'>
                Date of Birth
              </Label>
              <Input
                id='dob'
                type='date'
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange('dateOfBirth', e.target.value)
                }
                className={`transition-colors duration-150 ${
                  errors.dateOfBirth
                    ? 'border-destructive'
                    : 'focus:border-primary'
                }`}
              />
              {errors.dateOfBirth && (
                <p className='text-sm text-destructive'>{errors.dateOfBirth}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='height' className='text-sm font-medium'>
                Height (cm)
              </Label>
              <Input
                id='height'
                type='number'
                placeholder='Enter height in cm'
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className={`transition-colors duration-150 ${
                  errors.height ? 'border-destructive' : 'focus:border-primary'
                }`}
              />
              {errors.height && (
                <p className='text-sm text-destructive'>{errors.height}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='weight' className='text-sm font-medium'>
                Weight (kg)
              </Label>
              <Input
                id='weight'
                type='number'
                placeholder='Enter weight in kg'
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className={`transition-colors duration-150 ${
                  errors.weight ? 'border-destructive' : 'focus:border-primary'
                }`}
              />
              {errors.weight && (
                <p className='text-sm text-destructive'>{errors.weight}</p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Gender</Label>
            <GenderSelector
              value={formData.gender}
              onChange={handleGenderChange}
              error={errors.gender}
            />
          </div>

          <div className='flex gap-4 pt-4'>
            <Button
              onClick={calculateBMI}
              disabled={isCalculating}
              className='flex-1 h-12 text-base font-medium transition-colors duration-200 bg-primary hover:bg-green-600'
            >
              {isCalculating ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2' />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className='h-4 w-4 mr-2' />
                  Calculate BMI
                </>
              )}
            </Button>
            <Button
              variant='outline'
              onClick={resetForm}
              className='px-8 h-12 transition-colors duration-200 bg-transparent'
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className='performance-optimized animate-fade-in'>
          <BMIResult data={result} />
        </div>
      )}
    </div>
  )
}
