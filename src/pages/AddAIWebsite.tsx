
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIWebsiteForm from "@/components/AIWebsiteForm";
import AIWebsiteFormHeader from "@/components/AIWebsiteForm/AIWebsiteFormHeader";
import aiWebsiteService from "@/services/aiWebsiteService";
import { useToast } from "@/hooks/use-toast";

const AddAIWebsite = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  
  // Check if user is admin, redirect if not
  useEffect(() => {
    if (!aiWebsiteService.isAdmin()) {
      uiToast({
        variant: "destructive",
        title: "Access Denied",
        description: "You must be an admin to add websites",
      });
      navigate("/admin");
    }
  }, [navigate, uiToast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <AIWebsiteFormHeader />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AIWebsiteForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddAIWebsite;
