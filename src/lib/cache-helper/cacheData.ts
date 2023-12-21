import AsyncStorage from "@react-native-async-storage/async-storage";

export class Cache {
  private static readonly FIFTEEN_MINUTES_IN_MILLISECONDS: number =
    15 * 60 * 1000;

  private static isStoredDataOlderThan15Minutes(oldDate: number): boolean {
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - oldDate;

    return timeDifference > Cache.FIFTEEN_MINUTES_IN_MILLISECONDS;
  }

  static storeData = async (data: any, key: string) => {
    const dataToStore = {
      dateWhenStored: new Date().getTime(),
      storedData: data,
    };
    console.log("STORE");
    try {
      const jsonValue = JSON.stringify(dataToStore);
      await AsyncStorage.setItem(`@${key}`, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  static getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (!Cache.isStoredDataOlderThan15Minutes(data.dateWhenStored)) {
        console.log("GET");
        return data.storedData;
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
}
