import React, { useState, useMemo } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageStyle,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import InfoModal from "../components/InfoModal";
import BottomNavButtons from "../components/BottomNavButtons";
import {
  useActivityImages,
  ActivityImage,
} from "../context/ActivityImagesContext";

export function ImagesGallery({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { getImages } = useActivityImages();

  const [selectedImage, setSelectedImage] = useState<ActivityImage>(
    route.params.selectedImage,
  );

  const imagesArray = useMemo(() => {
    return getImages()
      .map((img) => {
        if (img.photo !== selectedImage.photo)
          return { ...img, selected: false };

        return { ...img, selected: true };
      })
      .sort((a, b) => a.photo.localeCompare(b.photo));
  }, [getImages(), selectedImage]);

  const imageStyle = (selected: any): ImageStyle => {
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
              setSelectedImage({
                photo: item.photo,
                imageUrl: item.imageUrl,
              })
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
