import firestore from "@react-native-firebase/firestore";

export const useUserData = async (userId) => {
  let data;
  await firestore()
    .collection("Users")
    .doc(userId)
    .get()
    .then((doc) => {
      data = doc.data();
    })
    .catch((error) => console.log(error));
  return data;
};
