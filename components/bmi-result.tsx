'use client'
import { memo, useMemo } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react'

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

interface BMIResultProps {
  data: BMIData
}

export const BMIResult = memo(function BMIResult({ data }: BMIResultProps) {
  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-pink-600'
    if (bmi < 25) return 'text-green-600'
    if (bmi < 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getBMIBadgeVariant = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'secondary'
      case 'Normal Weight':
        return 'default'
      case 'Overweight':
        return 'outline'
      case 'Obese':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const getBMIIcon = (category: string) => {
    switch (category) {
      case 'Underweight':
        return <TrendingDown className='h-4 w-4' />
      case 'Normal Weight':
        return <Minus className='h-4 w-4' />
      case 'Overweight':
        return <TrendingUp className='h-4 w-4' />
      case 'Obese':
        return <AlertCircle className='h-4 w-4' />
      default:
        return <Minus className='h-4 w-4' />
    }
  }

  const getBMIAdvice = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'Consider consulting with a healthcare provider about healthy weight gain strategies. Focus on nutrient-dense foods and strength training.'
      case 'Normal Weight':
        return "Excellent! You're in the healthy weight range. Keep up the good work with balanced nutrition and regular physical activity."
      case 'Overweight':
        return 'Consider adopting a balanced diet and increasing physical activity. Small, sustainable changes can make a big difference.'
      case 'Obese':
        return "It's recommended to consult with a healthcare provider for a personalized weight management plan. Focus on gradual, sustainable lifestyle changes."
      default:
        return 'Maintain a balanced lifestyle with proper nutrition and regular exercise.'
    }
  }

  const meterFillPercentage = useMemo(() => {
    const minBMI = 15
    const maxBMI = 40
    return Math.min(
      Math.max(((data.bmi - minBMI) / (maxBMI - minBMI)) * 100, 0),
      100
    )
  }, [data.bmi])

  const meterColor = useMemo(() => {
    if (data.bmi < 18.5) return 'bg-pink-500'
    if (data.bmi < 25) return 'bg-green-500'
    if (data.bmi < 30) return 'bg-yellow-500'
    return 'bg-red-500'
  }, [data.bmi])

  return (
    <Card className='shadow-lg border-0 bg-card performance-optimized'>
      <CardHeader className='text-center pb-4'>
        <CardTitle className='text-xl font-bold'>Your BMI Result</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* BMI Score Display */}
        <div className='text-center space-y-4'>
          <div className='space-y-2'>
            <div className={`text-6xl font-bold ${getBMIColor(data.bmi)}`}>
              {data.bmi}
            </div>
            <Badge
              variant={getBMIBadgeVariant(data.category)}
              className='text-sm px-4 py-1 flex items-center gap-2 w-fit mx-auto'
            >
              {getBMIIcon(data.category)}
              {data.category}
            </Badge>
          </div>

          {/* BMI Meter */}
          <div className='space-y-2'>
            <div className='w-full bg-muted rounded-full h-4 overflow-hidden'>
              <div
                className={`h-full rounded-full animate-progress-fill ${meterColor}`}
                style={{
                  width: `${meterFillPercentage}%`,
                }}
              />
            </div>
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </div>

        {/* Personal Info Summary */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg'>
          <div className='text-center'>
            <div className='text-sm text-muted-foreground'>Name</div>
            <div className='font-medium'>{data.name}</div>
          </div>
          <div className='text-center'>
            <div className='text-sm text-muted-foreground'>Gender</div>
            <div className='font-medium capitalize'>{data.gender}</div>
          </div>
          <div className='text-center'>
            <div className='text-sm text-muted-foreground'>Height</div>
            <div className='font-medium'>{data.height} cm</div>
          </div>
          <div className='text-center'>
            <div className='text-sm text-muted-foreground'>Weight</div>
            <div className='font-medium'>{data.weight} kg</div>
          </div>
        </div>

        {/* Health Advice */}
        <div className='p-4 bg-primary/5 border border-primary/20 rounded-lg'>
          <h4 className='font-semibold text-primary mb-2'>
            Health Recommendation
          </h4>
          <p className='text-sm text-muted-foreground leading-relaxed'>
            {getBMIAdvice(data.category)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
})
