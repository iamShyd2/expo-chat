import { FC } from "react";
import { Snackbar as Snack } from "react-native-paper";

const Snackbar: FC<{ message: string, handleDismissSnackBar: () => void }> = ({ message, handleDismissSnackBar }) => {

    return (
        <Snack
            visible={Boolean(message)}
            onDismiss={handleDismissSnackBar}
        >
            { message }
        </Snack>
    )
}

export default Snackbar;