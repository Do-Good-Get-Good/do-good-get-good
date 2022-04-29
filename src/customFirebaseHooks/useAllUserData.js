import firestore from "@react-native-firebase/firestore";

export const useAllUserData = async (adminId) => {
  let userData;
  await firestore()
    .collection("Users")
    .where("admin_id", "==", adminId)
    .where("role", "!=", "admin")
    .get()
    .then((data) => {
      userData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    })
    .catch((error) => console.log(error));

  return userData;
};
