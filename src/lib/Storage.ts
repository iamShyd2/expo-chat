import AsyncStorage from "@react-native-async-storage/async-storage"

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) return value;
        throw new Error("");
    } catch (e) {
        console.log(e);
        return null
    }
}

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e);
    }
}