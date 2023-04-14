import React, { useState, useMemo } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import InfoModal from "../components/InfoModal";
import BottomNavButtons from "../components/BottomNavButtons";
import { useActivityImages } from "../hooks/useActivityImages";

export function ImagesGallery({ navigation, route }) {
  const { images, loading, error } = useActivityImages();

  const [selectedImage, setSelectedImage] = useState({
    name: route.params.selectedImage,
    url: "",
  });

  const imagesArray = useMemo(() => {
    return images
      .map((img) => {
        if (img.imageName !== selectedImage.name)
          return { ...img, selected: false };

        return { ...img, selected: true };
      })
      .sort((a, b) => a.imageName.localeCompare(b.imageName));
  }, [images, selectedImage.name]);

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
        image: selectedImage,
      });
    }
    if (route.params?.cameFrom === "CreateUser") {
      navigation.navigate("CreateUser", {
        image: selectedImage,
      });
    }
    if (route.params?.cameFrom === "ChangeActivity") {
      navigation.navigate("ChangeActivity", {
        activity: route.params?.activity,
        tgPopular: route.params?.tgPopular,
        image: selectedImage,
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
            onPress={() =>
              setSelectedImage({ name: item.imageName, url: item.imageUrl })
            }
            style={{ flex: 0.5, flexDirection: "row" }}
          >
            <Image
              testID="imageInImageGallery"
              style={imageStyle(item.selected)}
              source={{ uri: item.imageUrl }}
            />
          </TouchableOpacity>
        )}
      />
      <BottomNavButtons
        primaryText="Spara"
        primaryFunc={() => buttonSavePressed()}
        secondaryText="Avbryt"
        secondaryFunc={() => navigation.goBack()}
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
