
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyDetailsData {
  buildingSize: number;
  sizeUnit: string;
  yearBuilt: number;
  bedrooms: number;
  bathrooms: number;
}

interface PropertyDetailsProps {
  formData: PropertyDetailsData;
  setFormData: (updater: (prev: any) => any) => void;
}

export const PropertyDetails = ({ formData, setFormData }: PropertyDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buildingSize">Building Size</Label>
            <Input
              id="buildingSize"
              type="number"
              value={formData.buildingSize}
              onChange={(e) => setFormData(prev => ({ ...prev, buildingSize: Number(e.target.value) }))}
              placeholder="Enter size"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sizeUnit">Size Unit</Label>
            <Select value={formData.sizeUnit} onValueChange={(value) => setFormData(prev => ({ ...prev, sizeUnit: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sq ft">Square Feet</SelectItem>
                <SelectItem value="sq m">Square Meters</SelectItem>
                <SelectItem value="acres">Acres</SelectItem>
                <SelectItem value="hectares">Hectares</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearBuilt">Year Built</Label>
            <Input
              id="yearBuilt"
              type="number"
              value={formData.yearBuilt}
              onChange={(e) => setFormData(prev => ({ ...prev, yearBuilt: Number(e.target.value) }))}
              placeholder="Enter year"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: Number(e.target.value) }))}
              placeholder="Number of bedrooms"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              step="0.5"
              value={formData.bathrooms}
              onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: Number(e.target.value) }))}
              placeholder="Number of bathrooms"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
