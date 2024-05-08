import firestore from "@react-native-firebase/firestore";
import { PostEmoji, UserPost } from "../../utility/types";
import storage from "@react-native-firebase/storage";
import crashlytics from "@react-native-firebase/crashlytics";

export const deleteUserPostAndImageInStorage = async (post: UserPost ) => {
  try {
    post.imageURL &&  await storage()
      .refFromURL(post?.imageURL)
      .delete()
        await deleteUserPost(post.id); 
  } catch (error: any) {
    crashlytics().log("There was an error to delete user post");
    crashlytics().recordError(error);
  }
};

const deleteUserPost = async (postID: UserPost["id"]) => {
  try {
    const res = await firestore().collection("UserPosts").doc(postID).delete();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmoji = async(emoji: PostEmoji, postID : UserPost['id'])=>{
  
 
    await firestore().collection("UserPosts").doc(postID).update({
      emoji:  firestore.FieldValue.arrayRemove(emoji)
    }).then(() => {
      console.log("Document successfully updated!");
      return true;
    }).catch((error) => {
      console.log(error);
      return false;
    });
   
  
  

}