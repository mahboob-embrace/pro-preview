
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export const ImageUpload = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Upload Property Images</h3>
          <p className="text-muted-foreground mb-4">Drag and drop your images here, or click to browse</p>
          <Button type="button" variant="outline">
            Choose Files
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
