import { useState } from "react";
import { IUser } from "src/models/user";

const useAuthentication = () => {

    const [currentUser, setCurrentUser] = useState<IUser>();

    return {
        currentUser,
        setCurrentUser,
    }
}

export default useAuthentication;