import * as Font from 'expo-font';

export default async () =>
  await Font.loadAsync({
    lora: require('../../assets/fonts/Lora-Regular.ttf'),
    loraBold: require("../../assets/fonts/Lora-Bold.ttf"),
});