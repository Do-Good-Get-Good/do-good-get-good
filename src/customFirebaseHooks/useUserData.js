import firestore from "@react-native-firebase/firestore";

export const useUserData = async (userId) => {
  let data = await firestore().collection("Users").doc(userId).get();

  return data.data();
};
