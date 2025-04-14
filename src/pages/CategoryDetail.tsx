
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIWebsiteCard from "@/components/AIWebsiteCard";
import SearchBar from "@/components/SearchBar";
import aiWebsiteService from "@/services/aiWebsiteService";
import { AIWebsite } from "@/data/aiWebsites";
import aiCategoriesData from "@/data/aiCategoriesData";

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [websites, setWebsites] = useState<AIWebsite[]>([]);
  const [filteredWebsites, setFilteredWebsites] = useState<AIWebsite[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const category = aiCategoriesData.find(cat => cat.slug === slug);
  
  useEffect(() => {
    if (slug) {
      const categoryResults = aiWebsiteService.getByCategory(slug);
      setWebsites(categoryResults);
      setFilteredWebsites(categoryResults);
    }
  }, [slug]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredWebsites(websites);
      return;
    }
    
    const filtered = websites.filter(
      website => 
        website.title.toLowerCase().includes(query.toLowerCase()) || 
        website.description.toLowerCase().includes(query.toLowerCase()) ||
        website.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredWebsites(filtered);
  };
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Category not found</h2>
            <p className="mt-2 text-gray-600">The category you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className={`${category.color} py-12`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-white/20">
                {category.icon}
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                {category.title}
              </h1>
              <p className="mt-4 text-lg text-white/90">
                {category.description}
              </p>
              <div className="mt-6 max-w-lg mx-auto">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder={`Search in ${category.title}...`}
                  className="bg-white p-2 rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {searchQuery && (
            <div className="mb-6 text-lg">
              {filteredWebsites.length === 0 ? 
                <p>No results found for <strong>"{searchQuery}"</strong> in {category.title}</p> : 
                <p>Showing {filteredWebsites.length} result{filteredWebsites.length !== 1 ? 's' : ''} for <strong>"{searchQuery}"</strong></p>
              }
            </div>
          )}
          
          {filteredWebsites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWebsites.map(website => (
                <AIWebsiteCard
                  key={website.id}
                  id={website.id}
                  title={website.title}
                  description={website.description}
                  imageUrl={website.imageUrl}
                  category={website.category}
                  url={website.url}
                  pricing={website.pricing}
                  tags={website.tags}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No AI tools or websites found in this category{searchQuery ? ` matching "${searchQuery}"` : ""}.
              </p>
              {searchQuery && (
                <p className="text-gray-500">
                  Try adjusting your search terms or browse other categories.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
