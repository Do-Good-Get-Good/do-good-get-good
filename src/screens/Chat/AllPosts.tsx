import React from "react";
import { ChatCard } from "../../components/ChartCard/ChatCard";
import { MessageCard } from "../../components/ChartCard/MessageCard";
import {  Post, PostEmoji, User, UserPost } from "../../utility/types";



type Props={
    posts: UserPost[] 
    handleAddComment: ()=> void;
    onDelete:(post:UserPost )=>void;
    loggedInUser: User
    addEmoji: (emoji: PostEmoji, postID : UserPost['id'])=>void
    deleteEmoji:(emoji: PostEmoji, postID : UserPost['id'])=>void
}

export const AllPosts= ({posts,handleAddComment,onDelete,loggedInUser, addEmoji, deleteEmoji} :Props) => {

  return (<>
  {posts?.map((post, i) =>
    post?.imageURL ? <ChatCard
      key={`${post.id}-${i}`}
      post={post}
      users={[]}
      handleAddComment={handleAddComment}
      onDelete={() => onDelete(post)}
      loggedInUser={loggedInUser}
      addEmoji={addEmoji}
      deleteEmoji={deleteEmoji}
    /> :<MessageCard
        key={`${post.id}-${i}`}
        message={post }
        handleAddComment={handleAddComment}
        onDelete={() => onDelete(post)}
        loggedInUser={loggedInUser}
        />  
      )}
    </>
  );
};

