import { act, render, screen } from "@testing-library/react-native"
import Home from "views/home/Home"

jest.mock("lib/Storage", () => ({
    getData: jest.fn().mockImplementation(() => JSON.stringify({
        "accessToken": "Access",
        "client": "Client",
        "expiry": "Expiry"
    }))
}))

describe("<Home />", () => {

    it("fetches chats", async () => {
        jest.useFakeTimers();
        fetchMock.mockOnce(
            () => new Promise(
                (res) =>
                    setTimeout(
                        () => {
                            res(JSON.stringify([
                                {
                                    id: 1,
                                    user: {
                                        id: 1,
                                        image: "image.jpg",
                                        name: "User",
                                    },
                                    last_message: {
                                        id: 1,
                                        body: "Hi"
                                    }
                                },
                                {
                                    id: 2,
                                    user: {
                                        id: 2,
                                        image: "image.jpg",
                                        name: "Another",
                                    },
                                    last_message: {
                                        id: 2,
                                        body: "Hello"
                                    }
                                }
                            ]))
                        }
                        , 200)
            )
        )
        render(<Home />);
        await act(() => {
            jest.advanceTimersByTime(200);
        });
        await act(() => {
            jest.advanceTimersByTime(200);
        });
        let chat = screen.getByText("User");
        expect(chat).not.toBeNull();
        chat = screen.getByText("Another");
        expect(chat).not.toBeNull();
    })

})