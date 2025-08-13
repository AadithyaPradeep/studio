"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Edit, Trash2, Flag, Clock } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TASK_CATEGORIES } from "./constants";
import type { Task } from "@/lib/types";
import { Label } from "@/components/ui/label";

const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
});

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100),
  category: z.string({ required_error: "Please select a category." }),
  dueDate: z.date().nullable(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  priority: z.enum(["low", "medium", "high", "none"]),
}).refine(data => {
    if (data.startTime && data.endTime) {
        return data.startTime < data.endTime;
    }
    return true;
}, {
    message: "End time must be after start time.",
    path: ["endTime"],
});

type FormValues = z.infer<typeof formSchema>;

interface TaskFormProps {
  mode: "add" | "edit";
  task?: Task;
  onTaskSubmit: (data: Omit<Task, "id" | "isCompleted" | "createdAt" | "subtasks"> | Task) => void;
  children: React.ReactNode;
}

export default function TaskForm({
  mode,
  task,
  onTaskSubmit,
  children,
}: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      category: task?.category || "",
      dueDate: task?.dueDate ? new Date(task.dueDate) : null,
      startTime: task?.startTime || null,
      endTime: task?.endTime || null,
      priority: task?.priority || "none",
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
    form.reset({ title: "", category: "", dueDate: null, startTime: null, endTime: null, priority: "none" });
  };

  const handleDateSelect = (
    currentValue: Date | null,
    onChange: (...event: any[]) => void,
    day?: Date
  ) => {
    if (day && currentValue && day.getTime() === currentValue.getTime()) {
      onChange(null);
    } else {
      onChange(day);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
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
             <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                      <FormControl>
                        <SelectTrigger>
                          <Clock className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
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
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                      <FormControl>
                        <SelectTrigger>
                          <Clock className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-4"
                    >
                       <FormItem className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none" className="font-normal flex items-center gap-2 cursor-pointer">
                          <Flag className="w-4 h-4 text-gray-400" /> None
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low" className="font-normal flex items-center gap-2 cursor-pointer">
                          <Flag className="w-4 h-4 text-blue-500" /> Low
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="font-normal flex items-center gap-2 cursor-pointer">
                          <Flag className="w-4 h-4 text-yellow-500" /> Medium
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high" className="font-normal flex items-center gap-2 cursor-pointer">
                          <Flag className="w-4 h-4 text-red-500" /> High
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
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
