import React, { useState } from "react";
import { apiHost } from "src/consts";
import { getData } from "src/lib/Storage";
import { IUser } from "src/models/user";

interface IToken {
    accessToken: string
    client: string
    expiry: string
}

const useAuthentication = () => {

    const [currentUser, setCurrentUser] = useState<IUser>();
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const validateToken = async () => {
        try {
            let jsonToken = await getData("token");
            if (!jsonToken) return;
            const token = JSON.parse(jsonToken) as IToken;
            const {
                accessToken,
                expiry,
                client,
            } = token;
            const res = await fetch(`${apiHost}/validate_token`, {
                headers: {
                    "access-token": accessToken,
                    "expiry": expiry,
                    "client": client,
                }
            });
            if (res.ok) {
                const body = await res.json();
                setCurrentUser(body);
            }
        } catch (e) {
            console.log(e);
        }
        finally{
            setIsAuthenticating(false);
        }
    }

    React.useEffect(() => {
        validateToken()
    }, [])

    return {
        currentUser,
        setCurrentUser,
        isAuthenticating,
    }
}

export default useAuthentication;