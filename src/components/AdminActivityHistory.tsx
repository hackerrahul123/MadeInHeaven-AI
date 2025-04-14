
import React, { useState, useEffect } from "react";
import { Undo, RefreshCw, RefreshCw as CloudSync, Loader2 } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import aiWebsiteService from "@/services/aiWebsiteService";

interface ActivityItem {
  id: string;
  action: 'add' | 'delete';
  websiteId: string;
  websiteTitle: string;
  timestamp: number;
  canUndo: boolean;
}

interface AdminActivityHistoryProps {
  refreshTrigger: number;
  onUndo: () => void;
}

const AdminActivityHistory: React.FC<AdminActivityHistoryProps> = ({ 
  refreshTrigger,
  onUndo 
}) => {
  const [activityHistory, setActivityHistory] = useState<ActivityItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(aiWebsiteService.getLastSyncTime());

  useEffect(() => {
    loadActivityHistory();
    setLastSyncTime(aiWebsiteService.getLastSyncTime());
  }, [refreshTrigger]);

  const loadActivityHistory = () => {
    const history = aiWebsiteService.getActivityHistory();
    setActivityHistory(history);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadActivityHistory();
    toast.success("Activity history refreshed");
    setTimeout(() => setIsRefreshing(false), 500);
  };
  
  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const success = await aiWebsiteService.forceSyncData();
      
      if (success) {
        setLastSyncTime(aiWebsiteService.getLastSyncTime());
        loadActivityHistory();
        toast.success("Activity history synchronized");
        onUndo(); // Refresh parent components as well
      } else {
        toast.error("Sync failed");
      }
    } catch (error) {
      toast.error("Error during sync");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUndo = (item: ActivityItem) => {
    const success = aiWebsiteService.undoAction(item.id);
    if (success) {
      toast.success(`Action undone successfully`, {
        description: `${item.action === 'add' ? 'Addition' : 'Deletion'} of "${item.websiteTitle}" has been undone.`
      });
      loadActivityHistory();
      onUndo();
    } else {
      toast.error("Could not undo action", {
        description: "The website may have been modified further since this action."
      });
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  const formatSyncTime = (timestamp: number) => {
    if (!timestamp) return "Never synced";
    return `Last sync: ${new Date(timestamp).toLocaleString()}`;
  };

  if (activityHistory.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Recent Activity</h3>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSync} 
              disabled={isSyncing}
              className="flex items-center"
            >
              {isSyncing ? (
                <><Loader2 className="mr-1 h-4 w-4 animate-spin" /> Syncing...</>
              ) : (
                <><CloudSync className="mr-1 h-4 w-4" /> Sync</>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh} 
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-1 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        <p className="text-gray-600">No recent activity found.</p>
        <p className="text-xs text-gray-500 mt-2">{formatSyncTime(lastSyncTime)}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-medium">Recent Activity</h3>
          <p className="text-xs text-gray-500">{formatSyncTime(lastSyncTime)}</p>
        </div>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSync} 
            disabled={isSyncing}
            className="flex items-center"
          >
            {isSyncing ? (
              <><Loader2 className="mr-1 h-4 w-4 animate-spin" /> Syncing...</>
            ) : (
              <><CloudSync className="mr-1 h-4 w-4" /> Sync</>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-1 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead className="w-[100px]">Undo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <span className={item.action === 'add' ? 'text-green-600' : 'text-red-600'}>
                    {item.action === 'add' ? 'Added' : 'Deleted'}
                  </span>
                </TableCell>
                <TableCell>{item.websiteTitle}</TableCell>
                <TableCell>{formatDate(item.timestamp)}</TableCell>
                <TableCell>
                  {item.canUndo ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleUndo(item)}
                      className="hover:text-blue-600"
                    >
                      <Undo className="h-4 w-4" />
                    </Button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminActivityHistory;
