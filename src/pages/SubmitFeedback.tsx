
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SubmitFeedback() {
  return (
    <div className="min-h-screen bg-accent/50">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          asChild 
          className="mb-6 hover:bg-background/50"
        >
          <Link to="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            We Value Your Feedback
          </h1>
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
