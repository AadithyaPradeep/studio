"use client";

import { useState } from "react";
import { Note } from "@/lib/types";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Trash2, Edit, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface NoteItemProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export default function NoteItem({ note, onUpdateNote, onDeleteNote }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onUpdateNote({ ...note, title, content });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  const noteItemVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <motion.div
      layout
      variants={noteItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Card className="w-full transition-shadow duration-300 hover:shadow-lg">
        {isEditing ? (
          <div className="p-4 space-y-4">
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold"
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="min-h-[120px] text-base"
              rows={5}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={handleCancel}><X className="mr-2" />Cancel</Button>
              <Button size="sm" onClick={handleSave}><Save className="mr-2"/>Save</Button>
            </div>
          </div>
        ) : (
          <>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-bold text-lg">{note.title}</CardTitle>
                    <CardDescription>
                      Last updated: {format(new Date(note.updatedAt), "MMM d, yyyy, h:mm a")}
                    </CardDescription>
                  </div>
                   <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your note.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDeleteNote(note.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </div>
              </div>
            </CardHeader>
            {note.content && (
                <CardContent>
                    <p className="text-base whitespace-pre-wrap">{note.content}</p>
                </CardContent>
            )}
          </>
        )}
      </Card>
    </motion.div>
  );
}
