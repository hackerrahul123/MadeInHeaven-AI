
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  slug: string;
}

const CategoryCard = ({ title, description, icon, color, slug }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${slug}`} className="block">
      <div className="border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
