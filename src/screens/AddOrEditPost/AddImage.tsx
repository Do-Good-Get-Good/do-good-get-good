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
import { ChatCardImage } from "../../components/ChartCard/ChatCardImage";
import { checkPermissionAndOpenImage } from "./selectImage";

type Props = {
  imageURL: UserPost["imageURL"];
  setImageURL: (img: UserPost["imageURL"]) => void;
};

export const AddImage = ({ imageURL, setImageURL }: Props) => {
  return (
    <TouchableOpacity onPress={() => checkPermissionAndOpenImage(setImageURL)}>
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
