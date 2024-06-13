import { Comment, PostEmoji, UserPost } from "../../utility/types";
import { useState } from "react";
import {
  addComment,
  addEmoji,
  saveImageToChatImageStoreAndCreateUserPost,
} from "../../firebase-functions/addTS/add";
import {
  deleteComment,
  deleteEmoji,
  deleteUserPostAndImageInStorage,
} from "../../firebase-functions/deleteTS/delete";
import { AlertQuestion } from "../../components/Alerts/AlertQuestion ";
import { updatePostInFirestore } from "../../firebase-functions/updateTS/update";

const alertMessage =
  "Vill du publicera det här inlägget i chatten? Alla DGGG-användare kommer att se detta inlägg. nlägget raderas automatiskt efter ett år.";
  

const alertUpdateMessage= "Vill du spara ändringarna."

export const useUserPostsActions = () => {
  const [loading, setLoading] = useState(false);

  const onAddRequest = async (post: UserPost, afterPostAdded?: () => void) => {
    setLoading(true);
    await saveImageToChatImageStoreAndCreateUserPost(post).then(() => {
      afterPostAdded && afterPostAdded();
    });
    setLoading(false);
  };
  const onUpdateRequest = async (post: UserPost, afterPostUpdated?: () => void) => {
    setLoading(true);
    await updatePostInFirestore(post).then(() => {
      afterPostUpdated && afterPostUpdated();
    });
    setLoading(false);
  };
  const updatePost = async (post: UserPost, afterPostUpdated?: () => void) => {
    AlertQuestion("", alertUpdateMessage, () =>  onUpdateRequest(post, afterPostUpdated));
  };

  const addPost = async (post: UserPost, afterPostAdded?: () => void) => {
    AlertQuestion("", alertMessage, () => onAddRequest(post, afterPostAdded));
  };

  const onDeletePost = async (post: UserPost) => {
    setLoading(true);
    await deleteUserPostAndImageInStorage(post);
    setLoading(false);
  };

  const addEmojiToPost = async (emoji: PostEmoji, postID: UserPost["id"]) => {
    setLoading(true);
    await addEmoji(emoji, postID);
    setLoading(false);
  };

  const deleteEmojiFromPost = async (
    emoji: PostEmoji,
    postID: UserPost["id"],
  ) => {
    setLoading(true);
    await deleteEmoji(emoji, postID);
    setLoading(false);
  };
  const addCommentToPost = async (comment: Comment, postID: UserPost["id"]) => {
    setLoading(true);
    await addComment(comment, postID);
    setLoading(false);
  };
  const deleteCommentFromPost = async (
    comment: Comment,
    postID: UserPost["id"],
  ) => {
    setLoading(true);
    await deleteComment(comment, postID);
    setLoading(false);
  };

  return {
    addPost,
    loading,
    onDeletePost,
    addCommentToPost,
    addEmojiToPost,
    deleteEmojiFromPost,updatePost,
    deleteCommentFromPost,
  };
};
