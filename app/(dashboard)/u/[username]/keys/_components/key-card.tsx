"use client"

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copyButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface keyCardProps{
    value: string | null;
}

export const KeyCard = ({
    value
}: keyCardProps) =>{

    const [ show, setShow ] = useState(false);
    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-start gap-x-10">
                <p className="shrink-0 font-semibold">
                    Stream Key
                </p>
                <div className="spacy-y-2 w-full ">
                    <div className="w-full items-center flex gap-x-2">
                        <Input 
                            value={value || ""}
                            type={show ? "text": "password"}
                            disabled
                            placeholder="Stream key"
                        />
                        <CopyButton value={value || ""}/>
                    </div>
                    <Button onClick={() => setShow(!show)} size="sm" variant="link">
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}