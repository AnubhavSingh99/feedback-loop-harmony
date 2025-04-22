
import { cn } from "@/lib/utils";
import { FeedbackCategory } from "@/types/feedback";

interface CategoryBadgeProps {
  category: FeedbackCategory;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const getCategoryStyles = () => {
    switch (category) {
      case "Bug Report":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Feature Request":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Improvement":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Question":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "Other":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        getCategoryStyles(),
        className
      )}
    >
      {category}
    </span>
  );
}
