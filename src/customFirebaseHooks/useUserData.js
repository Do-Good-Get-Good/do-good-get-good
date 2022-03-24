import firestore from "@react-native-firebase/firestore";

export const useUserData = async (userId) => {
  await firestore()
    .collection("Users")
    .doc(userId)
    .get()
    .then((user) => {
      let userData = user.data();
      return userData;
    })
    .catch((error) => {
      return error;
    });
};
