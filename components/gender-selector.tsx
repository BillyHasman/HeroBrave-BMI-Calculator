'use client'

import { memo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { User, UserCheck } from 'lucide-react'

interface GenderSelectorProps {
  value: 'male' | 'female' | ''
  onChange: (gender: 'male' | 'female') => void
  error?: string
}

export const GenderSelector = memo(function GenderSelector({
  value,
  onChange,
  error,
}: GenderSelectorProps) {
  const handleMaleClick = useCallback(() => onChange('male'), [onChange])
  const handleFemaleClick = useCallback(() => onChange('female'), [onChange])

  return (
    <div className='space-y-2'>
      <div className='grid grid-cols-2 gap-4'>
        <Button
          type='button'
          variant={value === 'male' ? 'default' : 'outline'}
          onClick={handleMaleClick}
          className={`h-16 flex flex-col items-center gap-2 transition-colors duration-200 ${
            value === 'male'
              ? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90'
              : 'hover:bg-primary/10 hover:border-primary'
          }`}
        >
          <User className='h-6 w-6' />
          <span className='text-sm font-medium'>Male</span>
        </Button>

        <Button
          type='button'
          variant={value === 'female' ? 'default' : 'outline'}
          onClick={handleFemaleClick}
          className={`h-16 flex flex-col items-center gap-2 transition-colors duration-200 ${
            value === 'female'
              ? 'bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90'
              : 'hover:bg-secondary/20 hover:border-secondary hover:text-secondary'
          }`}
        >
          <UserCheck className='h-6 w-6' />
          <span className='text-sm font-medium'>Female</span>
        </Button>
      </div>
      {error && <p className='text-sm text-destructive'>{error}</p>}
    </div>
  )
})
