import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BottomLogo from "../../components/BottomLogo";
import Menu from "../../components/Menu";
import typography from "../../assets/theme/typography";
import { UserPost } from "../../utility/types";
import { LongButton } from "../../components/Buttons/LongButton";
import { GoBackButton } from "../../components/Buttons/GoBackButton";
import { ChatCardHeader } from "../../components/ChartCard/ChatCardHeader";
import { useUserPostsActions } from "../Chat/useUserPostsActions";
import { Spinner } from "../../components/Loading";
import { AddImage } from "./AddImage";
import chatStore from "../../store/chat";

type Props = {
  route: any;
  navigation: any;
};
type Params = {
  post: UserPost;
  toEdit: boolean;
};

export const AddOrEditPost = ({ route, navigation }: Props) => {
  const { post, toEdit }: Params = route.params;
  const { addPost, loading,updatePost } = useUserPostsActions();
  const [description, setDescription] = useState(post.description);
  const { setIsScrollToEnd } = chatStore;
  const [imageURL, setImageURL] = useState(post.imageURL);

  const navigateBackAndShowBottom = () => {
    navigation.goBack();
    setIsScrollToEnd(true);
  };
  const onSaveButtonPressed = async () => {
    if (toEdit) {
      await updatePost({ ...post, description, imageURL }, navigation.goBack);
   
    } else {
      await addPost(
        { ...post, description, imageURL },
        navigateBackAndShowBottom,
      );
      setIsScrollToEnd(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <GoBackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!post.activityID && (
          <Text style={styles.userName}>
            {post.userFirstName} {post.userLastName}
          </Text>
        )}
        {post.activityID && (
          <>
            <ChatCardHeader post={post} />
            <AddImage imageURL={imageURL} setImageURL={setImageURL} />
          </>
        )}
        <Spinner loading={loading} />
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Skriv dina tankar"
            style={styles.inputField}
            scrollEnabled={true}
          />
          <LongButton
            title="Spara"
            onPress={onSaveButtonPressed}
            style={styles.longButton}
            isDisabled={imageURL === "" || description === ""}
          />
        </View>
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  inputContainer: {
    justifyContent: "space-between",
  },
  inputField: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 20,
    ...typography.b1,
  },
  longButton: {
    alignSelf: "stretch",
    marginVertical: 10,
    marginHorizontal: 30,
  },
  userName: {
    ...typography.cardTitle,
    marginHorizontal: 40,
    marginVertical: 20,
  },
});
