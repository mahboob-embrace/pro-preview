
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Building2, Users, DollarSign, HardHat } from "lucide-react";

const metrics = [
  {
    title: "Total Properties",
    value: "248",
    change: "+12%",
    trend: "up",
    icon: Building2,
    color: "text-blue-600"
  },
  {
    title: "Active Tenants",
    value: "1,847",
    change: "+5.2%",
    trend: "up",
    icon: Users,
    color: "text-green-600"
  },
  {
    title: "Monthly Revenue",
    value: "$2.4M",
    change: "+8.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-600"
  },
  {
    title: "Maintenance Requests",
    value: "23",
    change: "-15%",
    trend: "down",
    icon: HardHat,
    color: "text-orange-600"
  }
];

const MetricsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        
        // For maintenance requests, decreasing trend is positive (green), increasing is negative (red)
        const isMaintenanceRequests = metric.title === "Maintenance Requests";
        const getTrendColor = () => {
          if (isMaintenanceRequests) {
            return metric.trend === "down" ? "text-green-600" : "text-red-600";
          }
          return metric.trend === "up" ? "text-green-600" : "text-red-600";
        };
        
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <div className="flex items-center text-xs">
                <TrendIcon className={`h-3 w-3 mr-1 ${getTrendColor()}`} />
                <span className={getTrendColor()}>
                  {metric.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsOverview;
