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
import { useActivityImages } from "../context/ActivityImagesContext";
import { ActivityImage } from "../hooks/useCloudImages";

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
    selectedImage ?? { photo: "" },
  );

  const imagesArray = useMemo(() => {
    return images
      .map((img) => ({
        ...img,
        selected: img.photo === selected.photo,
      }))
      .sort((a, b) => a.photo.localeCompare(b.photo));
  }, [images, selected]);

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
    if (cameFrom === "CreateActivity") {
      navigation.navigate("CreateActivity", {
        image: selected,
      });
    }
    if (cameFrom === "CreateUser") {
      navigation.navigate("CreateUser", {
        image: selected,
      });
    }
    if (cameFrom === "ChangeActivity") {
      navigation.navigate("ChangeActivity", {
        activity,
        tgPopular,
        image: selected,
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
              setSelected({
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
