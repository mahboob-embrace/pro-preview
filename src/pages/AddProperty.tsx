
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import { BasicInformation } from "@/components/FormSections/BasicInformation";
import { LocationSection } from "@/components/FormSections/LocationSection";
import { PropertyDetails } from "@/components/FormSections/PropertyDetails";
import { FinancialInformation } from "@/components/FormSections/FinancialInformation";
import { ImageUpload } from "@/components/FormSections/ImageUpload";

interface FormData {
  name: string;
  type: string;
  subType: string;
  status: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  buildingSize: number;
  sizeUnit: string;
  yearBuilt: number;
  bedrooms: number;
  bathrooms: number;
  acquisitionValue: number;
  currency: string;
  monthlyRent: number;
  expenses: number;
}

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("properties");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    subType: "",
    status: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    buildingSize: 0,
    sizeUnit: "",
    yearBuilt: 0,
    bedrooms: 0,
    bathrooms: 0,
    acquisitionValue: 0,
    currency: "",
    monthlyRent: 0,
    expenses: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toast({
      title: "Property Created",
      description: "Your property has been successfully created.",
    });
    navigate("/properties");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/properties")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Add New Property</h1>
              <p className="text-muted-foreground mt-1">Create a new property listing</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <BasicInformation formData={formData} setFormData={setFormData} />
            <LocationSection formData={formData} setFormData={setFormData} />
            <PropertyDetails formData={formData} setFormData={setFormData} />
            <FinancialInformation formData={formData} setFormData={setFormData} />
            <ImageUpload />

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate("/properties")}>
                Cancel
              </Button>
              <Button type="submit">
                Create Property
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
