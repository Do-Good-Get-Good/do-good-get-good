import React, { useRef } from "react";
import { ChatCard } from "../../components/ChartCard/ChatCard";
import { MessageCard } from "../../components/ChartCard/MessageCard";
import { Post, PostEmoji, User, UserPost } from "../../utility/types";
import { FlatList } from "react-native";

type Props = {
  setlimit: () => void;
  posts: UserPost[];
  onDelete: (post: UserPost) => void;
  loggedInUser: User;
  addEmoji: (emoji: PostEmoji, postID: UserPost["id"]) => void;
  deleteEmoji: (emoji: PostEmoji, postID: UserPost["id"]) => void;
};

export const AllPosts = ({
  posts,
  onDelete,
  loggedInUser,
  addEmoji,
  deleteEmoji,
  setlimit,
}: Props) => {
  const ref = useRef<FlatList>(null);
  return (
    <FlatList
      inverted
      ref={ref}
      data={posts}
      onEndReached={setlimit}
      onEndReachedThreshold={0.3}
      keyExtractor={(post) => post.id.toString()}
      renderItem={({ item }) =>
        item?.imageURL ? (
          <ChatCard
            post={item}
            onDelete={() => onDelete(item)}
            loggedInUser={loggedInUser}
            addEmoji={addEmoji}
            deleteEmoji={deleteEmoji}
            commentsCount={item.comments.length}
          />
        ) : (
          <MessageCard
            message={item}
            onDelete={() => onDelete(item)}
            loggedInUser={loggedInUser}
            addEmoji={addEmoji}
            deleteEmoji={deleteEmoji}
            commentsCount={item.comments?.length ?? 0}
          />
        )
      }
    />
  );
};
