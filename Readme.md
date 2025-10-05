# BMI Calculator

A modern, user-friendly **BMI (Body Mass Index)** calculator built with **Next.js** and **TypeScript**. This tool helps users calculate their BMI based on their height and weight, and provides personalized health insights.

---

## Features

- **BMI Calculation**: Calculate BMI using height and weight inputs.
- **BMI Categories**: Provides feedback on BMI categories such as Underweight, Normal Weight, Overweight, and Obese.
- **BMI History**: Keeps track of previous BMI calculations using **localStorage** for easy reference.
- **Health Recommendations**: Provides health recommendations based on the user's BMI category.

---

## Technologies Used

- **Next.js**: React framework for building server-side rendered applications.
- **TypeScript**: Adds type safety to the project.
- **Tailwind CSS**: For styling the application.
- **React Hooks**: For managing state, effects, and callbacks.

---

## How to Run the Project

### Prerequisites

Make sure you have the following installed:

- **Node.js** (preferably version 16.x or higher)
- **npm** (Node Package Manager)

You can download Node.js and npm from [here](https://nodejs.org/en/).

### Installation Steps

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/bmi-calculator.git

cd bmi-calculator
```

2. **Install dependencies:**

```bash
npm install
```

2. **Run the application:**

```bash
npm run dev
```

# BMI Calculation Application

This application calculates the Body Mass Index (BMI) based on user input and displays the BMI value along with its corresponding category. It also includes a BMI history feature to track the user's BMI over time.

### BMI Categories:

- **Underweight**: BMI < 18.5
- **Normal Weight**: 18.5 ≤ BMI < 25
- **Overweight**: 25 ≤ BMI < 30
- **Obese**: BMI ≥ 30

## BMI History Feature

The application stores all BMI calculations in **localStorage** so that users can view their BMI history across multiple sessions.

### The BMI History Table includes:

- **User's Name**
- **Gender**
- **Height and Weight**
- **BMI Value**
- **BMI Category** (Underweight, Normal, Overweight, Obese)
- **Date of Calculation**
