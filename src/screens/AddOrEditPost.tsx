import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomLogo from "../components/BottomLogo";
import Menu from "../components/Menu";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { UserPost } from "../utility/types";
import { LongButton } from "../components/Buttons/LongButton";
import { GoBackButton } from "../components/Buttons/GoBackButton";
import { ChatCardHeader } from "../components/ChartCard/ChatCardHeader";
import { launchImageLibrary, MediaType } from "react-native-image-picker";
import { AlertQuestion } from "../components/Alerts/AlertQuestion ";
import { AlertInfo } from "../components/Alerts/AlertInfo";
import { useUserPostsActions } from "./Chat/useUserPostsActions";
import { Spinner } from "../components/Loading";

type Props = {
  route: any;
  navigation: any;
};
type Params = {
  post: UserPost;
  toEdit: boolean;
};
const alertToPublishPost =
  "Vill du publicera det här inlägget i chatten? Alla DGGG-användare kommer att se detta inlägg.";
const alertToInformAboutExpire =
  "Den här upplevelsen raderas automatiskt efter ett år.";

export const AddOrEditPost = ({ route, navigation }: Props) => {
  const { post, toEdit}: Params = route.params;
  const { addPost, loading } = useUserPostsActions();
  const [description, setDescription] = useState(post.description);
  const [imageURL, setImageURL] = useState(post.imageURL);

  const onPublishPost = async () =>
    await addPost({ ...post, description, imageURL }).then(() => {
      navigation.goBack();
      AlertInfo(alertToInformAboutExpire);
    });

  const onSaveButtonPressed = async () => {
    if (toEdit) {
      console.log("run edit function");
    } else {
      AlertQuestion("", alertToPublishPost, onPublishPost);
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: "photo" as MediaType,
    };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        let imageUri = response.assets?.[0]?.uri;
        setImageURL(imageUri || "");
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <GoBackButton />
      <ScrollView>
        <ChatCardHeader post={post} />
        <TouchableOpacity onPress={openImagePicker}>
          {imageURL ? (
            <Image source={{ uri: imageURL }} style={styles.selectedImage} />
          ) : (
            <View style={styles.image}>
              <Text style={styles.imageText}>Lägga till bild</Text>
              <Text style={styles.buttonText}>+</Text>
            </View>
          )}
        </TouchableOpacity>
        <Spinner loading={loading} />
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Skriv dina tankar"
            style={styles.inpuField}
            scrollEnabled={true}
          />
          <LongButton
            title="Spara"
            onPress={() => imageURL !== "" && onSaveButtonPressed()}
            style={styles.longButton}
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
  },
  imageText: {
    ...typography.b2,
    color: colors.secondary,
  },
  buttonText: {
    fontSize: 80,
    color: colors.secondary,
  },
  image: {
    marginVertical: 20,
    minWidth: 300,
    minHeight: 250,
    backgroundColor: colors.disabled,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
  },
  inputContainer: {
    justifyContent: "space-between",
  },
  inpuField: {
    flex: 1,
    marginVertical: 20,
    padding: 10,
    marginBottom: 20,
    ...typography.b1,
    marginHorizontal: 40,
  },
  longButton: {
    alignSelf: "stretch",
    marginVertical: 10,
    marginHorizontal: 30,
  },
  selectedImage: {
    minWidth: 300,
    minHeight: 250,
    marginVertical: 20,
    alignSelf: "center",
  },
});
