import { useState } from "react"

const useSnackbar = () => {

    const [message, setMessage] = useState("");

    const onToggleSnackbar = (_message: string) => setMessage(_message);

    const onHideSnackbar = () => onToggleSnackbar("")        

    return {
        onToggleSnackbar,
        message,
        onHideSnackbar,
    }
}

export default useSnackbar;