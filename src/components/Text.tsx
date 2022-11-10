import { FC } from "react";
import { StyleSheet, Text as T, TextProps } from "react-native";

interface ITextProps extends TextProps {
}

const Text: FC<ITextProps> = ({children, style}) => {
    return(
        <T
            style={[styles.text, style]}
        >
            {children}
        </T>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "lora",
    }
})

export default Text;