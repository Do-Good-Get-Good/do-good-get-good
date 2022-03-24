import firestore from "@react-native-firebase/firestore";

export const useUserData = async (userId) => {
  await firestore()
    .collection("Users")
    .doc(userId)
    .get()
    .then((user) => {
      let name = user.data();
      console.log(name);
      return name;
    })
    .catch((error) => {
      return error;
    });
};
