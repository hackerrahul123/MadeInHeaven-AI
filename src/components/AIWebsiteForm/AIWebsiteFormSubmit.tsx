
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Save, ArrowLeft, RefreshCw } from "lucide-react";
import aiWebsiteService from "@/services/aiWebsiteService";

interface AIWebsiteFormSubmitProps {
  isSubmitting: boolean;
}

const AIWebsiteFormSubmit: React.FC<AIWebsiteFormSubmitProps> = ({ isSubmitting }) => {
  const navigate = useNavigate();

  const handleSync = async () => {
    toast.loading("Syncing data...", { id: "sync-data", duration: 1500 });
    
    try {
      await aiWebsiteService.forceSyncData();
      toast.success("Data synchronized successfully", { id: "sync-data" });
    } catch (error) {
      toast.error("Failed to sync data", { id: "sync-data" });
    }
  };

  return (
    <div className="pt-4">
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-ai-purple to-ai-pink hover:opacity-90 text-white"
        disabled={isSubmitting}
        size="lg"
        onClick={() => {
          if (!isSubmitting) {
            // Show loading indicator via toast
            toast.loading("Adding website...", {
              id: "website-submit",
              duration: Infinity, // will be dismissed when submission is complete
            });
          }
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Add AI Website
          </>
        )}
      </Button>
      
      <div className="mt-4 flex justify-between flex-wrap gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            toast.info("Returning to admin dashboard", { duration: 2000 });
            navigate("/admin");
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel & Return to Dashboard
        </Button>
        
        <Button 
          type="button" 
          variant="outline"
          onClick={handleSync}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Sync Data
        </Button>
      </div>
    </div>
  );
};

export default AIWebsiteFormSubmit;
