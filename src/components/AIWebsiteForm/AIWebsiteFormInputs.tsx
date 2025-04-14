
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AIWebsite } from "@/data/aiWebsites";

interface AIWebsiteFormData {
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  category: AIWebsite["category"];
  url: string;
  pricing: AIWebsite["pricing"];
  tags: string;
  featured: boolean;
  trending: boolean;
}

interface AIWebsiteFormInputsProps {
  formData: AIWebsiteFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange?: (name: string, checked: boolean) => void;
}

const AIWebsiteFormInputs: React.FC<AIWebsiteFormInputsProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  handleCheckboxChange,
}) => {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Website Title *
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., ChatGPT"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Short Description *
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="A brief description (100-150 characters)"
          required
          rows={2}
          maxLength={150}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="longDescription" className="block text-sm font-medium">
          Long Description
        </label>
        <Textarea
          id="longDescription"
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          placeholder="A more detailed description (optional)"
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium">
            Category *
          </label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange("category", value)}
            required
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="Image">Image</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="3D">3D</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="pricing" className="block text-sm font-medium">
            Pricing Model *
          </label>
          <Select
            value={formData.pricing}
            onValueChange={(value) => handleSelectChange("pricing", value as AIWebsite["pricing"])}
            required
          >
            <SelectTrigger id="pricing">
              <SelectValue placeholder="Select pricing model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Freemium">Freemium</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="url" className="block text-sm font-medium">
          Website URL *
        </label>
        <Input
          id="url"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="imageUrl" className="block text-sm font-medium">
          Image URL
        </label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg (optional)"
        />
        <p className="text-xs text-gray-500">
          Leave blank to use a default image. For best results, use an image with 16:9 aspect ratio.
        </p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="tags" className="block text-sm font-medium">
          Tags
        </label>
        <Input
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="AI, Machine Learning, NLP (comma separated)"
        />
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="featured" 
            checked={formData.featured} 
            onCheckedChange={(checked) => handleCheckboxChange && handleCheckboxChange("featured", checked === true)}
          />
          <Label htmlFor="featured">Feature on homepage</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="trending" 
            checked={formData.trending} 
            onCheckedChange={(checked) => handleCheckboxChange && handleCheckboxChange("trending", checked === true)}
          />
          <Label htmlFor="trending">Add to trending</Label>
        </div>
      </div>
    </>
  );
};

export default AIWebsiteFormInputs;
