"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Edit, Trash2 } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { TASK_CATEGORIES } from "./constants";
import type { Task } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  category: z.string({ required_error: "Please select a category." }),
  dueDate: z.date().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

interface TaskFormProps {
  mode: "add" | "edit";
  task?: Task;
  onTaskSubmit: (data: Omit<Task, "id" | "isCompleted" | "createdAt"> | Task) => void;
  onDelete?: (id: string) => void;
  children: React.ReactNode;
}

export default function TaskForm({
  mode,
  task,
  onTaskSubmit,
  onDelete,
  children,
}: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      category: task?.category || "",
      dueDate: task?.dueDate ? new Date(task.dueDate) : null,
    },
  });

  const onSubmit = (values: FormValues) => {
    const taskData = {
      ...values,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
    };
    if (mode === "edit" && task) {
      onTaskSubmit({ ...task, ...taskData });
    } else {
      onTaskSubmit(taskData);
    }
    setIsOpen(false);
    form.reset({ title: "", category: "", dueDate: null });
  };

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task.id);
      setIsOpen(false);
    }
  };

  const handleDateSelect = (
    currentValue: Date | null,
    onChange: (...event: any[]) => void,
    day?: Date
  ) => {
    if (day && currentValue && day.getTime() === currentValue.getTime()) {
      onChange(null); // Deselect if the same day is clicked again
    } else {
      onChange(day);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Task" : "Edit Task"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Finish project report" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TASK_CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(day) => handleDateSelect(field.value, field.onChange, day)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              {mode === 'edit' && onDelete && (
                <Button type="button" variant="destructive" onClick={handleDelete} className="mr-auto">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              )}
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {mode === 'add' ? 'Add Task' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
