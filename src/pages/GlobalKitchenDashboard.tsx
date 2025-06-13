
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Star, AlertTriangle, TrendingUp, Clock, MapPin } from "lucide-react";

const globalKPIs = {
  totalDishes: 1247,
  pendingApprovals: 8,
  globalAverageRating: 4.3,
  topPerformingKitchen: "Tokyo",
  aiAlert: "AI predicts a 40% increase in demand for vegan ingredients in London next quarter."
};

const kitchenPerformance = [
  {
    location: "Tokyo",
    newDishes: 23,
    avgRating: 4.6,
    topDish: { name: "Miso Glazed Salmon", rating: 4.9 },
    lowestDish: { name: "Tempura Vegetables", rating: 3.8 },
    avgApprovalTime: "2.3 days"
  },
  {
    location: "London",
    newDishes: 18,
    avgRating: 4.2,
    topDish: { name: "Beef Wellington", rating: 4.8 },
    lowestDish: { name: "Fish & Chips", rating: 3.5 },
    avgApprovalTime: "3.1 days"
  },
  {
    location: "Dubai",
    newDishes: 15,
    avgRating: 4.1,
    topDish: { name: "Lamb Ouzi", rating: 4.7 },
    lowestDish: { name: "Hummus Plate", rating: 3.4 },
    avgApprovalTime: "2.8 days"
  },
  {
    location: "New York",
    newDishes: 21,
    avgRating: 4.0,
    topDish: { name: "Lobster Roll", rating: 4.6 },
    lowestDish: { name: "Caesar Salad", rating: 3.2 },
    avgApprovalTime: "4.2 days"
  }
];

const pendingApprovals = [
  {
    dishName: "Truffle Risotto",
    chefName: "Marco Rossi",
    location: "London",
    submittedOn: "2024-06-11"
  },
  {
    dishName: "Wagyu Teppanyaki",
    chefName: "Hiroshi Tanaka",
    location: "Tokyo",
    submittedOn: "2024-06-10"
  },
  {
    dishName: "Shawarma Fusion Bowl",
    chefName: "Ahmed Al-Rashid",
    location: "Dubai",
    submittedOn: "2024-06-09"
  }
];

const aiInsights = [
  {
    title: "Menu Optimization Suggestion",
    description: "Dishes tagged as 'Spicy' in the Dubai kitchen have an 18% higher rating and are ordered 25% more frequently. Consider adding a new spicy seafood dish to the menu.",
    type: "optimization"
  },
  {
    title: "Predictive Inventory Alert",
    description: "Based on upcoming meal plans, our London kitchen is at risk of a 'Saffron' shortage in 2 weeks. Recommend placing a purchase order.",
    type: "alert"
  },
  {
    title: "Allergen Trend Analysis",
    description: "AI has detected a 30% increase in 'Dairy-Free' dish creations across all kitchens this quarter, indicating a growing customer demand.",
    type: "trend"
  }
];

const ratingTrends = [
  { month: "Jan", rating: 4.1 },
  { month: "Feb", rating: 4.0 },
  { month: "Mar", rating: 4.2 },
  { month: "Apr", rating: 4.1 },
  { month: "May", rating: 4.3 },
  { month: "Jun", rating: 4.3 }
];

const hallOfFame = [
  { name: "Miso Glazed Salmon", rating: 4.9, kitchen: "Tokyo" },
  { name: "Beef Wellington", rating: 4.8, kitchen: "London" },
  { name: "Lamb Ouzi", rating: 4.7, kitchen: "Dubai" }
];

const needsAttention = [
  { name: "Caesar Salad", rating: 3.2, kitchen: "New York" },
  { name: "Hummus Plate", rating: 3.4, kitchen: "Dubai" },
  { name: "Fish & Chips", rating: 3.5, kitchen: "London" }
];

const GlobalKitchenDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Global Culinary Command Center</h1>
          <p className="text-muted-foreground">Executive oversight for international kitchen operations</p>
        </div>

        {/* Global KPI Snapshot */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Global KPI Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{globalKPIs.totalDishes}</div>
                <div className="text-sm text-muted-foreground">Total Dishes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{globalKPIs.pendingApprovals}</div>
                <div className="text-sm text-muted-foreground">Pending Approvals</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-3xl font-bold text-green-600">{globalKPIs.globalAverageRating}</span>
                </div>
                <div className="text-sm text-muted-foreground">Global Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{globalKPIs.topPerformingKitchen}</div>
                <div className="text-sm text-muted-foreground">Top Kitchen</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-yellow-800">{globalKPIs.aiAlert}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kitchen Performance Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Kitchen Performance Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kitchenPerformance.map((kitchen, index) => (
                    <div key={kitchen.location} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold text-lg">{kitchen.location}</span>
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            Rank #{index + 1}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{kitchen.avgRating}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">New Dishes</div>
                          <div className="font-medium">{kitchen.newDishes}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Top Dish</div>
                          <div className="font-medium">{kitchen.topDish.name}</div>
                          <div className="text-xs text-green-600">★ {kitchen.topDish.rating}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Needs Work</div>
                          <div className="font-medium">{kitchen.lowestDish.name}</div>
                          <div className="text-xs text-orange-600">★ {kitchen.lowestDish.rating}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Approval Time</div>
                          <div className="font-medium">{kitchen.avgApprovalTime}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Center: Pending Approvals */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Pending Approvals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingApprovals.map((approval, index) => (
                    <div key={index} className="border border-border rounded-lg p-3">
                      <div className="font-medium text-sm mb-1">{approval.dishName}</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        Submitted by {approval.chefName}<br />
                        From {approval.location}<br />
                        On {approval.submittedOn}
                      </div>
                      <Button size="sm" className="w-full">
                        Review & Approve
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI-Powered Strategic Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Strategic Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-2 mb-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      insight.type === 'optimization' ? 'bg-blue-500' :
                      insight.type === 'alert' ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <div className="font-semibold text-sm">{insight.title}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{insight.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Global Dish Rating Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Global Dish Rating Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-6">
              <ChartContainer config={{}}>
                <LineChart data={ratingTrends}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[3.5, 5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="rating" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Hall of Fame
                </h4>
                <div className="space-y-2">
                  {hallOfFame.map((dish, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{dish.name}</div>
                        <div className="text-xs text-muted-foreground">{dish.kitchen}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{dish.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-600 mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Needs Attention
                </h4>
                <div className="space-y-2">
                  {needsAttention.map((dish, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{dish.name}</div>
                        <div className="text-xs text-muted-foreground">{dish.kitchen}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{dish.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalKitchenDashboard;
