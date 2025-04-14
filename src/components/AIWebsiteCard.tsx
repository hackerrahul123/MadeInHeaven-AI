
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trash2, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

interface AIWebsiteCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  url: string;
  pricing?: string;
  tags?: string[];
  onDelete?: (id: string) => void;
}

const AIWebsiteCard = ({
  id,
  title,
  description,
  imageUrl,
  category,
  url,
  pricing = "Free",
  tags = [],
  onDelete
}: AIWebsiteCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikes(likes + 1);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/ai/${id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-white text-gray-800">{pricing}</Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <Badge className={`
              ${category === "Text" ? "bg-ai-blue" : ""}
              ${category === "Image" ? "bg-ai-purple" : ""}
              ${category === "Video" ? "bg-ai-red" : ""}
              ${category === "Audio" ? "bg-ai-green" : ""}
              ${category === "3D" ? "bg-ai-orange" : ""}
              ${category === "Other" ? "bg-ai-teal" : ""}
            `}>
              {category}
            </Badge>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline">{tag}</Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline">+{tags.length - 3}</Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLike}
              className="flex items-center gap-1 text-gray-600 hover:text-ai-purple"
            >
              <ThumbsUp size={16} /> {likes > 0 ? likes : ''}
            </Button>
            
            {onDelete && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleDelete}
                className="flex items-center gap-1 text-gray-600 hover:text-red-500"
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={(e) => {
              e.preventDefault();
              window.open(url, '_blank');
            }}
          >
            Visit <ExternalLink size={14} />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AIWebsiteCard;
