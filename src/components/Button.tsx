import { FC } from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Text from "./Text";

interface IButtonProps extends TouchableOpacityProps {
    isLoading?: boolean
}

const Button: FC<IButtonProps> = ({ children, onPress, isLoading, }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button]}
            disabled={isLoading}
        >
            {
                isLoading ?
                    <ActivityIndicator />
                : null
            }
            <Text>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
    }
})

export default Button;