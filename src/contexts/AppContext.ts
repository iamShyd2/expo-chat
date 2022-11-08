import { createContext } from "react";
import { IUser } from "src/models/user";

export interface IAppContext {
    onToggleSnackbar: (message: string) => void
    message: string
    onHideSnackbar: () => void
    currentUser?: IUser
    setCurrentUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;