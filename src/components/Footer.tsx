import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Categories
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/categories/text"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Text AI
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/image"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Image AI
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/video"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Video AI
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/audio"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Audio AI
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Contribute
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/add"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Add AI Website
                </Link>
              </li>
              <li>
                <Link
                  to="https://madeinnheaven.com/tech-blogs/"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="https://madeinnheaven.com/"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  MadeInHeaven
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="https://madeinnheaven.com/"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  to="https://madeinnheaven.com/"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  App Development
                </Link>
              </li>
              <li>
                <Link
                  to="https://madeinnheaven.com/"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  E Commerce Development
                </Link>
              </li>
              <li>
                <Link
                  to="https://madeinnheaven.com/"
                  className="text-base text-gray-600 hover:text-ai-purple"
                >
                  Business Automation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">
            © {currentYear} Developed & ❤️ by Rahl Rane
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
