'use client'
import Link from 'next/link'
import { BMICalculator } from '@/components/bmi-calculator'
import { BMIHistory } from '@/components/bmi-history'
import { Heart, HeartPulse } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10'>
      <header className='sticky top-0 z-30 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto px-4 h-14 flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-2'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10'>
              <HeartPulse className='h-5 w-5 text-primary' />
            </span>
            <span className='font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              BMI Calculator
            </span>
          </Link>
          <div className='flex items-center gap-3'>
            <Link href='/#tentang-bmi'>
              <Button
                size='sm'
                className='gap-1 bg-transparent text-primary hover:bg-primary/10'
              >
                About App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8'>
        {/* Main Calculator */}
        <div className='max-w-4xl mx-auto space-y-8'>
          <BMICalculator />
          <BMIHistory />
        </div>
      </div>
    </div>
  )
}
