
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, User, Wrench, DollarSign } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "contract",
    title: "New lease signed",
    description: "Skyline Plaza - Unit 4B",
    time: "2 hours ago",
    icon: FileText,
    status: "completed"
  },
  {
    id: 2,
    type: "payment",
    title: "Rent payment received",
    description: "$2,400 from John Smith",
    time: "4 hours ago",
    icon: DollarSign,
    status: "completed"
  },
  {
    id: 3,
    type: "maintenance",
    title: "Work order created",
    description: "HVAC repair - Garden Heights",
    time: "6 hours ago",
    icon: Wrench,
    status: "pending"
  },
  {
    id: 4,
    type: "tenant",
    title: "Tenant inquiry",
    description: "New application received",
    time: "1 day ago",
    icon: User,
    status: "new"
  },
  {
    id: 5,
    type: "contract",
    title: "Lease renewal due",
    description: "Metro Office - Suite 201",
    time: "2 days ago",
    icon: FileText,
    status: "pending"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "new":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                    <Badge variant="secondary" className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
