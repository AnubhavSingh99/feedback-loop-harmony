
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { FeedbackDetail } from "@/components/feedback/FeedbackDetail";
import { FeedbackStats } from "@/components/feedback/FeedbackStats";
import { MongoDBInfo } from "@/components/feedback/MongoDBInfo";
import { Header } from "@/components/layout/Header";

export default function Dashboard() {
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-12 mb-2">
            <MongoDBInfo />
          </div>
          
          <div className="md:col-span-12">
            <FeedbackStats />
          </div>
          
          <div className="md:col-span-8">
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="list">All Feedback</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="space-y-4">
                <FeedbackList
                  onFeedbackSelect={(id) => setSelectedFeedbackId(id)}
                />
              </TabsContent>
              
              <TabsContent value="new" className="space-y-4">
                <FeedbackList
                  onFeedbackSelect={(id) => setSelectedFeedbackId(id)}
                />
              </TabsContent>
              
              <TabsContent value="in-progress" className="space-y-4">
                <FeedbackList
                  onFeedbackSelect={(id) => setSelectedFeedbackId(id)}
                />
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4">
                <FeedbackList
                  onFeedbackSelect={(id) => setSelectedFeedbackId(id)}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:col-span-4">
            <FeedbackForm />
          </div>
        </div>
      </main>

      <FeedbackDetail
        feedbackId={selectedFeedbackId}
        onClose={() => setSelectedFeedbackId(null)}
      />
    </div>
  );
}
