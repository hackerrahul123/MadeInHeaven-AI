
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import aiWebsiteService from "@/services/aiWebsiteService";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = aiWebsiteService.isAdmin();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="bg-gradient-to-r from-ai-purple to-ai-pink text-transparent bg-clip-text text-2xl font-bold">
                AI Central
              </span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-ai-purple">
              Home
            </Link>
            <Link to="/categories" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-ai-purple">
              Categories
            </Link>
            <Link to="/trending" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-ai-purple">
              Trending
            </Link>
            {isAdmin && (
              <Link to="/admin" className="px-3 py-2 text-sm font-medium text-yellow-600 hover:text-yellow-800 flex items-center">
                <Shield className="mr-1" size={16} /> Admin
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex items-center">
            {isAdmin ? (
              <Button variant="default" className="bg-gradient-to-r from-ai-purple to-ai-pink hover:opacity-90">
                <Link to="/add">Add AI Website</Link>
              </Button>
            ) : (
              <Button variant="outline">
                <Link to="/admin">Admin Login</Link>
              </Button>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-ai-purple focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4 bg-white/90">
            <Link 
              to="/" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ai-purple hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ai-purple hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/trending" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ai-purple hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
            {isAdmin ? (
              <>
                <Link 
                  to="/admin" 
                  className="block px-3 py-2 text-base font-medium text-yellow-600 hover:text-yellow-800 hover:bg-gray-50 rounded-md flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="mr-1" size={16} /> Admin Dashboard
                </Link>
                <Link 
                  to="/add" 
                  className="block px-3 py-2 text-base font-medium text-ai-purple hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add AI Website
                </Link>
              </>
            ) : (
              <Link 
                to="/admin" 
                className="block px-3 py-2 text-base font-medium text-ai-purple hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
