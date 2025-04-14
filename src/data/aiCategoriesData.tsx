
import { MessageCircle, Image, Video, Music, Box, PencilRuler } from "lucide-react";

export interface CategoryData {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  slug: string;
}

const aiCategoriesData: CategoryData[] = [
  {
    title: "Text AI",
    description: "Chatbots, writing assistants, and language processing tools",
    icon: <MessageCircle className="text-white" />,
    color: "bg-ai-blue",
    slug: "text"
  },
  {
    title: "Image AI",
    description: "Image generation, editing, and enhancement tools",
    icon: <Image className="text-white" />,
    color: "bg-ai-purple",
    slug: "image"
  },
  {
    title: "Video AI",
    description: "Video generation, editing, and enhancement tools",
    icon: <Video className="text-white" />,
    color: "bg-ai-red",
    slug: "video"
  },
  {
    title: "Audio AI",
    description: "Speech synthesis, music generation, and audio tools",
    icon: <Music className="text-white" />,
    color: "bg-ai-green",
    slug: "audio"
  },
  {
    title: "3D & AR/VR",
    description: "3D modeling, augmented reality, and virtual reality tools",
    icon: <Box className="text-white" />,
    color: "bg-ai-orange",
    slug: "3d"
  },
  {
    title: "Other AI",
    description: "Specialized AI tools and platforms for various use cases",
    icon: <PencilRuler className="text-white" />,
    color: "bg-ai-teal",
    slug: "other"
  }
];

export default aiCategoriesData;
