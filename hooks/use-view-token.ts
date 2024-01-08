import { toast } from "sonner";
import { useEffect, useState } from "react";
import { createViewerToken } from "@/actions/token";

import { JwtPayload, jwtDecode} from "jwt-decode"

export const useViewerToken = (hostIdentity: string) =>{
    const [token, setToken] = useState("");
    const [name, setname ] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() =>{
        const createToken = async () => {
            try{
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                    name?: string
                }

                const name = decodedToken?.name;
                const identity = decodedToken.jti;

                if(identity){
                    setIdentity(identity);
                }

                if(name){
                    setname(name);
                }

            }catch{
                toast.error("Something went wrong")
            }
        }
        createToken();
    }, [hostIdentity]);

    return {
        token, name, identity
    }
};