import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { UserPost } from "../../utility/types";

type Props = {
  imageURL: UserPost["imageURL"];
  openImagePicker: () => void;
};

export const AddImage = ({ imageURL, openImagePicker }: Props) => {
  return (
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
  selectedImage: {
    minWidth: 300,
    minHeight: 250,
    marginVertical: 20,
    alignSelf: "center",
  },
});
