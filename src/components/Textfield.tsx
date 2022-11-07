import { FormikProps } from "formik";
import { FC } from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-paper";
import Text from "./Text";

interface ITexfieldProps extends TextInputProps {
    form: FormikProps<any>
    label: string
}

const Textfield: FC<ITexfieldProps> = ({ label, form, style, }) => {

    const _label = label.toLowerCase();

    const value = form.values[_label];

    const onChangeText = form.handleChange(_label);

    const error = form.errors[_label] as string;    

    return (
        <>
            <Text
            >
                {label}
            </Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={label}
                style={[style]}
                error={Boolean(error)}
            />
            {
                error ?
                    <Text
                        style={{
                            color: "rgb(186, 26, 26)"
                        }}
                    >
                        {error}
                    </Text>
                : null
            }
        </>
    );
}

export default Textfield;