
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { AIWebsite } from "@/data/aiWebsites";
import aiWebsiteService from "@/services/aiWebsiteService";

interface FormData {
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

export const useAIWebsiteForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    longDescription: "",
    imageUrl: "",
    category: "" as AIWebsite["category"],
    url: "",
    pricing: "Free" as AIWebsite["pricing"],
    tags: "",
    featured: false,
    trending: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const validateForm = () => {
    if (!formData.title || !formData.description || !formData.category || !formData.url) {
      toast("Please fill out all required fields", {
        description: "All fields marked with * are required",
        action: {
          label: "Dismiss",
          onClick: () => {}
        },
      });
      return false;
    }
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Form validation
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }
      
      // Process tags
      const tags = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag);
      
      // Add the website
      const newWebsite = aiWebsiteService.add({
        title: formData.title,
        description: formData.description,
        longDescription: formData.longDescription || formData.description,
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGRpZ2l0YWwlMjBhaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        category: formData.category,
        url: formData.url,
        pricing: formData.pricing,
        tags: tags,
        featured: formData.featured,
        trending: formData.trending,
      });

      if (newWebsite) {
        toast("AI website added successfully!", {
          description: `${formData.title} has been added to the directory.`,
        });
        navigate(`/ai/${newWebsite.id}`);
      } else {
        toast("Failed to add AI website", {
          description: "Permission error or invalid data",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      toast("Failed to add AI website", {
        description: "Please try again.",
        action: {
          label: "Dismiss",
          onClick: () => {}
        },
      });
      console.error("Error adding website:", error);
      setIsSubmitting(false);
    }
  };
  
  return {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit
  };
};
