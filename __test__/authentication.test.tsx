import { cleanup, render, screen } from "@testing-library/react-native";
import App from "../App";
import useAuthentication from "src/hooks/useAuthentication";
import Text from "src/components/Text";
import { useRoute } from "@react-navigation/native";

let Component = () => {
    const route = useRoute();
    return <Text>{route.name}</Text>
}

jest.mock("src/views/Login", () => () => <Component />);

jest.mock("src/views/Home", () => () => <Component />);

jest.mock("src/hooks/useAuthentication", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        currentUser: {
            name: "Example"
        }
    }))
}));

describe("Authentication", () => {

    it("renders Home when currentUser is defined", async () => {
        render(<App />)
        const button = screen.getByText("Home");
        expect(button).not.toBeNull();
    })

    afterEach(cleanup) // login can override home

    it("renders Login when currentUser is undefined", async () => {
        const mock = useAuthentication as jest.MockedFunction<typeof useAuthentication>;
        mock.mockImplementation(() => ({
            currentUser: undefined,
            setCurrentUser: () => { }
        }))
        render(<App />)
        const button = screen.getByText("Login");
        expect(button).not.toBeNull();
    })

})