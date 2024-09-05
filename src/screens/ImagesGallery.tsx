import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import typography from "../assets/theme/typography";
import BottomNavButtons from "../components/BottomNavButtons";
import InfoModal from "../components/InfoModal";
import Menu from "../components/Menu";
import { useActivityImages } from "../context/ActivityImagesContext/ActivityImagesContext";
import { ActivityImage } from "../hooks/useCloudImages";
import { selectedImageStyle } from "../styles/selectedImageStyle";
import { Routes } from "../utility/routes";

export function ImagesGallery({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { selectedImage, cameFrom, tgPopular, activity } = route.params;
  const { images } = useActivityImages();

  const [selected, setSelected] = useState<ActivityImage>(
    selectedImage ?? { photo: "" }
  );

  const imagesArray = useMemo(() => {
    return images
      .map((img) => ({
        ...img,
        selected: img.photo === selected.photo,
      }))
      .sort((a, b) => a.photo.localeCompare(b.photo));
  }, [images, selected]);

  const buttonSavePressed = () => {
    const navigationParams =
      cameFrom === Routes.ChangeActivity
        ? { activity, tgPopular, image: selected }
        : { image: selected };
    navigation.navigate(cameFrom, navigationParams);
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
              setSelected({
                photo: item.photo,
                imageUrl: item.imageUrl,
              })
            }
            style={{ flex: 0.5, flexDirection: "row" }}
          >
            <Image
              testID="imageInImageGallery"
              style={selectedImageStyle(item.selected)}
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
