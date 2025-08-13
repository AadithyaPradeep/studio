
export const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 7; // Start from 7 AM
    return `${hour.toString().padStart(2, '0')}:00`;
});
  
export const categoryColors: { [key: string]: string } = {
    Work: 'bg-blue-200/50 border-blue-500 text-blue-800',
    Personal: 'bg-purple-200/50 border-purple-500 text-purple-800',
    Errands: 'bg-yellow-200/50 border-yellow-500 text-yellow-800',
    Health: 'bg-green-200/50 border-green-500 text-green-800',
    Social: 'bg-pink-200/50 border-pink-500 text-pink-800',
    Finance: 'bg-indigo-200/50 border-indigo-500 text-indigo-800',
    Home: 'bg-orange-200/50 border-orange-500 text-orange-800',
    Learn: 'bg-teal-200/50 border-teal-500 text-teal-800',
};

export const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

export const getTaskPosition = (task: { startTime?: string | null, endTime?: string | null }) => {
    if (!task.startTime || !task.endTime) return { top: 0, height: 0 };
    
    const startMinutes = timeToMinutes(task.startTime) - (7 * 60); // Day starts at 7:00 AM
    const endMinutes = timeToMinutes(task.endTime) - (7 * 60);
    const duration = endMinutes - startMinutes;
    
    // Each hour is 5rem (h-20), so 1 minute is 5/60 rem.
    const top = (startMinutes / 60) * 5;
    const height = (duration / 60) * 5;

    return { top, height };
};
