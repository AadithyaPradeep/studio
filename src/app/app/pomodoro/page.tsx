import PomodoroTimer from '@/components/pomodoro/pomodoro-timer';

export default function PomodoroPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold font-headline">Pomodoro Timer</h1>
        <p className="text-muted-foreground">
          Focus on your tasks, one session at a time.
        </p>
      </div>
      <PomodoroTimer />
    </div>
  );
}
