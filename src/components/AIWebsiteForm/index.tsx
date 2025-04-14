
import React from "react";
import { useAIWebsiteForm } from "@/hooks/useAIWebsiteForm";
import AIWebsiteFormInputs from "./AIWebsiteFormInputs";
import AIWebsiteFormSubmit from "./AIWebsiteFormSubmit";

const AIWebsiteForm: React.FC = () => {
  const { formData, isSubmitting, handleChange, handleSelectChange, handleCheckboxChange, handleSubmit } = useAIWebsiteForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AIWebsiteFormInputs 
        formData={formData}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      <AIWebsiteFormSubmit isSubmitting={isSubmitting} />
    </form>
  );
};

export default AIWebsiteForm;
