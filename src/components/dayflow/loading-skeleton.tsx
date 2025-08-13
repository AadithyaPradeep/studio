import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <div>
                <Skeleton className="h-9 w-32 mb-2" />
                <Skeleton className="h-5 w-64" />
            </div>
            <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
        
        <Skeleton className="h-48 w-full mb-8 rounded-xl" />

        <div className="flex justify-end items-center mb-6">
            <Skeleton className="h-12 w-44 rounded-lg" />
        </div>

        <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
        </div>
    </div>
  );
}
