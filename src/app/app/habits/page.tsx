import HabitTracker from '@/components/habits/habit-tracker';

export default function HabitsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Habit Tracker</h1>
        <p className="text-muted-foreground">
          Stay consistent and build better habits.
        </p>
      </div>
      <HabitTracker />
    </div>
  );
}
