"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { ChatInfo } from "./chat-info"

interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isChatFollowersOnly: boolean;
    isFollowing: boolean;
    isChatDelayed: boolean;
};

export const ChatForm = ({
    onChange,
    onSubmit,
    isChatDelayed,
    isChatFollowersOnly,
    isFollowing,
    isHidden,
    value
}: ChatFormProps) => {
    const [isDelayedBlocked, setIsDelayedBlocked] = useState(false);

    const isFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayedBlocked || isFollowersOnlyAndNotFollowing;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if(!value || isDisabled) return;

        if(isChatDelayed && isDelayedBlocked){
            setIsDelayedBlocked(true);
            setTimeout(() => {
                setIsDelayedBlocked(false);
                onSubmit();
            }, 3000)
        }else{
            onSubmit();
        }
    }

    if(isHidden){
        return null;
    }

    return (
        <form className="flex flex-col items-center gap-y-4 p-3" onSubmit={handleSubmit}>
            <div className="w-full">
                <ChatInfo isFollowersOnly={isChatFollowersOnly} isDelayed={isChatDelayed}/>
                <Input onChange={(e) => onChange(e.target.value)} value={value} disabled={isDisabled} placeholder="Send a message" 
                className={cn("border-white/10", (isChatFollowersOnly || isChatDelayed) && "rounded-t-none border-t-0")}>

                </Input>
            </div>
            <div>
                <Button variant="primary" type="submit" size="sm" disabled={isDisabled} className="ml-auto">
                    Chat
                </Button>
            </div>
        </form>
    );
};

export const ChartFormSkeleton = () =>{
    return(
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="w-full h-10"/>
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7"/>
                <Skeleton className="h-7 w-12"/>
            </div>
        </div>
    )
}