
import { useEffect, useState } from "react";
import { AIWebsite } from "@/data/aiWebsites";
import AIWebsiteCard from "./AIWebsiteCard";
import aiWebsiteService from "@/services/aiWebsiteService";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  getWebsites: () => AIWebsite[];
  limit?: number;
  showViewMore?: boolean;
  viewMoreLink?: string;
  onDelete?: (id: string) => void;
}

const FeaturedSection = ({
  title,
  subtitle,
  getWebsites,
  limit = 4,
  showViewMore = false,
  viewMoreLink = "/",
  onDelete
}: FeaturedSectionProps) => {
  const [websites, setWebsites] = useState<AIWebsite[]>([]);

  useEffect(() => {
    setWebsites(getWebsites().slice(0, limit));
  }, [getWebsites, limit]);

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
      setWebsites(websites.filter(website => website.id !== id));
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">{title}</h2>
          {subtitle && <p className="mt-3 text-xl text-gray-600">{subtitle}</p>}
        </div>

        {websites.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {websites.map(website => (
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
                  onDelete={onDelete ? handleDelete : undefined}
                />
              ))}
            </div>

            {showViewMore && (
              <div className="mt-10 text-center">
                <Button asChild variant="outline">
                  <Link to={viewMoreLink}>View More</Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600">No websites found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
