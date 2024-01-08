import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

const reciever = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
    const body = await req.text();
    const headerPayload = headers();
    const authorisation = headerPayload.get("Authorization")

    if(!authorisation){
        return new Response("No Authorization header", {status: 400}) 
    }

    const event = reciever.receive(body, authorisation);

    if(event.event === "ingress_ended"){
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId
            },
            data: {
                isLive: false
            }
        });
    };

    if(event.event === "ingress_started"){
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId
            },
            data: {
                isLive: true
            }
        });
    };

}