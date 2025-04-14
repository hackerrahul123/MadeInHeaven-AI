
export interface AIWebsite {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  category: 'Text' | 'Image' | 'Video' | 'Audio' | '3D' | 'Other';
  url: string;
  pricing?: 'Free' | 'Freemium' | 'Paid' | 'Enterprise';
  tags: string[];
  dateAdded: string;
  featured?: boolean;
  trending?: boolean;
}

// Sample data
const aiWebsites: AIWebsite[] = [
  {
    id: "1",
    title: "ChatGPT",
    description: "ChatGPT is an AI chatbot that uses natural language processing to create humanlike conversational dialogue.",
    longDescription: "ChatGPT is an AI chatbot developed by OpenAI that uses natural language processing to create humanlike conversational dialogue. The language model can respond to questions and compose various written content, including articles, social media posts, essays, code, and emails.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop",
    category: "Text",
    url: "https://chat.openai.com",
    pricing: "Freemium",
    tags: ["Chatbot", "AI Assistant", "NLP", "OpenAI"],
    dateAdded: "2023-01-15",
    featured: true,
    trending: true
  },
  {
    id: "2",
    title: "DALL-E",
    description: "DALL-E is an AI system that can create realistic images and art from a description in natural language.",
    longDescription: "DALL-E is a neural network developed by OpenAI that creates images from textual descriptions. It can generate realistic images and art from a description in natural language. The second version, DALL-E 2, was announced in April 2022.",
    imageUrl: "https://images.unsplash.com/photo-1686191128520-3063c1dfff21?q=80&w=2940&auto=format&fit=crop",
    category: "Image",
    url: "https://openai.com/dall-e-2",
    pricing: "Paid",
    tags: ["Image Generation", "AI Art", "OpenAI", "Text-to-Image"],
    dateAdded: "2023-02-20",
    featured: true
  },
  {
    id: "3",
    title: "Midjourney",
    description: "Midjourney is an AI program that generates images from textual descriptions.",
    longDescription: "Midjourney is an independent research lab that produces an artificial intelligence program that creates images from textual descriptions, similar to OpenAI's DALL-E and Stable Diffusion. The tool is currently in open beta.",
    imageUrl: "https://images.unsplash.com/photo-1684382550385-6b7786d05d5b?q=80&w=2832&auto=format&fit=crop",
    category: "Image",
    url: "https://www.midjourney.com",
    pricing: "Paid",
    tags: ["Image Generation", "AI Art", "Text-to-Image", "Digital Art"],
    dateAdded: "2023-03-05",
    trending: true
  },
  {
    id: "4",
    title: "Runway ML",
    description: "Runway is an applied AI research company that enables creators to edit and generate content using AI.",
    longDescription: "Runway ML is an applied AI research company that builds tools to edit and generate content using artificial intelligence. They offer video generation, editing, and other creative tools powered by machine learning.",
    imageUrl: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=2787&auto=format&fit=crop",
    category: "Video",
    url: "https://runwayml.com",
    pricing: "Freemium",
    tags: ["Video Generation", "AI Video", "Content Creation", "Machine Learning"],
    dateAdded: "2023-04-10"
  },
  {
    id: "5",
    title: "ElevenLabs",
    description: "ElevenLabs offers AI voice technology for creating synthetic voices that sound like real people.",
    longDescription: "ElevenLabs is pioneering the next generation of AI voice technology. Their platform allows users to create synthetic voices that sound exactly like real people, with complete control over how they speak.",
    imageUrl: "https://images.unsplash.com/photo-1660691551829-11283b43134b?q=80&w=2787&auto=format&fit=crop",
    category: "Audio",
    url: "https://elevenlabs.io",
    pricing: "Freemium",
    tags: ["Voice AI", "Text-to-Speech", "Synthetic Voice", "Audio Generation"],
    dateAdded: "2023-05-15",
    trending: true
  },
  {
    id: "6",
    title: "Stability AI",
    description: "Stability AI is the company behind Stable Diffusion, an open-source text-to-image model.",
    longDescription: "Stability AI is an artificial intelligence company and leader in open generative AI. They developed Stable Diffusion, a deep learning text-to-image model released in 2022.",
    imageUrl: "https://images.unsplash.com/photo-1662018341732-78473db1e9c6?q=80&w=2880&auto=format&fit=crop",
    category: "Image",
    url: "https://stability.ai",
    pricing: "Freemium",
    tags: ["Image Generation", "Open Source", "Text-to-Image", "Stable Diffusion"],
    dateAdded: "2023-06-20",
    featured: true
  },
  {
    id: "7",
    title: "Anthropic Claude",
    description: "Claude is an AI assistant created by Anthropic to be helpful, harmless, and honest.",
    longDescription: "Claude is an AI assistant created by Anthropic, designed to be helpful, harmless, and honest. It's designed to be a conversational AI system that's natural, helpful, and safe.",
    imageUrl: "https://images.unsplash.com/photo-1677442135274-3e59efea8f6c?q=80&w=2940&auto=format&fit=crop",
    category: "Text",
    url: "https://www.anthropic.com/claude",
    pricing: "Freemium",
    tags: ["AI Assistant", "NLP", "Conversational AI", "ChatGPT Alternative"],
    dateAdded: "2023-07-05"
  },
  {
    id: "8",
    title: "Synthesia",
    description: "Synthesia is an AI video generation platform that creates videos from text.",
    longDescription: "Synthesia is an AI video generation platform that lets you turn text into videos with AI avatars in minutes. It's used by thousands of companies to create videos in 120 languages, saving up to 80% of time and budget.",
    imageUrl: "https://images.unsplash.com/photo-1590856029826-c7a73142d2ee?q=80&w=2838&auto=format&fit=crop",
    category: "Video",
    url: "https://www.synthesia.io",
    pricing: "Paid",
    tags: ["AI Video", "Text-to-Video", "AI Avatars", "Video Generation"],
    dateAdded: "2023-08-12"
  }
];

export default aiWebsites;
