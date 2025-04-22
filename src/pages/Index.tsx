
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent to-background">
      <div className="max-w-3xl px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-primary">Feedback</span> Loop Harmony
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A beautiful, intuitive platform to collect, organize, and respond to user feedback.
          Close the loop with your users and build better products together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="px-8">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/submit">Submit Feedback</Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="text-3xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">Collect Feedback</h3>
          <p className="text-muted-foreground">
            Easily gather feedback from users through a simple, intuitive interface.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">Track & Analyze</h3>
          <p className="text-muted-foreground">
            Monitor feedback trends and user sentiments with powerful analytics.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <div className="text-3xl mb-4">✅</div>
          <h3 className="text-xl font-semibold mb-2">Take Action</h3>
          <p className="text-muted-foreground">
            Close the feedback loop by responding to users and implementing changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
