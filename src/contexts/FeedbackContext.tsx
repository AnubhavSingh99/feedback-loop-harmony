
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeedbackItem, FeedbackCategory, FeedbackStatus, FeedbackStats } from '@/types/feedback';

// Simple function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

interface FeedbackContextType {
  feedbackItems: FeedbackItem[];
  isLoading: boolean;
  error: string | null;
  stats: FeedbackStats;
  addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'createdAt' | 'updatedAt' | 'votes' | 'comments'>) => void;
  updateFeedback: (id: string, updates: Partial<FeedbackItem>) => void;
  deleteFeedback: (id: string) => void;
  getFilteredFeedback: (categories?: FeedbackCategory[], statuses?: FeedbackStatus[]) => FeedbackItem[];
  upvoteFeedback: (id: string) => void;
}

const defaultStats: FeedbackStats = {
  total: 0,
  byCategory: {
    "Bug Report": 0,
    "Feature Request": 0,
    "Improvement": 0,
    "Question": 0,
    "Other": 0
  },
  byStatus: {
    "New": 0,
    "In Progress": 0,
    "Completed": 0,
    "Declined": 0
  }
};

// Sample initial data
const initialFeedback: FeedbackItem[] = [
  {
    id: generateId(),
    title: "Add dark mode to the dashboard",
    description: "It would be great to have a dark mode option for the dashboard to reduce eye strain during night time usage.",
    category: "Feature Request",
    status: "In Progress",
    votes: 15,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: generateId(),
    title: "Fix login button on mobile",
    description: "The login button is not working properly on mobile devices. It doesn't respond to taps.",
    category: "Bug Report",
    status: "New",
    votes: 8,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: generateId(),
    title: "Improve loading performance",
    description: "The app takes too long to load on slower connections. Can we optimize the initial load time?",
    category: "Improvement",
    status: "Completed",
    votes: 12,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: generateId(),
    title: "Add export to CSV feature",
    description: "Would like to be able to export the feedback data to CSV for analysis in other tools.",
    category: "Feature Request",
    status: "New",
    votes: 5,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: generateId(),
    title: "How do I reset my password?",
    description: "I forgot my password and can't find the reset option. Can someone help?",
    category: "Question",
    status: "Completed",
    votes: 0,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  }
];

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(initialFeedback);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<FeedbackStats>(defaultStats);

  // Calculate stats whenever feedbackItems change
  useEffect(() => {
    const newStats: FeedbackStats = {
      total: feedbackItems.length,
      byCategory: {
        "Bug Report": 0,
        "Feature Request": 0,
        "Improvement": 0,
        "Question": 0,
        "Other": 0
      },
      byStatus: {
        "New": 0,
        "In Progress": 0,
        "Completed": 0,
        "Declined": 0
      }
    };

    feedbackItems.forEach(item => {
      newStats.byCategory[item.category]++;
      newStats.byStatus[item.status]++;
    });

    setStats(newStats);
  }, [feedbackItems]);

  // In a real app, this would be fetching from MongoDB
  useEffect(() => {
    // This would be replaced with actual API calls in a real app
    setIsLoading(true);
    try {
      // Simulating API delay
      const timer = setTimeout(() => {
        // Data is already set in initialFeedback
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (error) {
      setError('Failed to load feedback items');
      setIsLoading(false);
    }
  }, []);

  const addFeedback = (feedback: Omit<FeedbackItem, 'id' | 'createdAt' | 'updatedAt' | 'votes' | 'comments'>) => {
    const newFeedback: FeedbackItem = {
      ...feedback,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      votes: 0,
      comments: []
    };
    
    setFeedbackItems(prev => [newFeedback, ...prev]);
  };

  const updateFeedback = (id: string, updates: Partial<FeedbackItem>) => {
    setFeedbackItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date() } 
          : item
      )
    );
  };

  const deleteFeedback = (id: string) => {
    setFeedbackItems(prev => prev.filter(item => item.id !== id));
  };

  const getFilteredFeedback = (categories?: FeedbackCategory[], statuses?: FeedbackStatus[]) => {
    return feedbackItems.filter(item => {
      const categoryMatch = !categories || categories.length === 0 || categories.includes(item.category);
      const statusMatch = !statuses || statuses.length === 0 || statuses.includes(item.status);
      return categoryMatch && statusMatch;
    });
  };

  const upvoteFeedback = (id: string) => {
    setFeedbackItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, votes: item.votes + 1 } 
          : item
      )
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbackItems,
        isLoading,
        error,
        stats,
        addFeedback,
        updateFeedback,
        deleteFeedback,
        getFilteredFeedback,
        upvoteFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
