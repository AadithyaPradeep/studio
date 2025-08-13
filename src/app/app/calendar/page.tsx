import CalendarView from '@/components/calendar/calendar-view';

export default function CalendarPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Calendar</h1>
        <p className="text-muted-foreground">
          See your tasks at a glance.
        </p>
      </div>
      <CalendarView />
    </div>
  );
}
