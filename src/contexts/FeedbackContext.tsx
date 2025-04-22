import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeedbackItem, FeedbackCategory, FeedbackStatus, FeedbackStats } from 'types/feedback';

// Simple function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

interface FeedbackContextType {
  feedbackItems: FeedbackItem[];
  isLoading: boolean;
  error: string | null;
  stats: FeedbackStats;
  addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'createdAt' | 'updatedAt' | 'votes' | 'comments'>) => Promise<void>;
  updateFeedback: (id: string, updates: Partial<FeedbackItem>) => Promise<void>;
  deleteFeedback: (id: string) => Promise<void>;
  getFilteredFeedback: (categories?: FeedbackCategory[], statuses?: FeedbackStatus[]) => FeedbackItem[];
  upvoteFeedback: (id: string) => Promise<void>;
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

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<FeedbackStats>(defaultStats);

  // Fetch feedback items from backend API
  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/feedback');
        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }
        const data: FeedbackItem[] = await response.json();
        setFeedbackItems(data);
        setIsLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, []);

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

  const addFeedback = async (feedback: Omit<FeedbackItem, 'id' | 'createdAt' | 'updatedAt' | 'votes' | 'comments'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      if (!response.ok) {
        throw new Error('Failed to add feedback');
      }
      const newFeedback: FeedbackItem = await response.json();
      setFeedbackItems(prev => [newFeedback, ...prev]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const updateFeedback = async (id: string, updates: Partial<FeedbackItem>) => {
    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error('Failed to update feedback');
      }
      const updatedFeedback: FeedbackItem = await response.json();
      setFeedbackItems(prev =>
        prev.map(item => (item.id === id ? updatedFeedback : item))
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deleteFeedback = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }
      setFeedbackItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const getFilteredFeedback = (categories?: FeedbackCategory[], statuses?: FeedbackStatus[]) => {
    return feedbackItems.filter(item => {
      const categoryMatch = !categories || categories.length === 0 || categories.includes(item.category);
      const statusMatch = !statuses || statuses.length === 0 || statuses.includes(item.status);
      return categoryMatch && statusMatch;
    });
  };

  const upvoteFeedback = async (id: string) => {
    try {
      const item = feedbackItems.find(item => item.id === id);
      if (!item) return;
      const updatedVotes = item.votes + 1;
      await updateFeedback(id, { votes: updatedVotes });
    } catch (err) {
      setError((err as Error).message);
    }
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
