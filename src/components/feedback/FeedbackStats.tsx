
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFeedback } from "@/contexts/FeedbackContext";
import { FeedbackCategory, FeedbackStatus } from "@/types/feedback";
import { Progress } from "@/components/ui/progress";

export function FeedbackStats() {
  const { stats } = useFeedback();

  const categoryColors: Record<FeedbackCategory, string> = {
    "Bug Report": "bg-red-500",
    "Feature Request": "bg-blue-500",
    "Improvement": "bg-green-500",
    "Question": "bg-purple-500",
    "Other": "bg-gray-500",
  };

  const statusColors: Record<FeedbackStatus, string> = {
    "New": "bg-info",
    "In Progress": "bg-warning",
    "Completed": "bg-success",
    "Declined": "bg-destructive",
  };

  const getPercentage = (count: number) => {
    return stats.total > 0 ? (count / stats.total) * 100 : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>By Category</CardTitle>
          <CardDescription>Distribution of feedback by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{category}</span>
                  <span className="text-muted-foreground">
                    {count} ({Math.round(getPercentage(count))}%)
                  </span>
                </div>
                <Progress 
                  value={getPercentage(count)} 
                  className={categoryColors[category as FeedbackCategory]} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>By Status</CardTitle>
          <CardDescription>Progress on addressing feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{status}</span>
                  <span className="text-muted-foreground">
                    {count} ({Math.round(getPercentage(count))}%)
                  </span>
                </div>
                <Progress 
                  value={getPercentage(count)} 
                  className={statusColors[status as FeedbackStatus]} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
