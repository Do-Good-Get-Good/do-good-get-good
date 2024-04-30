import { UserPost } from "../../utility/types";
import { useState } from "react";
import { saveImageToChatImageStoreAndCreateUserPost } from "../../firebase-functions/addTS/add";
import { deleteUserPostAndImageInStorage } from "../../firebase-functions/deleteTS/delete";

export const useUserPostsActions = () => {
  const [loading, setLoading] = useState(false);

  const addPost = async (post: UserPost) => {
    setLoading(true);
    await saveImageToChatImageStoreAndCreateUserPost(post);
    setLoading(false);
  };

  const onDelete = async (post: UserPost) => {
    setLoading(true);
    await deleteUserPostAndImageInStorage(post);
    setLoading(false);
  };

  return { addPost, loading, onDelete };
};
