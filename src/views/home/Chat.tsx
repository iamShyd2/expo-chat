import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { RFPercentage } from 'react-native-responsive-fontsize';
import Avatar from 'src/components/Avatar';
import Text from 'src/components/Text';
import { IChat } from "src/models/chat";

const Chat: FC<{ chat: IChat }> = ({ chat }) => {
    
    const {
        user,
        last_message,
    } = chat;
    
    return(
      <View
        style={styles.chat}
      >
        <Avatar
            image={user.image}
        />
        <View>
          <Text
            style={styles.name}
          >
            {user.name}
          </Text>
          <Text>
            {last_message.body}
          </Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    chat: {
        flexDirection: "row",
    },
    name: {
        fontFamily: "loraBold"
    }
})

export default Chat;