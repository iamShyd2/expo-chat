import { useContext, useEffect, useState } from "react";
import { apiHost } from "src/consts";
import AppContext from "src/contexts/AppContext";
import { getData, storeData } from "lib/Storage";
import { IToken } from "src/hooks/useAuthentication";
import { IChat } from "src/models/chat";

const useHome = () => {

    const [chats, setChats] = useState<IChat[]>([]);

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        fetchChats()
    }, [])

    const fetchChats = async () => {
        try {
            let jsonToken = await getData("token");
            if (!jsonToken) return;
            const token = JSON.parse(jsonToken) as IToken;
            const {
                accessToken,
                expiry,
                client,
            } = token;
            const res = await fetch(`${apiHost}/chatrooms`, {
                headers: {
                    "access-token": accessToken,
                    "expiry": expiry,
                    "client": client,
                }
            });
            if (res.ok) {
                const body = await res.json();
                setChats(body);
            }
        } catch (e) {
            console.log(e);
        }
        finally{
            setIsFetching(false);
        }
    }

    return {
        isFetching,
        chats,
    }
}

export default useHome;