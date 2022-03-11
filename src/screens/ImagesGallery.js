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
import InfoModal from "../components/InfoModal";

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
        backgroundColor: colors.background,
        alignItems: "center",
        borderRadius: 5,
        height: 150,
        width: 150,
        marginHorizontal: 5,
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
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <View style={styles.headerView}>
          <Text style={styles.mainText}>Bildgalleri</Text>
          <InfoModal screen="imageGallery" tooltipWidth={200} />
        </View>
        <FlatList
          style={styles.container}
          columnWrapperStyle={{ marginBottom: 10 }}
          data={imagesArray}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              testID="pressOnImage"
              onPress={() => changeBorderStyle(index, item.name)}
              style={{
                flex: 0.5,
                flexDirection: "row",
              }}
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
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Spara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="backButton"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cancelButtonBorder}
            >
              <Text style={styles.cancelButtonText}>Avbryt</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ImagesGallery;
const styles = StyleSheet.create({
  headerView: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainText: {
    ...typography.h2,
  },
  container: {
    marginTop: 12,
  },
  containerForTwoBottomButtons: {
    marginTop: 10,
    marginBottom: 16,
  },
  saveButton: {
    borderRadius: 5,
    backgroundColor: colors.primary,
    height: 50,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    ...typography.button.lg,
  },
  cancelButton: {
    borderRadius: 5,
    backgroundColor: colors.light,
    height: 50,
  },
  cancelButtonText: {
    ...typography.button.lg,
    backgroundColor: colors.light,
    borderRadius: 5,
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
  cancelButtonBorder: {
    paddingVertical: 1,
    paddingHorizontal: 1,
    borderRadius: 5,
  },
});
