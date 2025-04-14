
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import AIWebsiteCard from "@/components/AIWebsiteCard";
import aiWebsiteService from "@/services/aiWebsiteService";
import { AIWebsite } from "@/data/aiWebsites";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<AIWebsite[]>([]);
  
  useEffect(() => {
    if (query) {
      const searchResults = aiWebsiteService.search(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);
  
  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-ai-purple to-ai-pink py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                Search Results
              </h1>
              <div className="mt-4 max-w-lg mx-auto">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder="Search AI tools and websites..."
                  className="bg-white p-2 rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {query && (
            <div className="mb-6 text-lg">
              {results.length === 0 ? 
                <p>No results found for <strong>"{query}"</strong></p> : 
                <p>Showing {results.length} result{results.length !== 1 ? 's' : ''} for <strong>"{query}"</strong></p>
              }
            </div>
          )}
          
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map(website => (
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
          ) : query ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No AI tools or websites found matching your search.
              </p>
              <p className="text-gray-500">
                Try adjusting your search terms or browse our categories.
              </p>
            </div>
          ) : null}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
