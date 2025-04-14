
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AIWebsite } from "@/data/aiWebsites";
import aiWebsiteService from "@/services/aiWebsiteService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2, ThumbsUp, Calendar } from "lucide-react";
import { toast } from 'sonner';

const AIWebsiteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [website, setWebsite] = useState<AIWebsite | null>(null);
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const websiteData = aiWebsiteService.getById(id);
      if (websiteData) {
        setWebsite(websiteData);
      }
      setIsLoading(false);
    }
  }, [id]);
  
  const handleLike = () => {
    setLikes(likes + 1);
    toast.success("Thanks for your feedback!");
  };
  
  const handleDelete = () => {
    if (id) {
      const success = aiWebsiteService.remove(id);
      if (success) {
        toast.success("AI website removed successfully");
        navigate("/");
      } else {
        toast.error("Failed to remove AI website");
      }
    }
  };
  
  const handleVisitWebsite = () => {
    if (website?.url) {
      window.open(website.url, "_blank");
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse-slow">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!website) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Website not found</h2>
            <p className="mt-2 text-gray-600">The website you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-6" onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const getCategoryColor = () => {
    const colorMap: Record<string, string> = {
      "Text": "bg-ai-blue",
      "Image": "bg-ai-purple",
      "Video": "bg-ai-red",
      "Audio": "bg-ai-green",
      "3D": "bg-ai-orange",
      "Other": "bg-ai-teal"
    };
    
    return colorMap[website.category] || "bg-ai-purple";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className={`${getCategoryColor()} py-16`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
              <div>
                <Badge className="mb-4 bg-white text-gray-800">
                  {website.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                  {website.title}
                </h1>
                <p className="mt-4 text-lg text-white/90 max-w-2xl">
                  {website.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="secondary" 
                  className="flex gap-2 items-center" 
                  onClick={handleVisitWebsite}
                >
                  Visit Website <ExternalLink size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  className="flex gap-2 items-center bg-white/20 hover:bg-white/30 text-white border-white/20"
                  onClick={handleLike}
                >
                  <ThumbsUp size={16} /> {likes > 0 ? likes : "Like"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={website.imageUrl} 
                  alt={website.title} 
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">About {website.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {website.longDescription || website.description}
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-medium text-lg mb-4">Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Pricing</p>
                    <p className="font-medium">{website.pricing}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{website.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Added</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar size={14} /> {website.dateAdded}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {website.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} /> Remove Website
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIWebsiteDetail;
