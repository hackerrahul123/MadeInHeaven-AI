
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import SearchBar from "@/components/SearchBar";
import aiCategoriesData, { CategoryData } from "@/data/aiCategoriesData";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<CategoryData[]>(aiCategoriesData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredCategories(aiCategoriesData);
      return;
    }
    
    const filtered = aiCategoriesData.filter(
      category => 
        category.title.toLowerCase().includes(query.toLowerCase()) || 
        category.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredCategories(filtered);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-ai-purple to-ai-pink py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                AI Categories
              </h1>
              <p className="mt-4 text-lg text-white/90">
                Browse our collection of AI tools and websites by category
              </p>
              <div className="mt-6 max-w-lg mx-auto">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder="Search categories..."
                  className="bg-white p-2 rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => (
                <CategoryCard
                  key={index}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  color={category.color}
                  slug={category.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No categories found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
