import { act, cleanup, render, screen } from "@testing-library/react-native";
import App from "../App";
import Text from "src/components/Text";
import { useRoute } from "@react-navigation/native";
import fetchMock from 'jest-fetch-mock'
import { getData } from "src/lib/Storage";
import { apiHost } from "src/consts";

let Component = () => {
    const route = useRoute();
    return <Text>{route.name}</Text>
}

jest.mock("src/views/Login", () => () => <Component />);

jest.mock("src/views/Home", () => () => <Component />);

jest.mock("lib/Storage", () => ({
    getData: jest.fn().mockImplementation(() => JSON.stringify({
        "accessToken": "Access",
        "client": "Client",
        "expiry": "Expiry"
    }))
}))

let advanceTimers = async () => {
    await act(() => {
        jest.advanceTimersByTime(200)
    })
    await act(() => {
        jest.advanceTimersByTime(200)
    })
}

let fetchSuccessful = () => {
    fetchMock.mockOnce(
        () => new Promise(
            (res) =>
                setTimeout(
                    () => {
                        res(
                            JSON.stringify(
                                {
                                    id: 1,
                                    name: "Example"
                                }
                            )
                        )
                    }
                    , 200)
        )
    )
}

describe("Authentication", () => {

    afterEach(cleanup)

    it("renders Login when token is null", async () => {
        jest.useFakeTimers()
        const mock = getData as jest.MockedFunction<typeof getData>;
        mock.mockReturnValueOnce(new Promise(res => res(null)))
        render(<App />)
        await advanceTimers()
        expect(fetchMock).not.toHaveBeenCalled()
        const login = screen.getByText("Login");
        expect(login).not.toBeNull();
    })

    it("shows progressbar and hides it after request", async () => {
        jest.useFakeTimers()
        fetchSuccessful()
        render(<App />)
        await act(() => {
            jest.advanceTimersByTime(100)
        })
        expect(fetchMock).toHaveBeenCalled()
        const login = screen.queryByText("Login");
        expect(login).toBeNull();
        const home = screen.queryByText("Home");
        expect(home).toBeNull();
        let activity = screen.queryByRole("progressbar");
        expect(activity).not.toBeNull();
        await act(() => {
            jest.advanceTimersByTime(200)
        })
        activity = screen.queryByRole("progressbar");
        expect(activity).toBeNull();
    })

    describe("Validate Token Request", () => {

        const expectFetchtoHaveBeenCalledWith = () => {
            expect(fetchMock).toHaveBeenCalledWith(`${apiHost}/validate_token`, {
                "headers": {
                    "access-token": "Access",
                    "client": "Client",
                    "expiry": "Expiry"
                }
            })
        }

        it("renders Login when unsuccessful", async () => {
            jest.useFakeTimers()
            fetchMock.mockResponse("", {
                status: 401
            })
            render(<App />)
            await advanceTimers()
            expectFetchtoHaveBeenCalledWith()
            const login = screen.getByText("Login");
            expect(login).not.toBeNull();
        })
    
        it("renders Home when successful", async () => {
            jest.useFakeTimers();
            fetchSuccessful()
            render(<App />)
            await advanceTimers()
            expectFetchtoHaveBeenCalledWith()
            const home = screen.getByText("Home");
            expect(home).not.toBeNull();
        })

    })

})