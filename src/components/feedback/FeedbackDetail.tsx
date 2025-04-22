
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFeedback } from "@/contexts/FeedbackContext";
import { FeedbackItem, FeedbackStatus } from "@/types/feedback";
import { StatusBadge } from "@/components/ui/status-badge";
import { CategoryBadge } from "@/components/ui/category-badge";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThumbsUp, Calendar, MessageSquare } from "lucide-react";

interface FeedbackDetailProps {
  feedbackId: string | null;
  onClose: () => void;
}

export function FeedbackDetail({ feedbackId, onClose }: FeedbackDetailProps) {
  const { feedbackItems, updateFeedback, upvoteFeedback } = useFeedback();
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<FeedbackStatus | null>(null);

  const feedback = feedbackItems.find((item) => item.id === feedbackId);

  if (!feedback) {
    return null;
  }

  const handleStatusChange = (newStatus: FeedbackStatus) => {
    setStatus(newStatus);
    updateFeedback(feedback.id, { status: newStatus });
  };

  const handleUpvote = () => {
    upvoteFeedback(feedback.id);
  };

  const submitComment = () => {
    if (!comment.trim()) return;
    
    // In a real app, this would call an API
    const newComment = {
      id: Math.random().toString(36).substring(2, 15),
      content: comment,
      createdAt: new Date(),
      createdBy: "Current User", // In a real app, this would be the actual user
    };
    
    updateFeedback(feedback.id, {
      comments: [...(feedback.comments || []), newComment],
    });
    
    setComment("");
  };

  return (
    <Dialog open={!!feedbackId} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{feedback.title}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 pt-2">
            <CategoryBadge category={feedback.category} />
            <StatusBadge status={feedback.status} />
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-sm text-muted-foreground flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(feedback.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{feedback.votes} votes</span>
            </div>
            {feedback.comments && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{feedback.comments.length} comments</span>
              </div>
            )}
          </div>

          <div className="text-sm">
            <p className="whitespace-pre-wrap">{feedback.description}</p>
          </div>

          <div className="border-t pt-4">
            <label className="text-sm font-medium">Update Status</label>
            <Select
              value={status || feedback.status}
              onValueChange={(value) => handleStatusChange(value as FeedbackStatus)}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {feedback.comments && feedback.comments.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Comments</h4>
              <div className="space-y-4">
                {feedback.comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm">{comment.createdBy}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Add Comment</h4>
            <Textarea
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-24"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Button variant="outline" onClick={handleUpvote} className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>Upvote ({feedback.votes})</span>
          </Button>

          <div className="flex space-x-2">
            <Button variant="ghost" onClick={onClose}>Close</Button>
            <Button onClick={submitComment} disabled={!comment.trim()}>
              Add Comment
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
