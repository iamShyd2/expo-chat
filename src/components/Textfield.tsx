import { FormikProps } from "formik";
import { FC } from "react";
import { StyleSheet, TextInputProps, View } from "react-native";
import { TextInput } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { COLORS } from "src/theme";
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
        <View
            style={[styles.inputWrapper]}
        >
            <Text
                style={[styles.label]}
            >
                {label}
            </Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={label}
                style={[style]}
                error={Boolean(error)}
                mode="outlined"
                activeOutlineColor={COLORS.primary}
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
        </View>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: RFPercentage(2),
    },
    label: {
        fontFamily: "loraBold",
    },
})

export default Textfield;