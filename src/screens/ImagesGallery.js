import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import Images from "../lib/images";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import InfoModal from "../components/InfoModal";
import { Format } from "../lib/enums/imageFormat";
import BottomNavButtons from "../components/BottomNavButtons";

export function ImagesGallery({ navigation, route }) {
  const [imagesArray, setImagesArray] = useState(
    Images.filter((img) => img.format === Format.square),
  );
  const [imageName, setImageName] = useState(route.params.selectedImage);

  useEffect(() => {
    changeBorderStyle(imageName);
  }, [imageName]);

  function changeBorderStyle(imageName) {
    let newArr = imagesArray.map((image) => {
      if (image.name !== imageName) return { ...image, selected: false };

      return { ...image, selected: true };
    });
    setImagesArray(newArr);
  }

  const imageStyle = (selected) => {
    return {
      flex: 1,
      flexDirection: "row",
      resizeMode: "cover",
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
  };

  const buttonSavePressed = () => {
    if (route.params?.cameFrom === "CreateActivity") {
      navigation.navigate("CreateActivity", {
        imageForActivity: imageName,
      });
    }
    if (route.params?.cameFrom === "CreateUser") {
      navigation.navigate("CreateUser", {
        imageForActivity: imageName,
      });
    }
    if (route.params?.cameFrom === "ChangeActivity") {
      navigation.navigate("ChangeActivity", {
        activity: route.params?.activity,
        tgPopular: route.params?.tgPopular,
        imageForActivity: imageName,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <View style={styles.headerView}>
        <Text style={styles.mainText}>Bildgalleri</Text>
        <InfoModal screen="imageGallery" tooltipWidth={200} />
      </View>
      <FlatList
        style={styles.container}
        columnWrapperStyle={{ marginBottom: 10 }}
        data={imagesArray}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID="pressOnImage"
            onPress={() => setImageName(item.name)}
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
      <BottomNavButtons
        primaryText="Spara"
        primaryFunc={buttonSavePressed}
        secondaryText="Avbryt"
        secondaryFunc={navigation.goBack}
      />
    </SafeAreaView>
  );
}

export default ImagesGallery;
const styles = StyleSheet.create({
  headerView: {
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainText: {
    ...typography.h2,
  },
  container: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
});
