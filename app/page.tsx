"use client"
import { Heart } from "lucide-react"
import { BMICalculator } from "@/components/bmi-calculator"
import { BMIHistory } from "@/components/bmi-history"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BMI Calculator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Calculate your Body Mass Index and get personalized health insights with our modern, user-friendly
            calculator
          </p>
        </div>

        {/* Main Calculator */}
        <div className="max-w-4xl mx-auto space-y-8">
          <BMICalculator />
          <BMIHistory />
        </div>
      </div>
    </div>
  )
}
