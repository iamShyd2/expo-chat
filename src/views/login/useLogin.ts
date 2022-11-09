import { useContext, useState } from "react";
import { apiHost } from "src/consts";
import AppContext from "src/contexts/AppContext";
import { storeData } from "lib/Storage";

const useLogin = () => {

    const {
        onToggleSnackbar,
        setCurrentUser,
    } = useContext(AppContext);

    const [isFetching, setIsFetching] = useState(false);

    const onSubmit = async (values: { email: string, password: string }) => {
        setIsFetching(true);
        try {
            const res = await fetch(`${apiHost}/sign_in`, {
                body: JSON.stringify(values),
                method: "POST",
            })            
            if(res.ok){
                const headers: { [x: string]: string | null; } = {};
                [
                    "access-token",
                    "expiry",
                    "client",
                    "uid",
                ].forEach((key) => {
                    headers[key] = res.headers.get(key);
                });
                storeData("token", JSON.stringify(headers))
                const body = await res.json();                
                setCurrentUser(body);
            }
            else if(res.status == 401){
                onToggleSnackbar("Invalid email or password")
            }
        } catch (e) {
            console.log(e);
        }
        finally{
            setIsFetching(false)
        }
    }

    return {
        onSubmit,
        isFetching,
    }
}

export default useLogin;