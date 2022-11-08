import { createContext } from "react";

export interface IAppContext {
    onToggleSnackbar: (message: string) => void
    message: string
    onHideSnackbar: () => void
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;