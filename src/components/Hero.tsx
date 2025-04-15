import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const Hero = ({
  title = "Discover the Best Free AI Tools & Websites in One Place",
  subtitle = "Search, explore and find the perfect AI tools for your needs \n MadeInheaven Tech Ai Tools & Websites",
}: HeroProps) => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-ai-purple to-ai-pink">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
            {subtitle}
          </p>
          <div className="mt-10 max-w-2xl mx-auto">
            <SearchBar
              onSearch={handleSearch}
              className="bg-white p-2 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
