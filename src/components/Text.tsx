import { FC } from "react";
import { Text as T, TextProps } from "react-native";

interface ITextProps extends TextProps {
}

const Text: FC<ITextProps> = ({children, style}) => {
    return(
        <T
            style={[style]}
        >
            {children}
        </T>
    )
}

export default Text;