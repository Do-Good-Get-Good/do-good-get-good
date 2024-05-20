import { Comment, PostEmoji, UserPost } from "../../utility/types";
import { useState } from "react";
import {   addComment, addEmoji, saveImageToChatImageStoreAndCreateUserPost } from "../../firebase-functions/addTS/add";
import { deleteComment, deleteEmoji, deleteUserPostAndImageInStorage } from "../../firebase-functions/deleteTS/delete";
import { AlertQuestion } from "../../components/Alerts/AlertQuestion ";
import { AlertInfo } from "../../components/Alerts/AlertInfo";

const alertToPublishPost =
  "Vill du publicera det här inlägget i chatten? Alla DGGG-användare kommer att se detta inlägg.";
const alertToInformAboutExpire =
  "Den här upplevelsen raderas automatiskt efter ett år.";

export const useUserPostsActions = () => {
  const [loading, setLoading] = useState(false);

  const onAddRequest = async(post: UserPost, afterPostAdded?: ()=> void)=>  {
    setLoading(true);
    await saveImageToChatImageStoreAndCreateUserPost(post).then(()=>{
      afterPostAdded && afterPostAdded()
      AlertInfo(alertToInformAboutExpire)})
      setLoading(false)
  } 

  const addPost = async (post: UserPost, afterPostAdded?: ()=> void) => {
     AlertQuestion("", alertToPublishPost,()=> onAddRequest(post, afterPostAdded));
  };

  const onDeletePost = async (post: UserPost ) => {
    setLoading(true);
    await deleteUserPostAndImageInStorage(post);
    setLoading(false);
  };

 const addEmojiToPost = async(emoji: PostEmoji, postID : UserPost['id'])=>{   
   setLoading(true);  
   await addEmoji(emoji, postID)   
   setLoading(false);} 

 const deleteEmojiFromPost = async(emoji: PostEmoji, postID : UserPost['id'])=>{
  setLoading(true);  
  await deleteEmoji(emoji, postID)
  setLoading(false)
 } 
const addCommentToPost = async (comment:Comment, postID : UserPost['id'])=>{
  setLoading(true)
  await addComment(comment, postID)
  setLoading(false)
} 
const deleteCommentFromPost = async (comment:Comment, postID : UserPost['id']) =>{
  setLoading(true)
 await deleteComment(comment, postID)
 setLoading(false)
}



  return { addPost, loading, onDeletePost, addCommentToPost , addEmojiToPost, deleteEmojiFromPost, deleteCommentFromPost};
};
