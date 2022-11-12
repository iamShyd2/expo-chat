import { RFPercentage } from "react-native-responsive-fontsize";
import { Image, StyleSheet } from "react-native";
import { FC } from "react";

const Avatar: FC<{ image: string }> = ({ image }) => {
    return (
        <Image
            source={{ uri: image }}
            style={styles.image}
        />
    )
}

const styles = StyleSheet.create({
    image: { 
        borderRadius: 50, 
        width: RFPercentage(5), 
        height: RFPercentage(5),
        backgroundColor: "red"
    }
})

export default Avatar;