import { Link } from "react-router-dom";

const features = [
  {
    icon: "📝",
    title: "Powerful Analytics",
    description: "Visualize feedback trends and user sentiments with interactive charts.",
  },
  {
    icon: "👥",
    title: "User Engagement",
    description: "Engage with your users through comments, votes, and notifications.",
  },
  {
    icon: "🔄",
    title: "Continuous Improvement",
    description: "Close the feedback loop by implementing changes and tracking progress.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-blue-700 animate-fade-in">
        Welcome to Feedback Loop Harmony
      </h1>
      <p className="text-xl text-gray-700 max-w-3xl text-center mb-12 animate-fade-in delay-200">
        A beautiful, intuitive platform to collect, organize, and respond to user feedback. Close the loop with your users and build better products together.
      </p>
      <div className="flex gap-6 mb-16 animate-fade-in delay-400">
        <Link to="/dashboard" className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Get Started
        </Link>
        <Link to="/submit" className="px-8 py-4 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-100 transition">
          Submit Feedback
        </Link>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center animate-slide-up">
            <div className="text-6xl mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
        .animate-fade-in.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fade-in.delay-400 {
          animation-delay: 0.4s;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}
