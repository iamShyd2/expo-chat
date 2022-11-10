import { FC } from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { COLORS } from "src/theme";
import Text from "./Text";

interface IButtonProps extends TouchableOpacityProps {
    isLoading?: boolean
}

const Button: FC<IButtonProps> = ({ children, onPress, isLoading, }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { marginTop: RFPercentage(2) }]}
            disabled={isLoading}
        >
            {
                isLoading ?
                    <ActivityIndicator 
                        style={[styles.indicator]}
                        color={COLORS.seconday}
                    />
                : null
            }
            <Text
                style={[styles.text]}
            >
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        paddingVertical: RFPercentage(2),
        borderRadius: 50,
    },
    indicator: {
        marginRight: RFPercentage(2),
    },
    text: {
        fontFamily: "loraBold",
        color: "#fff",
    }
})

export default Button;