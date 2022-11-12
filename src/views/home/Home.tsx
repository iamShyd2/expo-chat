import { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import Chat from './Chat';
import useHome from './useHome';

const Home = () => {

  const {
    chats
  } = useHome();

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <Chat 
          chat={item}
        />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;