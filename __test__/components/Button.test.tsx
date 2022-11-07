import { act, fireEvent, render, screen } from "@testing-library/react-native";
import Button from "components/Button";

describe("<Button />", () => {

    let onPress: jest.Mock<any, any>

    let renderButton = (isLoading = false) => {
        onPress = jest.fn();

        render(
            <Button 
                onPress={onPress}
                isLoading={isLoading}
            >
                onPress
            </Button>
        );
        const button = screen.getByText("onPress");
        act(() => {
            fireEvent(button, "click");
        });
    }

    it("invokes onPress when pressed", async () => {
        renderButton();
        expect(onPress).toHaveBeenCalled();
    })

    
    describe("isLoading", () => {

        beforeEach(() => {
            renderButton(true);
        })

        it("disables onPress", async () => {
            expect(onPress).not.toHaveBeenCalled();
        })
    
        it("shows activity", async () => {
            const button = screen.queryByRole("progressbar");
            expect(button).not.toBeNull();
        })
    })

})