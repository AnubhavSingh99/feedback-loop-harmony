
export type FeedbackCategory = 
  | "Bug Report" 
  | "Feature Request" 
  | "Improvement" 
  | "Question" 
  | "Other";

export type FeedbackStatus = 
  | "New" 
  | "In Progress" 
  | "Completed" 
  | "Declined";

export type FeedbackItem = {
  id: string;
  title: string;
  description: string;
  category: FeedbackCategory;
  status: FeedbackStatus;
  votes: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  assignedTo?: string;
  comments?: FeedbackComment[];
};

export type FeedbackComment = {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
};

export type FeedbackStats = {
  total: number;
  byCategory: Record<FeedbackCategory, number>;
  byStatus: Record<FeedbackStatus, number>;
};
