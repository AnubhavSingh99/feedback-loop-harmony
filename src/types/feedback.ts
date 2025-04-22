export interface FeedbackItem {
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
  comments: FeedbackComment[];
}

export interface FeedbackComment {
  content: string;
  createdBy: string;
  createdAt: Date;
}

export type FeedbackCategory = "Bug Report" | "Feature Request" | "Improvement" | "Question" | "Other";

export type FeedbackStatus = "New" | "In Progress" | "Completed" | "Declined";

export interface FeedbackStats {
  total: number;
  byCategory: Record<FeedbackCategory, number>;
  byStatus: Record<FeedbackStatus, number>;
}
