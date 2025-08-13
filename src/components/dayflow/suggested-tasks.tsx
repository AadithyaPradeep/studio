"use client";

import { useState } from "react";
import { Sparkles, PlusCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { getSuggestedTasks, type SuggestedTask } from "@/app/actions";
import type { Task } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface SuggestedTasksProps {
  onTaskCreate: (taskData: Omit<Task, "id" | "isCompleted" | "createdAt">) => void;
  previousTaskTitles: string[];
  todaysCategories: string[];
}

export default function SuggestedTasks({ 
  onTaskCreate,
  previousTaskTitles,
  todaysCategories 
}: SuggestedTasksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedTask[]>([]);
  const { toast } = useToast();

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setSuggestions([]);
    const result = await getSuggestedTasks(todaysCategories, previousTaskTitles);
    setSuggestions(result);
    setIsLoading(false);
  };

  const handleAddSuggestion = (suggestion: SuggestedTask) => {
    onTaskCreate({
      title: suggestion.title,
      category: suggestion.category,
      dueDate: null,
    });
    toast({
      title: "Task Added",
      description: `"${suggestion.title}" has been added to your list.`,
    });
    setSuggestions(prev => prev.filter(s => s.title !== suggestion.title));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={fetchSuggestions}>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI-Powered Task Suggestions</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-md bg-secondary/50"
                  >
                    <p className="text-sm font-medium text-secondary-foreground">
                      {suggestion.title}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAddSuggestion(suggestion)}
                      aria-label={`Add task: ${suggestion.title}`}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-10">
                  No suggestions available right now. Try adding more tasks!
                </p>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
