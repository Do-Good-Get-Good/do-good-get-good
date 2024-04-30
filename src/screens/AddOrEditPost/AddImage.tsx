import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from "react-native";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { UserPost } from "../../utility/types";
import ImagePicker from "react-native-image-crop-picker";
import { ChatCardImage } from "../../components/ChartCard/ChatCardImage";

type Props = {
  imageURL: UserPost["imageURL"];
  setImageURL: (img: UserPost["imageURL"]) => void;
};

export const AddImage = ({ imageURL, setImageURL }: Props) => {
  const openImagePicker = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openPicker({
          mediaType: "photo",
          cropping: true,
        }).then((image) => {
          console.log("image ---   ", image);
          setImageURL(image.sourceURL ?? image.path ?? "");
        });
      } else {
        console.log("error on openImagePicker ");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <TouchableOpacity onPress={openImagePicker}>
      {imageURL ? (
        <ChatCardImage size={1.6} imageUrl={imageURL} />
      ) : (
        <View style={styles.image}>
          <Text style={styles.imageText}>Lägga till bild</Text>
          <Text style={styles.buttonText}>+</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    marginVertical: 20,
    minWidth: 300,
    minHeight: 250,
    backgroundColor: colors.disabled,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
  },

  imageText: {
    ...typography.b2,
    color: colors.secondary,
  },

  buttonText: {
    fontSize: 80,
    color: colors.secondary,
  },
});
