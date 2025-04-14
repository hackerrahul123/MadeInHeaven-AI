
import CategoryCard from "./CategoryCard";
import aiCategoriesData from "@/data/aiCategoriesData";

const CategoriesSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Browse by Category</h2>
          <p className="mt-3 text-xl text-gray-600">
            Explore AI tools and websites organized by their primary function
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {aiCategoriesData.map((category, index) => (
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
      </div>
    </section>
  );
};

export default CategoriesSection;
