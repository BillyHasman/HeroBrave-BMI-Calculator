import Link from 'next/link'
import { HeartPulse, Activity, Scale, Info, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-background via-muted/20 to-accent/10'>
      {/* Header */}
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
            <Link href='/calculator'>
              <Button size='sm' className='gap-1'>
                Try the App
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className='container mx-auto px-4 py-12 md:py-16'>
        <div className='mx-auto max-w-3xl text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
            <Activity className='h-6 w-6 text-primary' />
          </div>
          <h1 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            Understand Your Health, Starting with BMI
          </h1>
          <p className='mt-3 text-muted-foreground text-pretty'>
            Calculate your Body Mass Index (BMI) quickly to understand your
            weight status and get simple insights for a healthier life.
          </p>
          <div className='mt-6 flex flex-col sm:flex-row items-center justify-center gap-3'>
            <Link href='/calculator'>
              <Button size='lg' className='px-6'>
                Try the App Now
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>
          <div className='mt-2'>
            <a
              href='#about-bmi'
              className='text-sm underline-offset-4 hover:underline'
            >
              Learn about BMI
            </a>
          </div>
        </div>
      </section>

      {/* Benefits / Intro */}
      <section id='about-bmi' className='container mx-auto px-4 py-8 md:py-12'>
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='rounded-xl border border-border bg-card p-5'>
            <div className='mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
              <Scale className='h-5 w-5 text-primary' />
            </div>
            <h3 className='font-semibold'>Calculate BMI Quickly</h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              Enter your height, weight, and gender to get your BMI and
              category.
            </p>
          </div>
          <div className='rounded-xl border border-border bg-card p-5'>
            <div className='mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10'>
              <Activity className='h-5 w-5 text-secondary' />
            </div>
            <h3 className='font-semibold'>Track Your Health</h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              Get a quick snapshot of your weight status and keep healthy
              habits.
            </p>
          </div>
          <div className='rounded-xl border border-border bg-card p-5'>
            <div className='mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
              <Info className='h-5 w-5 text-primary' />
            </div>
            <h3 className='font-semibold'>Easy to Understand</h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              BMI results are presented clearly with helpful colors and simple
              explanations.
            </p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id='about-us' className='container mx-auto px-4 py-8 md:py-12'>
        <div className='mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 md:p-8'>
          <h2 className='text-2xl md:text-3xl font-semibold'>About Us</h2>
          <p className='mt-2 text-muted-foreground'>
            This app is built with a focus on simplicity, performance, and
            accessibility. We aim to help anyone understand their BMI quickly
            and comfortably.
          </p>

          <div className='mt-6 grid gap-4 sm:grid-cols-2'>
            <div className='rounded-xl border border-border p-4'>
              <p className='text-sm font-medium'>App Creators</p>
              <p className='mt-1 text-sm text-muted-foreground'>
                Crafted with care and creativity by a solo developer who's all
                about health, simplicity, and user experience 😎💻
              </p>
            </div>
            <div className='rounded-xl border border-border p-4'>
              <p className='text-sm font-medium'>Technology</p>
              <p className='mt-1 text-sm text-muted-foreground'>
                Built with Next.js App Router, modern UI components, and a focus
                on performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='mt-12 border-t border-border'>
        <div className='container mx-auto px-4 py-6 text-sm text-muted-foreground flex justify-center'>
          <p>© BillyHasman 2025 BMI Calculator</p>
        </div>
      </footer>
    </main>
  )
}
