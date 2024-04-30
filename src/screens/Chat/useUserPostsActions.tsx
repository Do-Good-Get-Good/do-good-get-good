import { UserPost } from "../../utility/types";
import { useState } from "react";
import {  saveImageToChatImageStoreAndCreateUserPost } from "../../firebase-functions/addTS/add";
import { deleteUserPostAndImageInStorage } from "../../firebase-functions/deleteTS/delete";
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

  const onDelete = async (post: UserPost ) => {
    setLoading(true);
    await deleteUserPostAndImageInStorage(post);
    setLoading(false);
  };
  return { addPost, loading, onDelete };
};
