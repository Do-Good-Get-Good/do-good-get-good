import React, { useState, useCallback } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Menu from "../components/Menu";
import Images from "../Images";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export function ImagesGallery({ navigation }) {
  const [imagesArray, setImagesArray] = useState(Images);
  const [imageName, setImageName] = useState("symbol_hands_heart-DEFAULT");

  function changeBorderStyle(index, name) {
    let arrayForSelection = imagesArray;
    for (let i = 0; i < arrayForSelection.length; i++) {
      arrayForSelection[i].selected = false;
    }
    arrayForSelection[index].selected = true;
    setImagesArray(arrayForSelection);
    setImageName(name);
  }
  const imageStyle = useCallback(
    (selected) => {
      return {
        flex: 1,
        flexDirection: "row",
        resizeMode: "contain",
        backgroundColor: "white",
        alignItems: "center",
        marginRight: 14,
        marginTop: 10,
        borderRadius: 5,
        height: 156,
        width: 143,
        borderRadius: 3,
        borderWidth: selected === true ? 7 : 1,
        borderColor: colors.primary,
      };
    },
    [imageName]
  );

  const buttonSavePressed = () => {
    navigation.navigate("CreateActivity", {
      imageForActivity: imageName,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <View>
        <Text style={styles.mainText}>Bildgalleri</Text>
        <FlatList
          style={styles.container}
          data={imagesArray}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              testID="pressOnImage"
              onPress={() => changeBorderStyle(index, item.name)}
              style={{ flex: 0.5, flexDirection: "row" }}
            >
              <Image
                testID="imageInImageGallery"
                style={imageStyle(item.selected)}
                source={item.image}
              />
            </TouchableOpacity>
          )}
        />
        <View style={styles.containerForTwoBottomButtons}>
          <TouchableOpacity
            testID="saveButton"
            onPress={() => buttonSavePressed()}
          >
            <Text style={styles.buttonSave}>Spara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="backButton"
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonBorderStyleButtonBackAndCancel}
            >
              <Text style={styles.buttonCancel}>Avbryt</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ImagesGallery;
const styles = StyleSheet.create({
  mainText: {
    ...typography.h2,
    fontWeight: "500",
    marginHorizontal: 16,
    marginTop: 30,
  },
  container: {
    marginLeft: 16,
    marginRight: 2,
    marginTop: 20,
  },

  containerForTwoBottomButtons: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  buttonSave: {
    ...typography.button.lg,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    overflow: "hidden",
    paddingVertical: 20,
    paddingBottom: 10,
    marginBottom: 10,
  },

  buttonCancel: {
    ...typography.button.lg,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 2,
    paddingVertical: 12,
    backgroundColor: colors.light,
    borderRadius: 5,
    overflow: "hidden",
  },
  buttonBorderStyleButtonBackAndCancel: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,
  },
});
