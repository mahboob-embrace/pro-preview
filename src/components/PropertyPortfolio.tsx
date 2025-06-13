
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Eye, Edit, Bell, Calendar } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const properties = [
  {
    id: 1,
    name: "Skyline Plaza",
    location: "New York, NY",
    type: "Commercial",
    units: 45,
    occupancy: 92,
    revenue: "$45,200",
    status: "active",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Garden Heights",
    location: "Los Angeles, CA",
    type: "Residential",
    units: 120,
    occupancy: 87,
    revenue: "$89,400",
    status: "active",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Metro Office Complex",
    location: "Chicago, IL",
    type: "Commercial",
    units: 28,
    occupancy: 96,
    revenue: "$67,800",
    status: "active",
    image: "/placeholder.svg"
  }
];

const PropertyPortfolio = () => {
  const [activeTab, setActiveTab] = useState("properties");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        {/* Header without search */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Property Portfolio</h1>
              <p className="text-muted-foreground">Overview of your real estate properties</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button>
              
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Property Portfolio</CardTitle>
                <Button variant="outline" size="sm">
                  View All Properties
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4 flex-1">
                          <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center">
                            <span className="text-xs font-medium text-muted-foreground">IMG</span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-foreground">{property.name}</h3>
                              <Badge variant={property.status === "active" ? "default" : "secondary"}>
                                {property.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property.location}
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Type: </span>
                                <span className="font-medium">{property.type}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Units: </span>
                                <span className="font-medium">{property.units}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Occupancy: </span>
                                <span className="font-medium">{property.occupancy}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-semibold text-foreground mb-2">
                            {property.revenue}
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPortfolio;
