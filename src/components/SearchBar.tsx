
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search AI tools and websites...", className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex w-full items-center gap-2 ${className}`}>
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 w-full rounded-lg border border-gray-300 focus:border-ai-purple focus:ring-1 focus:ring-ai-purple"
        />
      </div>
      <Button 
        type="submit" 
        className="h-12 bg-gradient-to-r from-ai-purple to-ai-pink hover:opacity-90"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
