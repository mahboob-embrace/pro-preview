
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Eye, Building2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Property {
  id: string;
  name: string;
  type: string;
  subType: string;
  status: "Available" | "Leased" | "Under Maintenance";
  city: string;
  country: string;
  buildingSize: number;
  sizeUnit: string;
  acquisitionValue: number;
  currency: string;
  image: string;
}

const mockProperties: Property[] = [
  {
    id: "1",
    name: "Parkview Tower",
    type: "Commercial",
    subType: "Office",
    status: "Available",
    city: "New York",
    country: "United States",
    buildingSize: 50000,
    sizeUnit: "sq ft",
    acquisitionValue: 25000000,
    currency: "USD",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Sunset Apartments",
    type: "Residential",
    subType: "Apartment",
    status: "Leased",
    city: "Los Angeles",
    country: "United States",
    buildingSize: 75000,
    sizeUnit: "sq ft",
    acquisitionValue: 18500000,
    currency: "USD",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Industrial Hub",
    type: "Industrial",
    subType: "Warehouse",
    status: "Under Maintenance",
    city: "Chicago",
    country: "United States",
    buildingSize: 120000,
    sizeUnit: "sq ft",
    acquisitionValue: 12000000,
    currency: "USD",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Marina Plaza",
    type: "Commercial",
    subType: "Retail",
    status: "Available",
    city: "London",
    country: "United Kingdom",
    buildingSize: 35000,
    sizeUnit: "sq ft",
    acquisitionValue: 15000000,
    currency: "GBP",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Green Valley Homes",
    type: "Residential",
    subType: "Single-Family Home",
    status: "Leased",
    city: "Karachi",
    country: "Pakistan",
    buildingSize: 25000,
    sizeUnit: "sq ft",
    acquisitionValue: 8000000,
    currency: "PKR",
    image: "/placeholder.svg"
  }
];

const PropertyList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || property.type.toLowerCase() === typeFilter;
      const matchesStatus = statusFilter === "all" || property.status.toLowerCase().replace(" ", "-") === statusFilter;
      const matchesCountry = countryFilter === "all" || property.country === countryFilter;
      
      return matchesSearch && matchesType && matchesStatus && matchesCountry;
    });
  }, [searchTerm, typeFilter, statusFilter, countryFilter]);

  const formatCurrency = (value: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200";
      case "Leased":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Under Maintenance":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Property Portfolio</h1>
            <p className="text-muted-foreground mt-1">Manage and overview your real estate properties</p>
          </div>
          <Button onClick={() => navigate("/add-property")} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Property
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="leased">Leased</SelectItem>
                  <SelectItem value="under-maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>

              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Pakistan">Pakistan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Properties List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Properties ({filteredProperties.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mobile/Tablet Card View */}
            <div className="block md:hidden space-y-4">
              {filteredProperties.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No properties found matching your criteria.</p>
                </div>
              ) : (
                filteredProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{property.name}</h3>
                        <Badge className={getStatusColor(property.status)}>
                          {property.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.city}, {property.country}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <p className="font-medium">{property.type} {property.subType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Size:</span>
                          <p className="font-medium">{property.buildingSize.toLocaleString()} {property.sizeUnit}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Value:</span>
                          <p className="font-medium text-lg">{formatCurrency(property.acquisitionValue, property.currency)}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              {filteredProperties.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No properties found matching your criteria.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acquisition Value</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img 
                              src={property.image} 
                              alt={property.name}
                              className="w-12 h-12 rounded-lg object-cover bg-muted"
                            />
                            <div>
                              <p className="font-medium">{property.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{property.city}, {property.country}</span>
                          </div>
                        </TableCell>
                        <TableCell>{property.type} {property.subType}</TableCell>
                        <TableCell>{property.buildingSize.toLocaleString()} {property.sizeUnit}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(property.status)}>
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(property.acquisitionValue, property.currency)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyList;
