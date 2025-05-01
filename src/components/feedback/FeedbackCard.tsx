
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeedbackItem } from "@/types/feedback";
import { StatusBadge } from "@/components/ui/status-badge";
import { CategoryBadge } from "@/components/ui/category-badge";
import { useFeedback } from "@/contexts/FeedbackContext";
import { ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FeedbackCardProps {
  feedback: FeedbackItem;
  onSelect?: (id: string) => void;
}

export function FeedbackCard({ feedback, onSelect }: FeedbackCardProps) {
  const { upvoteFeedback, deleteFeedback } = useFeedback();
  
  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    upvoteFeedback(feedback.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      deleteFeedback(feedback.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Edit feature coming soon!"); // Placeholder for edit functionality
  };
  
  return (
    <Card 
      className="w-full transition-all hover:shadow-lg cursor-pointer"
      onClick={() => onSelect?.(feedback.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{feedback.title}</h3>
            <div className="flex flex-wrap gap-2">
              <CategoryBadge category={feedback.category} />
              <StatusBadge status={feedback.status} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleEdit} aria-label="Edit feedback">
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} aria-label="Delete feedback">
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{feedback.description}</p>
      </CardContent>
      <CardFooter className="pt-1 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleUpvote}
          aria-label="Upvote feedback"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{feedback.votes}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
