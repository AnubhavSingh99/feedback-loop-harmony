import { useState } from "react";
import { useFeedback } from "@/contexts/FeedbackContext";
import { FeedbackCategory } from "@/types/feedback";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  category: z.enum(["Bug Report", "Feature Request", "Improvement", "Question", "Other"] as const),
});

type FormData = z.infer<typeof formSchema>;

export function FeedbackForm() {
  const { addFeedback } = useFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Feature Request",
    },
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    addFeedback({
      title: data.title,
      description: data.description,
      category: data.category as FeedbackCategory,
      status: "New",
    });
    form.reset();
    setIsSubmitting(false);
  };

  const categories: FeedbackCategory[] = [
    "Bug Report",
    "Feature Request",
    "Improvement",
    "Question",
    "Other",
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Submit Feedback</CardTitle>
        <CardDescription className="text-gray-600">
          Share your thoughts, suggestions, or report issues.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a clear, brief title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Summarize your feedback in a few words.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide more details about your feedback..."
                      className="min-h-40"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please be as specific as possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-primary">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the type of feedback you're providing.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full py-3 text-lg font-semibold transition-colors duration-300 hover:bg-primary/90"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
