import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Building2, MapPin, Upload, Plus, Trash2, Bell, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";

interface Owner {
  id: string;
  name: string;
  type: string;
  percentage: number;
}

const AddProperty = () => {
  const [activeTab, setActiveTab] = useState("add-property");
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyData, setPropertyData] = useState({
    // Step 1: Core Information
    propertyName: "",
    propertyType: "",
    subType: "",
    status: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    latitude: "",
    longitude: "",
    
    // Step 2: Details
    buildingSize: "",
    lotSize: "",
    measurementUnit: "sqft",
    numberOfUnits: "",
    yearBuilt: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    amenities: [] as string[],
    propertyClass: "",
    leaseTerms: "",
    commercialAmenities: [] as string[],
    
    // Step 3: Ownership
    acquisitionDate: null as Date | null,
    acquisitionPrice: "",
    currency: "USD",
    owners: [] as Owner[],
    
    // Step 4: Media
    primaryImage: null as File | null,
    gallery: [] as File[],
    documents: [] as File[]
  });

  const steps = [
    { id: 1, title: "Core Info", description: "Basic property information" },
    { id: 2, title: "Details", description: "Property specifications" },
    { id: 3, title: "Ownership", description: "Acquisition & ownership" },
    { id: 4, title: "Media", description: "Photos & documents" },
    { id: 5, title: "Review", description: "Review & submit" }
  ];

  const propertyTypes = [
    { value: "commercial", label: "Commercial" },
    { value: "residential", label: "Residential" },
    { value: "industrial", label: "Industrial" },
    { value: "land", label: "Land" },
    { value: "mixed-use", label: "Mixed-Use" }
  ];

  const subTypes = {
    commercial: ["Office", "Retail", "Restaurant", "Warehouse"],
    residential: ["Apartment", "Single-Family Home", "Condo", "Townhouse"],
    industrial: ["Manufacturing", "Storage", "Distribution"],
    land: ["Agricultural", "Development", "Recreational"],
    "mixed-use": ["Residential/Commercial", "Office/Retail"]
  };

  const countries = ["United States", "Canada", "United Kingdom", "Germany", "France", "Pakistan", "India", "Australia"];
  const currencies = ["USD", "EUR", "GBP", "CAD", "PKR", "INR", "AUD"];

  const handleInputChange = (field: string, value: any) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean, type: 'amenities' | 'commercialAmenities') => {
    setPropertyData(prev => ({
      ...prev,
      [type]: checked 
        ? [...prev[type], amenity]
        : prev[type].filter(a => a !== amenity)
    }));
  };

  const addOwner = () => {
    const newOwner: Owner = {
      id: Date.now().toString(),
      name: "",
      type: "",
      percentage: 0
    };
    setPropertyData(prev => ({
      ...prev,
      owners: [...prev.owners, newOwner]
    }));
  };

  const removeOwner = (id: string) => {
    setPropertyData(prev => ({
      ...prev,
      owners: prev.owners.filter(owner => owner.id !== id)
    }));
  };

  const updateOwner = (id: string, field: string, value: any) => {
    setPropertyData(prev => ({
      ...prev,
      owners: prev.owners.map(owner =>
        owner.id === id ? { ...owner, [field]: value } : owner
      )
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getTotalOwnership = () => {
    return propertyData.owners.reduce((total, owner) => total + (owner.percentage || 0), 0);
  };

  const renderProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
              currentStep >= step.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}>
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-20 h-1 mx-2",
                currentStep > step.id ? "bg-primary" : "bg-muted"
              )} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold">{steps[currentStep - 1].title}</h2>
        <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Core Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="propertyName">Property Name *</Label>
              <Input
                id="propertyName"
                value={propertyData.propertyName}
                onChange={(e) => handleInputChange("propertyName", e.target.value)}
                placeholder="e.g., Parkview Tower"
              />
            </div>
            <div>
              <Label htmlFor="propertyType">Property Type *</Label>
              <Select value={propertyData.propertyType} onValueChange={(value) => {
                handleInputChange("propertyType", value);
                handleInputChange("subType", "");
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {propertyData.propertyType && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subType">Sub-Type</Label>
                <Select value={propertyData.subType} onValueChange={(value) => handleInputChange("subType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub-type" />
                  </SelectTrigger>
                  <SelectContent>
                    {subTypes[propertyData.propertyType as keyof typeof subTypes]?.map(subType => (
                      <SelectItem key={subType} value={subType.toLowerCase().replace(/\s+/g, '-')}>
                        {subType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Property Status *</Label>
                <Select value={propertyData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="leased">Leased</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                    <SelectItem value="development">Under Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="country">Country *</Label>
            <Select value={propertyData.country} onValueChange={(value) => handleInputChange("country", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country.toLowerCase().replace(/\s+/g, '-')}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <div>
              <Label htmlFor="addressLine1">Address Line 1 *</Label>
              <Input
                id="addressLine1"
                value={propertyData.addressLine1}
                onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                placeholder="Street address"
              />
            </div>
            <div>
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                id="addressLine2"
                value={propertyData.addressLine2}
                onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                placeholder="Apartment, suite, etc."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={propertyData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  value={propertyData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="State/Province"
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal/ZIP Code *</Label>
                <Input
                  id="postalCode"
                  value={propertyData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  placeholder="Postal/ZIP Code"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Geolocation</h3>
            <p className="text-muted-foreground">Use the map to set the precise location or enter coordinates below.</p>
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Interactive Map Placeholder</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  value={propertyData.latitude}
                  onChange={(e) => handleInputChange("latitude", e.target.value)}
                  placeholder="e.g., 40.7128"
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  value={propertyData.longitude}
                  onChange={(e) => handleInputChange("longitude", e.target.value)}
                  placeholder="e.g., -74.0060"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Size & Units</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="buildingSize">Building Size</Label>
                <Input
                  id="buildingSize"
                  type="number"
                  value={propertyData.buildingSize}
                  onChange={(e) => handleInputChange("buildingSize", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="lotSize">Lot Size</Label>
                <Input
                  id="lotSize"
                  type="number"
                  value={propertyData.lotSize}
                  onChange={(e) => handleInputChange("lotSize", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>Measurement Unit</Label>
                <div className="flex space-x-2 mt-2">
                  <Button
                    type="button"
                    variant={propertyData.measurementUnit === "sqft" ? "default" : "outline"}
                    onClick={() => handleInputChange("measurementUnit", "sqft")}
                    className="flex-1"
                  >
                    sq ft
                  </Button>
                  <Button
                    type="button"
                    variant={propertyData.measurementUnit === "sqm" ? "default" : "outline"}
                    onClick={() => handleInputChange("measurementUnit", "sqm")}
                    className="flex-1"
                  >
                    sq m
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numberOfUnits">Number of Units</Label>
                <Input
                  id="numberOfUnits"
                  type="number"
                  value={propertyData.numberOfUnits}
                  onChange={(e) => handleInputChange("numberOfUnits", e.target.value)}
                  placeholder="1"
                />
              </div>
              <div>
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={propertyData.yearBuilt}
                  onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                  placeholder="e.g., 2020"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={propertyData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief summary of the property..."
              rows={4}
            />
          </div>

          {/* Conditional sections based on property type */}
          {propertyData.propertyType === "residential" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Residential Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={propertyData.bedrooms}
                    onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Number of Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={propertyData.bathrooms}
                    onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {["Swimming Pool", "Gym", "Parking", "HOA", "Balcony", "Garden", "Security", "Elevator"].map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={propertyData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean, 'amenities')}
                      />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {propertyData.propertyType === "commercial" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Commercial Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyClass">Property Class</Label>
                  <Select value={propertyData.propertyClass} onValueChange={(value) => handleInputChange("propertyClass", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class-a">Class A</SelectItem>
                      <SelectItem value="class-b">Class B</SelectItem>
                      <SelectItem value="class-c">Class C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="leaseTerms">Typical Lease Terms</Label>
                  <Select value={propertyData.leaseTerms} onValueChange={(value) => handleInputChange("leaseTerms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lease terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nnn">NNN (Triple Net)</SelectItem>
                      <SelectItem value="gross">Gross Lease</SelectItem>
                      <SelectItem value="modified-gross">Modified Gross</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Commercial Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {["Loading Dock", "High-Speed Internet", "Conference Rooms", "Reception Area", "Kitchen", "HVAC"].map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={propertyData.commercialAmenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean, 'commercialAmenities')}
                      />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ownership & Acquisition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="acquisitionDate">Acquisition Date</Label>
              <Input
                id="acquisitionDate"
                type="date"
                value={propertyData.acquisitionDate ? propertyData.acquisitionDate.toISOString().split('T')[0] : ''}
                onChange={(e) => handleInputChange("acquisitionDate", e.target.value ? new Date(e.target.value) : null)}
              />
            </div>
            <div>
              <Label htmlFor="acquisitionPrice">Acquisition Price</Label>
              <Input
                id="acquisitionPrice"
                type="number"
                value={propertyData.acquisitionPrice}
                onChange={(e) => handleInputChange("acquisitionPrice", e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={propertyData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Ownership Structure</h3>
              <Button onClick={addOwner} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Owner
              </Button>
            </div>
            
            {propertyData.owners.length > 0 && (
              <div className="mb-4">
                <div className="text-sm text-muted-foreground">
                  Total Ownership: {getTotalOwnership()}%
                  {getTotalOwnership() !== 100 && (
                    <span className="text-destructive ml-2">
                      (Should total 100%)
                    </span>
                  )}
                </div>
              </div>
            )}

            {propertyData.owners.map((owner, index) => (
              <Card key={owner.id} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold">Owner {index + 1}</h4>
                  <Button
                    onClick={() => removeOwner(owner.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Owner Name</Label>
                    <Input
                      value={owner.name}
                      onChange={(e) => updateOwner(owner.id, 'name', e.target.value)}
                      placeholder="Search for person or organization..."
                    />
                  </div>
                  <div>
                    <Label>Ownership Type</Label>
                    <Select value={owner.type} onValueChange={(value) => updateOwner(owner.id, 'type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole">Sole</SelectItem>
                        <SelectItem value="joint-tenancy">Joint Tenancy</SelectItem>
                        <SelectItem value="tenancy-in-common">Tenancy In Common</SelectItem>
                        <SelectItem value="trust-beneficiary">Trust Beneficiary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ownership Percentage (%)</Label>
                    <Input
                      type="number"
                      value={owner.percentage}
                      onChange={(e) => updateOwner(owner.id, 'percentage', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Photos & Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Primary Image</Label>
            <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Click to upload or drag and drop your primary property image</p>
              <p className="text-sm text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          <div>
            <Label>Photo Gallery</Label>
            <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Upload multiple images to showcase your property</p>
              <p className="text-sm text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB each</p>
            </div>
          </div>

          <div>
            <Label>Documents</Label>
            <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Upload floor plans, title deeds, permits, and other documents</p>
              <p className="text-sm text-muted-foreground mt-2">PDF, DOC, DOCX up to 25MB each</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review & Submit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Core Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><strong>Property Name:</strong> {propertyData.propertyName || "Not specified"}</div>
              <div><strong>Type:</strong> {propertyData.propertyType || "Not specified"}</div>
              <div><strong>Status:</strong> {propertyData.status || "Not specified"}</div>
              <div><strong>Country:</strong> {propertyData.country || "Not specified"}</div>
              <div className="md:col-span-2">
                <strong>Address:</strong> {[
                  propertyData.addressLine1,
                  propertyData.addressLine2,
                  propertyData.city,
                  propertyData.state,
                  propertyData.postalCode
                ].filter(Boolean).join(", ") || "Not specified"}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><strong>Building Size:</strong> {propertyData.buildingSize || "Not specified"} {propertyData.measurementUnit}</div>
              <div><strong>Lot Size:</strong> {propertyData.lotSize || "Not specified"} {propertyData.measurementUnit}</div>
              <div><strong>Units:</strong> {propertyData.numberOfUnits || "Not specified"}</div>
              <div><strong>Year Built:</strong> {propertyData.yearBuilt || "Not specified"}</div>
              {propertyData.description && (
                <div className="md:col-span-2"><strong>Description:</strong> {propertyData.description}</div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ownership & Acquisition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><strong>Acquisition Date:</strong> {propertyData.acquisitionDate?.toLocaleDateString() || "Not specified"}</div>
              <div><strong>Acquisition Price:</strong> {propertyData.acquisitionPrice ? `${propertyData.currency} ${propertyData.acquisitionPrice}` : "Not specified"}</div>
            </div>
            {propertyData.owners.length > 0 && (
              <div className="mt-4">
                <strong>Owners:</strong>
                <ul className="mt-2 space-y-1">
                  {propertyData.owners.map((owner, index) => (
                    <li key={owner.id} className="text-sm">
                      {owner.name || `Owner ${index + 1}`} - {owner.type} ({owner.percentage}%)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-6">
            <Button onClick={() => console.log("Property submitted:", propertyData)} className="w-full" size="lg">
              Submit Property
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        {/* Header without search */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Add New Property</h1>
              <p className="text-muted-foreground">Complete the form below to add a new property to your portfolio</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
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
          <div className="max-w-4xl mx-auto">
            {renderProgressBar()}

            <div className="mb-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < 5 ? (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={() => console.log("Form completed")}>
                  Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
