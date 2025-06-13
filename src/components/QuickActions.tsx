
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Users, Wrench, DollarSign, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Add Property",
    description: "Register new property",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
    path: "/add-property"
  },
  {
    title: "New Contract",
    description: "Create lease agreement",
    icon: FileText,
    color: "bg-green-500 hover:bg-green-600"
  },
  {
    title: "Add Tenant",
    description: "Register new tenant",
    icon: Users,
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    title: "Maintenance",
    description: "Create work order",
    icon: Wrench,
    color: "bg-orange-500 hover:bg-orange-600"
  },
  {
    title: "Payment",
    description: "Record payment",
    icon: DollarSign,
    color: "bg-emerald-500 hover:bg-emerald-600"
  },
  {
    title: "Report",
    description: "Generate report",
    icon: BarChart3,
    color: "bg-indigo-500 hover:bg-indigo-600"
  }
];

const QuickActions = () => {
  const navigate = useNavigate();

  const handleActionClick = (action: typeof actions[0]) => {
    if (action.path) {
      navigate(action.path);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all"
                onClick={() => handleActionClick(action)}
              >
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
