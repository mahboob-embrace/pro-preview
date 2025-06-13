
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FinancialData {
  acquisitionValue: number;
  currency: string;
  monthlyRent: number;
  expenses: number;
}

interface FinancialInformationProps {
  formData: FinancialData;
  setFormData: (updater: (prev: any) => any) => void;
}

export const FinancialInformation = ({ formData, setFormData }: FinancialInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="acquisitionValue">Acquisition Value</Label>
            <Input
              id="acquisitionValue"
              type="number"
              value={formData.acquisitionValue}
              onChange={(e) => setFormData(prev => ({ ...prev, acquisitionValue: Number(e.target.value) }))}
              placeholder="Enter acquisition value"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyRent">Monthly Rent</Label>
            <Input
              id="monthlyRent"
              type="number"
              value={formData.monthlyRent}
              onChange={(e) => setFormData(prev => ({ ...prev, monthlyRent: Number(e.target.value) }))}
              placeholder="Enter monthly rent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expenses">Monthly Expenses</Label>
            <Input
              id="expenses"
              type="number"
              value={formData.expenses}
              onChange={(e) => setFormData(prev => ({ ...prev, expenses: Number(e.target.value) }))}
              placeholder="Enter monthly expenses"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
