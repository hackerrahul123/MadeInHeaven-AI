import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminLogin from "@/components/AdminLogin";
import { Button } from "@/components/ui/button";
import aiWebsiteService from "@/services/aiWebsiteService";
import FeaturedSection from "@/components/FeaturedSection";
import AdminActivityHistory from "@/components/AdminActivityHistory";
import { RefreshCw, Loader2, Plus, Database } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(aiWebsiteService.isAdmin());
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(aiWebsiteService.getLastSyncTime());
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(aiWebsiteService.isAdmin());
    setLastSyncTime(aiWebsiteService.getLastSyncTime());
    
    if (aiWebsiteService.isAdmin()) {
      handleSyncData();
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    handleSyncData();
  };

  const handleLogout = () => {
    aiWebsiteService.logoutAdmin();
    setIsAdmin(false);
    toast("Logged out", {
      description: "You've been successfully logged out of admin mode"
    });
  };

  const goToAddWebsite = () => {
    navigate("/add");
  };
  
  const handleDeleteWebsite = (id: string) => {
    const success = aiWebsiteService.remove(id);
    if (success) {
      toast.success("Website deleted", {
        description: "The website has been successfully removed"
      });
      setRefreshTrigger(prev => prev + 1);
    } else {
      toast.error("Failed to delete", {
        description: "There was an error deleting the website"
      });
    }
  };

  const refreshWebsites = () => {
    setRefreshTrigger(prev => prev + 1);
    toast.success("Data refreshed", {
      description: "Website data has been refreshed"
    });
  };

  const handleSyncData = async () => {
    setIsSyncing(true);
    try {
      const success = await aiWebsiteService.forceSyncData();
      
      if (success) {
        setLastSyncTime(aiWebsiteService.getLastSyncTime());
        setRefreshTrigger(prev => prev + 1);
        toast.success("Data synchronized", {
          description: "Your dashboard is now in sync with the latest data"
        });
      } else {
        toast.error("Sync failed", {
          description: "Could not synchronize with the server"
        });
      }
    } catch (error) {
      toast.error("Sync error", {
        description: "An error occurred while trying to sync data"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const formatSyncTime = (timestamp: number) => {
    if (!timestamp) return "Never";
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-ai-purple to-ai-blue py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-4 text-lg text-white/90">
                Manage AI websites and control content
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!isAdmin ? (
            <AdminLogin onSuccess={handleLoginSuccess} />
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Welcome, Admin</h2>
                  <p className="text-gray-500 text-sm">
                    Last sync: {formatSyncTime(lastSyncTime)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="default"
                    onClick={handleSyncData}
                    disabled={isSyncing}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90"
                  >
                    {isSyncing ? (
                      <><Loader2 className="mr-1 h-4 w-4 animate-spin" /> Syncing...</>
                    ) : (
                      <><RefreshCw className="mr-1 h-4 w-4" /> Sync Data</>
                    )}
                  </Button>
                  <Button variant="outline" onClick={refreshWebsites}>
                    <RefreshCw className="mr-1 h-4 w-4" />
                    Refresh Data
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Manage Websites</h3>
                  <p className="text-gray-600 mb-4">Add, edit or remove AI websites from the platform</p>
                  <Button onClick={goToAddWebsite}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add New Website
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Website Statistics</h3>
                  <p className="text-gray-600 mb-4">Overview of website data</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Total Websites</p>
                      <p className="text-2xl font-bold">{aiWebsiteService.getAll().length}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Featured</p>
                      <p className="text-2xl font-bold">{aiWebsiteService.getFeatured().length}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Trending</p>
                      <p className="text-2xl font-bold">{aiWebsiteService.getTrending().length}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Categories</p>
                      <p className="text-2xl font-bold">6</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Quick Actions</h3>
                  <p className="text-gray-600 mb-4">Common admin tasks</p>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline" onClick={goToAddWebsite}>
                      <Plus className="mr-2 h-4 w-4" /> Add New Website
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={handleSyncData} disabled={isSyncing}>
                      {isSyncing ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Syncing</>
                      ) : (
                        <><RefreshCw className="mr-2 h-4 w-4" /> Sync Data</>
                      )}
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={refreshWebsites}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/")}>
                      <Database className="mr-2 h-4 w-4" /> View Live Site
                    </Button>
                  </div>
                </div>
              </div>
              
              <AdminActivityHistory 
                refreshTrigger={refreshTrigger} 
                onUndo={() => setRefreshTrigger(prev => prev + 1)} 
              />
              
              <div className="space-y-8">
                <FeaturedSection 
                  title="All Websites" 
                  subtitle="Manage all websites in the platform"
                  getWebsites={aiWebsiteService.getAll}
                  onDelete={handleDeleteWebsite}
                  key={`all-websites-${refreshTrigger}`}
                  limit={100}
                />
                
                <FeaturedSection 
                  title="Featured Websites" 
                  subtitle="Websites marked as featured"
                  getWebsites={aiWebsiteService.getFeatured}
                  onDelete={handleDeleteWebsite}
                  key={`featured-websites-${refreshTrigger}`}
                  limit={100}
                />
                
                <FeaturedSection 
                  title="Trending Websites" 
                  subtitle="Websites marked as trending"
                  getWebsites={aiWebsiteService.getTrending}
                  onDelete={handleDeleteWebsite}
                  key={`trending-websites-${refreshTrigger}`}
                  limit={100}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
