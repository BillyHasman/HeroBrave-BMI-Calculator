'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { History, Trash2, User, UserCheck } from 'lucide-react'

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

const HistoryRow = memo(function HistoryRow({
  entry,
  index,
  onRemove,
}: {
  entry: BMIData
  index: number
  onRemove: (id: string) => void
}) {
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

  const handleRemove = useCallback(
    () => onRemove(entry.id),
    [onRemove, entry.id]
  )

  return (
    <tr className='border-b border-border/50 hover:bg-muted/30 transition-colors duration-200'>
      <td className='py-3 px-2 font-medium'>{entry.name}</td>
      <td className='py-3 px-2'>
        <div className='flex items-center gap-1'>
          {entry.gender === 'male' ? (
            <User className='h-4 w-4 text-primary' />
          ) : (
            <UserCheck className='h-4 w-4 text-secondary' />
          )}
          <span className='capitalize text-sm'>{entry.gender}</span>
        </div>
      </td>
      <td className='py-3 px-2'>{entry.height} cm</td>
      <td className='py-3 px-2'>{entry.weight} kg</td>
      <td className='py-3 px-2 font-bold'>{entry.bmi}</td>
      <td className='py-3 px-2'>
        <Badge variant={getBMIBadgeVariant(entry.category)} className='text-xs'>
          {entry.category}
        </Badge>
      </td>
      <td className='py-3 px-2 text-sm text-muted-foreground'>{entry.date}</td>
      <td className='py-3 px-2'>
        <Button
          variant='ghost'
          size='sm'
          onClick={handleRemove}
          className='text-destructive hover:bg-destructive/10 h-8 w-8 p-0 transition-colors duration-200'
        >
          <Trash2 className='h-3 w-3' />
        </Button>
      </td>
    </tr>
  )
})

export function BMIHistory() {
  const [history, setHistory] = useState<BMIData[]>([])

  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem('bmiHistory')
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory))
        }
      } catch (error) {
        console.error('Failed to load history:', error)
      }
    }

    loadHistory()

    const interval = setInterval(loadHistory, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const clearHistory = useCallback(() => {
    try {
      localStorage.removeItem('bmiHistory')
      setHistory([])
    } catch (error) {
      console.error('Failed to clear history:', error)
    }
  }, [])

  const removeEntry = useCallback(
    (id: string) => {
      try {
        const updatedHistory = history.filter((entry) => entry.id !== id)
        localStorage.setItem('bmiHistory', JSON.stringify(updatedHistory))
        setHistory(updatedHistory)
      } catch (error) {
        console.error('Failed to remove entry:', error)
      }
    },
    [history]
  )

  if (history.length === 0) {
    return (
      <Card className='animate-fade-in shadow-lg border-0 bg-card performance-optimized'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl font-bold flex items-center justify-center gap-2'>
            <History className='h-5 w-5 text-muted-foreground' />
            BMI History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8 text-muted-foreground'>
            <History className='h-12 w-12 mx-auto mb-4 opacity-50' />
            <p>No BMI calculations yet. Calculate your first BMI above!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='animate-fade-in shadow-lg border-0 bg-card performance-optimized'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-xl font-bold flex items-center gap-2'>
          <History className='h-5 w-5 text-primary' />
          BMI History ({history.length})
        </CardTitle>
        <Button
          variant='outline'
          size='sm'
          onClick={clearHistory}
          className='text-destructive hover:bg-destructive/10 transition-colors duration-200 bg-transparent'
        >
          <Trash2 className='h-4 w-4 mr-2' />
          Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-border'>
                <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                  Name
                </th>
                <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                  Gender
                </th>
                <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                  Height
                </th>
                <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                  Weight
                </th>
                <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                  BMI
                </th>
                <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                  Category
                </th>
                <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                  Date
                </th>
                <th className='text-left py-3 px-2 font-medium text-muted-foreground'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <HistoryRow
                  key={entry.id}
                  entry={entry}
                  index={index}
                  onRemove={removeEntry}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
