import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // ensure this exists

export default function PostCardSkeleton() {
    return (
        <div className="flex flex-col gap-3 h-full p-4 rounded-lg border border-white/20 shadow animate-pulse">
            <Skeleton className="h-48 w-full rounded-md" />
            <Skeleton className="h-6 w-3/4 mt-2" />
            <Skeleton className="h-4 w-full mt-1" />
            <Skeleton className="h-4 w-5/6 mt-1" />
            <div className="flex justify-between items-center mt-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-16 rounded-md" />
            </div>
        </div>
    );
}
