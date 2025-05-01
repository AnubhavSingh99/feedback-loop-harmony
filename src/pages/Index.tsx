import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/80 to-background">
      <div className="max-w-4xl px-6 text-center">
        <h1 className="text-6xl font-extrabold mb-8 leading-tight">
          <span className="text-primary">Feedback</span> Loop Harmony
        </h1>
        <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          A beautiful, intuitive platform to collect, organize, and respond to user feedback.
          Close the loop with your users and build better products together.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button asChild size="lg" className="px-10 py-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-10 py-4 border-2 border-primary hover:bg-primary/10 transition-colors duration-300">
            <Link to="/submit">Submit Feedback</Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="text-4xl mb-6">📝</div>
          <h3 className="text-2xl font-semibold mb-3">Collect Feedback</h3>
          <p className="text-muted-foreground text-lg">
            Easily gather feedback from users through a simple, intuitive interface.
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="text-4xl mb-6">📊</div>
          <h3 className="text-2xl font-semibold mb-3">Track & Analyze</h3>
          <p className="text-muted-foreground text-lg">
            Monitor feedback trends and user sentiments with powerful analytics.
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="text-4xl mb-6">✅</div>
          <h3 className="text-2xl font-semibold mb-3">Take Action</h3>
          <p className="text-muted-foreground text-lg">
            Close the feedback loop by responding to users and implementing changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
