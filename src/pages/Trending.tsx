
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedSection from "@/components/FeaturedSection";
import aiWebsiteService from "@/services/aiWebsiteService";

const Trending = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-ai-purple to-ai-pink py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Trending AI Tools
              </h1>
              <p className="mt-4 text-lg text-white/90">
                Discover the most popular AI tools and websites right now
              </p>
            </div>
          </div>
        </div>
        
        <FeaturedSection 
          title="Hot Right Now" 
          subtitle="What the AI community is using and talking about"
          getWebsites={aiWebsiteService.getTrending}
          limit={12}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Trending;
