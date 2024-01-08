import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import Image from "next/image";

interface ThumbnailProps {
    src: string | null;
    fallback: string;
    isLive:boolean;
    username:string;
}

export const Thumbnail = ({
    src,
    fallback,
    isLive,
    username
}: ThumbnailProps) => {
    let content;

    if(!src){
        content = (
            <div className="flex bg-background flex-col items-center justify-center gap-y-4 w-full transition-transform h-full 
            group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md">
                <UserAvatar 
                size="lg" 
                showBadge 
                username={username} 
                imageUrl={fallback} 
                isLive={isLive}/>
            </div>
        )
    }else{
        content = (
            <Image 
            src={src} 
            fill 
            alt="Thumbnail" 
            className="object-cover transition-transfrom group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md" />
        )
    }
    return (
        <div className="group aspect-video relative rounded-md cursor-pointer">
            <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"/>
            {content}
            {isLive && src && (
                    <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:transition-transform">
                        <LiveBadge/>
                    </div>
                )}
        </div>
    );
};

export const ThumbnailSkeletion = () => {
    return (
        <div className="group aspect-video realtive rounded-xl cursor-pointer">
            <Skeleton className="h-full w-full"/>
        </div>
    )
}