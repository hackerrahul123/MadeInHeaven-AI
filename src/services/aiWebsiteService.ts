
import aiWebsites, { AIWebsite } from "@/data/aiWebsites";

// Use local storage to persist websites between page refreshes
const STORAGE_KEY = "ai_websites_data";
const ACTIVITY_HISTORY_KEY = "ai_websites_activity_history";
const LAST_SYNC_KEY = "ai_websites_last_sync";

// Activity history types
interface ActivityItem {
  id: string;
  action: 'add' | 'delete';
  websiteId: string;
  websiteTitle: string;
  timestamp: number;
  websiteData?: AIWebsite; // For undo deletion
  canUndo: boolean;
}

// Initialize websites from local storage or default data
const initializeWebsites = (): AIWebsite[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error("Error parsing stored websites data:", e);
      // Fallback to default data if parsing fails
      return [...aiWebsites];
    }
  }
  // First time - save default data to storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(aiWebsites));
  return [...aiWebsites];
};

// Initialize activity history
const initializeActivityHistory = (): ActivityItem[] => {
  const storedHistory = localStorage.getItem(ACTIVITY_HISTORY_KEY);
  if (storedHistory) {
    try {
      return JSON.parse(storedHistory);
    } catch (e) {
      console.error("Error parsing activity history:", e);
      return [];
    }
  }
  return [];
};

let websites = initializeWebsites();
let activityHistory = initializeActivityHistory();

// Helper function to persist data to localStorage
const persistWebsites = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));
  // Update last sync time
  setLastSyncTime();
};

// Helper function to persist activity history
const persistActivityHistory = () => {
  localStorage.setItem(ACTIVITY_HISTORY_KEY, JSON.stringify(activityHistory));
  // Update last sync time
  setLastSyncTime();
};

// Set last sync time
const setLastSyncTime = () => {
  localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
};

// Get last sync time
const getLastSyncTime = (): number => {
  const lastSync = localStorage.getItem(LAST_SYNC_KEY);
  return lastSync ? parseInt(lastSync) : 0;
};

// Simulate server sync (in a real app this would connect to a backend)
const syncWithServer = async (): Promise<boolean> => {
  // In a real app, this would check with the server for updates
  // Here we just simulate a network delay and return success
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

// Force reload data as if from server (for simulating cross-device sync)
const forceSyncData = async (): Promise<boolean> => {
  try {
    // Simulate network request
    const success = await syncWithServer();
    
    if (success) {
      // For demo purposes, we're not actually getting data from a server
      // but we're setting a new timestamp to simulate it
      setLastSyncTime();
      return true;
    }
    return false;
  } catch (e) {
    console.error("Error syncing data:", e);
    return false;
  }
};

// Add an item to activity history
const addActivityItem = (item: Omit<ActivityItem, "id" | "timestamp" | "canUndo">): void => {
  const newItem: ActivityItem = {
    ...item,
    id: Date.now().toString(),
    timestamp: Date.now(),
    canUndo: true
  };
  
  // Limit history to most recent 50 items
  activityHistory = [newItem, ...activityHistory].slice(0, 50);
  persistActivityHistory();
};

// Simple admin authentication (in a real app, this would be more secure)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

let isAdminLoggedIn = false;

const loginAsAdmin = (username: string, password: string): boolean => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    isAdminLoggedIn = true;
    return true;
  }
  return false;
};

const logoutAdmin = (): void => {
  isAdminLoggedIn = false;
};

const isAdmin = (): boolean => {
  return isAdminLoggedIn;
};

const getAll = (): AIWebsite[] => {
  return websites;
};

const getById = (id: string): AIWebsite | undefined => {
  return websites.find(website => website.id === id);
};

const getByCategory = (category: string): AIWebsite[] => {
  const categoryMap: Record<string, string> = {
    'text': 'Text',
    'image': 'Image',
    'video': 'Video',
    'audio': 'Audio',
    '3d': '3D',
    'other': 'Other'
  };

  const mappedCategory = categoryMap[category.toLowerCase()] || category;
  return websites.filter(website => website.category === mappedCategory);
};

const getFeatured = (): AIWebsite[] => {
  return websites.filter(website => website.featured);
};

const getTrending = (): AIWebsite[] => {
  return websites.filter(website => website.trending);
};

const search = (query: string): AIWebsite[] => {
  const lowerQuery = query.toLowerCase();
  return websites.filter(website => 
    website.title.toLowerCase().includes(lowerQuery) ||
    website.description.toLowerCase().includes(lowerQuery) ||
    website.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

const add = (website: Omit<AIWebsite, "id" | "dateAdded">): AIWebsite | null => {
  // Only allow admins to add websites
  if (!isAdminLoggedIn) {
    return null;
  }
  
  const newWebsite: AIWebsite = {
    ...website,
    id: Date.now().toString(),
    dateAdded: new Date().toISOString().split('T')[0]
  };
  
  websites = [...websites, newWebsite];
  persistWebsites(); // Save to localStorage
  
  // Add to activity history
  addActivityItem({
    action: 'add',
    websiteId: newWebsite.id,
    websiteTitle: newWebsite.title,
  });
  
  return newWebsite;
};

const remove = (id: string): boolean => {
  // Only allow admins to remove websites
  if (!isAdminLoggedIn) {
    return false;
  }
  
  const websiteToDelete = websites.find(website => website.id === id);
  if (!websiteToDelete) return false;
  
  const initialLength = websites.length;
  websites = websites.filter(website => website.id !== id);
  
  if (websites.length < initialLength) {
    persistWebsites(); // Save to localStorage
    
    // Add to activity history
    addActivityItem({
      action: 'delete',
      websiteId: id,
      websiteTitle: websiteToDelete.title,
      websiteData: websiteToDelete // Store the full website data for potential undo
    });
    
    return true;
  }
  return false;
};

const update = (id: string, updatedWebsite: Partial<AIWebsite>): AIWebsite | null => {
  // Only allow admins to update websites
  if (!isAdminLoggedIn) {
    return null;
  }
  
  const index = websites.findIndex(website => website.id === id);
  if (index === -1) return null;
  
  websites[index] = { ...websites[index], ...updatedWebsite };
  persistWebsites(); // Save to localStorage
  return websites[index];
};

// Get activity history
const getActivityHistory = (): ActivityItem[] => {
  return activityHistory;
};

// Undo an action from history
const undoAction = (activityId: string): boolean => {
  if (!isAdminLoggedIn) return false;
  
  const activityIndex = activityHistory.findIndex(item => item.id === activityId);
  if (activityIndex === -1) return false;
  
  const activity = activityHistory[activityIndex];
  if (!activity.canUndo) return false;
  
  let success = false;
  
  if (activity.action === 'add') {
    // Undo addition by removing the website
    success = Boolean(websites.find(w => w.id === activity.websiteId));
    if (success) {
      websites = websites.filter(w => w.id !== activity.websiteId);
      persistWebsites();
    }
  } else if (activity.action === 'delete' && activity.websiteData) {
    // Undo deletion by re-adding the website
    success = !Boolean(websites.find(w => w.id === activity.websiteId));
    if (success) {
      websites = [...websites, activity.websiteData];
      persistWebsites();
    }
  }
  
  if (success) {
    // Mark the activity as no longer undoable
    activityHistory[activityIndex].canUndo = false;
    persistActivityHistory();
  }
  
  return success;
};

// Reset to default data (useful for testing)
const resetToDefaults = (): void => {
  if (!isAdminLoggedIn) return;
  websites = [...aiWebsites];
  persistWebsites();
  // Clear activity history when resetting
  activityHistory = [];
  persistActivityHistory();
};

export default {
  getAll,
  getById,
  getByCategory,
  getFeatured,
  getTrending,
  search,
  add,
  remove,
  update,
  loginAsAdmin,
  logoutAdmin,
  isAdmin,
  resetToDefaults,
  getActivityHistory,
  undoAction,
  forceSyncData,
  getLastSyncTime
};
