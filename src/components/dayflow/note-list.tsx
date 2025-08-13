"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Note } from "@/lib/types";
import { FilePlus2 } from "lucide-react";
import NoteItem from "./note-item";

interface NoteListProps {
  notes: Note[];
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export default function NoteList({ notes, onUpdateNote, onDeleteNote }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-24 px-4 border-2 border-dashed rounded-xl bg-card/50">
        <FilePlus2 className="mx-auto h-16 w-16 text-muted-foreground/50" />
        <h3 className="mt-6 text-xl font-semibold text-foreground">
          No notes here
        </h3>
        <p className="mt-2 text-base text-muted-foreground">
          Create your first note to get started!
        </p>
      </div>
    );
  }

  return (
    <motion.div layout className="space-y-4">
      <AnimatePresence>
        {notes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onUpdateNote={onUpdateNote}
            onDeleteNote={onDeleteNote}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
