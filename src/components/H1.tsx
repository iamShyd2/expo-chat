import { FC } from "react";
import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Text, { ITextProps } from "./Text";

interface IH1Props extends ITextProps {
}

const H1: FC<IH1Props> = ({children, style}) => {
    return(
        <Text
            style={[styles.text, style]}
        >
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "loraBold",
        fontSize: RFPercentage(3),
    }
})

export default H1;