import { act, fireEvent, render, screen } from "@testing-library/react-native";
import Textfield from "components/Textfield";
import { FormikProps, useFormik } from "formik";
import { ReactTestInstance } from "react-test-renderer";
import * as Yup from "yup";

const schema = Yup.object({
    text: Yup.string().required(),
});

let form: FormikProps<{
    text: string;
}>;

export const Component = () => {
    
    form = useFormik({
        initialValues: {
            text: "",
        },
        onSubmit: () => {},
        validationSchema: schema,
    });

    return(
        <Textfield 
            form={form}
            label="Text"
        />
    )
}

describe("<Texfield />", () => {

    let input: ReactTestInstance;

    beforeEach(async () => {
        render(<Component />);
        input = screen.getByPlaceholderText("Text");
        await act(() => {
            fireEvent(input, "onChangeText", 'Value');
        });
    })

    it("sets label", () => {     
        const label = screen.queryByText("Text");   
        expect(label).not.toBe(null);
    })

    it("sets form value as input value", () => {        
        expect(input.props.value).toEqual(form.values.text);
    })

    it("shows error message when value is empty", async() => {        
        await act(() => {
            fireEvent(input, "onChangeText", '');
        });
        await act(() => {
            fireEvent(input, "blur");
        });        
        const error = screen.queryByText("text is a required field");
        expect(error).not.toBe(null);
    })

})