import { act, cleanup, fireEvent, render, screen } from "@testing-library/react-native";
import Snackbar from "components/snackbar/Snackbar";
import useSnackbar from "components/snackbar/useSnackbar";
import AppContext from "src/contexts/AppContext";
import Login from "views/login/Login";

const setCurrentUser = jest.fn();

let App = () => {

    const snackbar = useSnackbar();

    const appContext = {
        currentUser: undefined,
        setCurrentUser,
        ...snackbar,
    }

    return (
        <AppContext.Provider
            value={appContext}
        >
            <Login />
            <Snackbar
                message={snackbar.message}
                handleDismissSnackBar={snackbar.onHideSnackbar}
            />
        </AppContext.Provider>
    )
}


jest.mock("hooks/useAuthentication", () => () => ({
    currentUser: undefined,
    setCurrentUser: jest.fn()
}))

jest.mock("src/lib/Storage", () => ({
    storeData: jest.fn(),
}))

const data = [
    {
        field: "email",
    },
    {
        field: "password",
    }
]

let values: { [x: string]: string };

describe("<Login />", () => {

    afterEach(cleanup);

    beforeEach(() => {
        values = {
            email: "example@mail.com",
            password: "password",
        }
    })

    let onChangeText = (placeholder: string, value: string) => {
        const input = screen.getByPlaceholderText(placeholder);
        fireEvent(input, 'onChangeText', value);
    }

    let fireEvents = (params: typeof values) => {
        onChangeText("Email", values.email)
        onChangeText("Password", values.password)
    }

    let onLogin = async () => {
        const login = screen.getByText("Login");
        await act(() => {
            fireEvent(login, 'click');
        });
    }

    describe.each(data)("Validation", (param) => {

        it(`shows error when ${param.field} is empty`, async () => {
            values[param.field] = "";
            render(<App />);
            fireEvents(values);
            await onLogin();
            const error = screen.getByText(`${param.field} is a required field`);
            expect(error).not.toBeNull();
        })
    })


    describe("handleSubmit", () => {

        it("shows message on snackbar when status is 401", async () => {
            fetchMock.mockResponse("", {
                status: 401
            })
            jest.useFakeTimers();
            render(<App />);
            fireEvents(values);
            await onLogin();
            const snackbar = screen.getByText("Invalid email or password");
            expect(snackbar).not.toBeNull();
        })

        let body = JSON.stringify(
            {
                id: 1,
                name: "Example"
            }
        )

        it("toggles activity indicator", async () => {
            fetchMock.mockOnce(
                () => new Promise(
                    (res) =>
                        setTimeout(
                            () => {
                                res(
                                    {
                                        body
                                    }
                                )
                            }
                            , 200)
                )
            )
            jest.useFakeTimers();
            render(<App />);
            fireEvents(values);
            await onLogin();
            await act(() => {
                jest.advanceTimersByTime(100);
            })
            let progressbar = screen.queryByRole("progressbar");
            expect(progressbar).not.toBeNull();
            await act(() => {
                jest.advanceTimersByTime(100);
            })
            progressbar = screen.queryByRole("progressbar");
            expect(progressbar).toBeNull();
        })

        it("sets currentUser and stores token when successful", async () => {
            const headers = new Headers();
            [
                "access-token",
                "expiry",
                "client",
                "uid",
            ].forEach((key) => {
                headers.set(key, key);
            });
            fetchMock.mockOnce(
                () => new Promise(
                    (res) =>
                        setTimeout(
                            () => {
                                res(
                                    {
                                        //@ts-ignore
                                        headers,
                                        body
                                    }
                                )
                            }
                            , 200)
                )
            )
            jest.useFakeTimers();
            render(<App />);
            fireEvents(values);
            await onLogin();
            await act(() => {
                jest.advanceTimersByTime(200);
            })
            const Storage = require("src/lib/Storage");
            expect(Storage.storeData).toHaveBeenCalledWith("token", "{\"access-token\":\"access-token\",\"expiry\":\"expiry\",\"client\":\"client\",\"uid\":\"uid\"}");
            expect(setCurrentUser).toHaveBeenCalled();
        })
    })

})