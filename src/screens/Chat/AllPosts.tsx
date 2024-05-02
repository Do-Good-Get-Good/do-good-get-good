import React from "react";
import { ChatCard } from "../../components/ChartCard/ChatCard";
import { MessageCard } from "../../components/ChartCard/MessageCard";
import {  Post, User, UserPost } from "../../utility/types";



type Props={
    posts: UserPost[] 
    handleAddComment: ()=> void;
    onDelete:(post:UserPost )=>void;
    loggedInUserID: User['id']
}

export const AllPosts= ({posts,handleAddComment,onDelete,loggedInUserID}:Props) => {

  return (<>
  {posts?.map((post, i) =>
 post.imageURL ? <ChatCard
          key={`${post.id}-${i}`}
                post={post}
                users={[]}
                handleAddComment={handleAddComment}
                onDelete={() => onDelete(post)}
                isCurrentUser={post.userID === loggedInUserID}
              /> :<MessageCard
              key={`${post.id}-${i}`}
              message={post }
              handleAddComment={handleAddComment}
              onDelete={() => onDelete(post)}
              isCurrentUser={post.userID === loggedInUserID}
            />  
            )}
    </>
  );
};

