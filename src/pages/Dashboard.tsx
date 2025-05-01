import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedbackList } from "@/components/feedback/FeedbackList";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { FeedbackDetail } from "@/components/feedback/FeedbackDetail";
import { FeedbackStats } from "@/components/feedback/FeedbackStats";
import { MongoDBInfo } from "@/components/feedback/MongoDBInfo";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useFeedback } from "@/contexts/FeedbackContext";

export default function Dashboard() {
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const { feedbackItems, addFeedback } = useFeedback();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportJSON = () => {
    const dataStr = JSON.stringify(feedbackItems, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feedback_export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (feedbackItems.length === 0) return;
    const headers = Object.keys(feedbackItems[0]);
    const csvRows = [
      headers.join(","),
      ...feedbackItems.map(item =>
        headers.map(header => JSON.stringify(item[header as keyof typeof item] ?? "")).join(",")
      ),
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feedback_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== "string") throw new Error("Invalid file content");
        let importedData = [];
        if (file.name.endsWith(".json")) {
          importedData = JSON.parse(text);
        } else if (file.name.endsWith(".csv")) {
          const lines = text.split("\n").filter(line => line.trim() !== "");
          const headers = lines[0].split(",").map(h => h.trim().replace(/(^"|"$)/g, ""));
          importedData = lines.slice(1).map(line => {
            const values = line.split(",").map(v => v.trim().replace(/(^"|"$)/g, ""));
            const obj: any = {};
            headers.forEach((header, idx) => {
              obj[header] = values[idx];
            });
            return obj;
          });
        } else {
          alert("Unsupported file format. Please upload JSON or CSV.");
          return;
        }
        // Add imported feedback items
        importedData.forEach((item: any) => {
          // Basic validation for required fields
          if (item.title && item.description && item.category) {
            addFeedback({
              title: item.title,
              description: item.description,
              category: item.category,
              status: item.status || "New",
            });
          }
        });
        alert("Import successful!");
      } catch (error) {
        alert("Failed to import file: " + (error as Error).message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-end gap-4 mb-4">
          <Button onClick={exportJSON} variant="outline" size="sm">Export JSON</Button>
          <Button onClick={exportCSV} variant="outline" size="sm">Export CSV</Button>
          <Button onClick={handleImportClick} variant="outline" size="sm">Import Feedback</Button>
          <input
            type="file"
            accept=".json,.csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
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
