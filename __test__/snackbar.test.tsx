import { act, fireEvent, render, screen } from "@testing-library/react-native";
import App from "../App";
import Button from "components/Button";
import { useContext } from "react";
import Snackbar from "src/components/snackbar/Snackbar";
import useSnackbar from "src/components/snackbar/useSnackbar";
import AppContext from "src/contexts/AppContext";

let Component = () => {

    const {
        onToggleSnackbar,
        message,
        onHideSnackbar,
    } = useContext(AppContext);


    const handleToggleSnackbar = () => onToggleSnackbar("Show Snackbar")

    return (
        <>
            <Snackbar
                message={message}
                handleDismissSnackBar={onHideSnackbar}
            />
            <Button
                onPress={handleToggleSnackbar}
            >
                Toggle Snackbar
            </Button>
            <Button
                onPress={onHideSnackbar}
            >
                Hide Snackbar
            </Button>
        </>
    );

}

jest.mock("src/Routes", () => () => {
    return <Component />
});

describe("Snackbar", () => {

    beforeEach(async () => {
        jest.useFakeTimers();
        render(
            <App />
        )
        const button = screen.getByText("Toggle Snackbar");
        await act(() => {
            fireEvent(button, "click");
        });
        jest.advanceTimersByTime(100);
    })

    it("onToggleSnackbar shows message in snackbar", async () => {
        const snackbar = screen.getByText("Show Snackbar");
        expect(snackbar).not.toBeNull();
    })


    it("onHideSnackbar hides snackbar", async () => {
        const hideButton = screen.getByText("Hide Snackbar");
        await act(() => {
            fireEvent(hideButton, "click");
        });
        const snackbar = screen.queryByText("Show Snackbar");
        expect(snackbar).toBeNull();
    })

})