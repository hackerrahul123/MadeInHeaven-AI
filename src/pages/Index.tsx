import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import CategoriesSection from "@/components/CategoriesSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aiWebsiteService from "@/services/aiWebsiteService";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const isAdmin = aiWebsiteService.isAdmin();
  // Add state to force re-render when components mount
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Ensure we're getting fresh data when the component mounts
  useEffect(() => {
    setRefreshKey(Date.now());
    
    // If admin is logged in, sync automatically
    if (isAdmin) {
      handleSyncData();
    }
  }, [isAdmin]);

  const handleRefreshData = () => {
    setRefreshKey(Date.now());
    toast.success("Data refreshed", { duration: 2000 });
  };
  
  const handleSyncData = async () => {
    setIsSyncing(true);
    try {
      const success = await aiWebsiteService.forceSyncData();
      
      if (success) {
        setRefreshKey(Date.now());
        toast.success("Data synchronized", { 
          description: "Website content is now in sync with the latest data",
          duration: 2000 
        });
      }
    } catch (error) {
      console.error("Sync error:", error);
    } finally {
      setIsSyncing(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {isAdmin && (
        <div className="bg-yellow-50 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <p className="text-yellow-800 font-medium">
                <Shield className="inline-block mr-1" size={16} /> Admin mode active
              </p>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSyncData}
                  disabled={isSyncing}
                  className="flex items-center gap-1"
                >
                  {isSyncing ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Syncing...</>
                  ) : (
                    <><RefreshCw className="h-4 w-4" /> Sync</>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefreshData}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Link to="/admin">
                  <Button variant="outline" size="sm">Admin Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <FeaturedSection 
        title="Featured AI Websites" 
        subtitle="Discover top-rated AI tools and services"
        getWebsites={aiWebsiteService.getFeatured}
        showViewMore={true}
        viewMoreLink="/featured"
        key={`featured-section-${refreshKey}`}
      />
      
      <CategoriesSection />
      
      <FeaturedSection 
        title="Trending AI Tools" 
        subtitle="See what's popular right now"
        getWebsites={aiWebsiteService.getTrending}
        showViewMore={true}
        viewMoreLink="/trending"
        key={`trending-section-${refreshKey}`}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
