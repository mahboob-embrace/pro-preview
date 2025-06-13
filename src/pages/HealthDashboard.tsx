import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Activity, Utensils, Moon, Zap, Heart, Bed, AlarmClock } from 'lucide-react';
import { HealthSidebar } from '@/components/HealthSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const HealthDashboard = () => {
  // Current time and location data
  const currentTime = new Date();
  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  // Mock data for health metrics
  const sleepData = {
    totalSleep: '7h 45m',
    sleepScore: 87,
    bedtime: '22:00',
    alarmTime: '07:00',
    actualWakeTime: '06:45',
    stages: [
      { name: 'Deep', value: 25, color: '#3b82f6' },
      { name: 'Light', value: 55, color: '#60a5fa' },
      { name: 'REM', value: 20, color: '#93c5fd' }
    ]
  };

  const workoutData = {
    morningRun: { duration: 45, intensity: 'high', caloriesBurned: 420 },
    weightlifting: { duration: 30, intensity: 'moderate', caloriesBurned: 180 }
  };

  const totalCaloriesBurned = workoutData.morningRun.caloriesBurned + workoutData.weightlifting.caloriesBurned;
  
  const currentMood = "Feeling a bit tired and stressed";

  // Intelligent meal recommendation logic
  const getMealRecommendation = () => {
    const hour = currentTime.getHours();
    const location = "Islamabad, Pakistan";
    
    // Determine meal type based on time (4:24 PM = 16:24)
    let mealType = "";
    if (hour >= 15 && hour < 18) {
      mealType = "Time for an Early Dinner!";
    } else if (hour >= 12 && hour < 15) {
      mealType = "Perfect Time for a Late Lunch!";
    } else if (hour >= 18 && hour < 21) {
      mealType = "Dinner Time!";
    } else {
      mealType = "Healthy Snack Time!";
    }

    // Generate recommendation based on workout and mood
    const recommendation = {
      title: mealType,
      description: `After your intense run this morning, your body needs to refuel. To combat that tired and stressed feeling, here's a suggestion packed with protein and energy-boosting nutrients:`,
      meal: "Grilled Chicken and Chickpea Salad",
      components: [
        { item: "Grilled chicken breast", reason: "for protein recovery" },
        { item: "A mix of chickpeas, cucumber, tomatoes, and red onion", reason: "for fiber and complex carbs" },
        { item: "Light lemon, olive oil, and mint dressing", reason: "for freshness and healthy fats" }
      ],
      benefits: "This meal helps repair muscle, stabilizes blood sugar to fight fatigue, and provides a refreshing taste perfect for the warm climate in Islamabad."
    };

    return recommendation;
  };

  const mealRecommendation = getMealRecommendation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <HealthSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6 space-y-6">
            {/* Dashboard Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Daily Wellness Hub</h1>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                {timeString} • Islamabad, Pakistan
              </p>
            </div>

            {/* Key Data Cards - Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Sleep Activity Card - Redesigned */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Moon className="h-5 w-5 text-blue-600" />
                    Sleep Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Circular Sleep Timer */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      {/* Background Circle */}
                      <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${(sleepData.sleepScore / 100) * 283} 283`}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      {/* Center Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gray-900">
                          7hr
                        </div>
                        <div className="text-sm text-gray-500">
                          30min
                        </div>
                      </div>
                      {/* Moon Icon */}
                      <div className="absolute -top-2 right-8">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Moon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sleep Details */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center space-y-1">
                      <Bed className="h-4 w-4 text-blue-600" />
                      <span className="text-xs text-gray-500">Bedtime</span>
                      <span className="text-sm font-semibold text-gray-900">{sleepData.bedtime}</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <AlarmClock className="h-4 w-4 text-orange-500" />
                      <span className="text-xs text-gray-500">Alarm</span>
                      <span className="text-sm font-semibold text-gray-900">{sleepData.alarmTime}</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <Moon className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-gray-500">Siesta</span>
                      <span className="text-sm font-semibold text-gray-900">12:50</span>
                    </div>
                  </div>

                  {/* Sleep Score Badge */}
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Sleep Score: {sleepData.sleepScore}/100
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Calorie Burn Card */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Calories Burned Today
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {totalCaloriesBurned}
                    </div>
                    <p className="text-sm text-gray-600">Total calories burned</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Morning Run</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-orange-600">
                          {workoutData.morningRun.caloriesBurned} cal
                        </div>
                        <div className="text-xs text-gray-500">
                          {workoutData.morningRun.duration}min • {workoutData.morningRun.intensity} intensity
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Weightlifting</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-orange-600">
                          {workoutData.weightlifting.caloriesBurned} cal
                        </div>
                        <div className="text-xs text-gray-500">
                          {workoutData.weightlifting.duration}min • {workoutData.weightlifting.intensity} intensity
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Intelligent Meal Recommendation Card */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 shadow-lg border-green-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-green-800">
                  <Utensils className="h-6 w-6" />
                  Smart Meal Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-2">
                    {mealRecommendation.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {mealRecommendation.description}
                  </p>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="text-lg font-bold text-green-800 mb-3">
                      {mealRecommendation.meal}
                    </h4>
                    
                    <div className="space-y-2 mb-4">
                      {mealRecommendation.components.map((component, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-800">
                              {component.item}
                            </span>
                            <span className="text-gray-600"> ({component.reason})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-green-100">
                      <h5 className="font-semibold text-green-700 mb-1">Why it works:</h5>
                      <p className="text-sm text-gray-700">
                        {mealRecommendation.benefits}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Current Mood Display */}
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Current Mood:</span>
                  </div>
                  <p className="text-sm text-yellow-700 italic">"{currentMood}"</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    This recommendation considers your current emotional state
                  </p>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HealthDashboard;
