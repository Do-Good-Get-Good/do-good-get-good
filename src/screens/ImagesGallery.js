import React, { useState, useEffect } from "react";
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

export const ImagesGallery = ({ navigation }) => {
  const [imagesArray, setImagesArray] = useState(Images);
  const [imageIndex, setImageIndex] = useState(0);
  const [chooseImage, setChooseImage] = useState("");

  useEffect(() => {
    let arrayForSelection = imagesArray;

    for (let i = 0; i < arrayForSelection.length; i++) {
      if (i === imageIndex) {
        arrayForSelection[i].selected = true;
      }
      if (i != imageIndex) {
        arrayForSelection[i].selected = false;
      }
    }
    setImagesArray(arrayForSelection);

    console.log("arrayForSelection[i].selected", imagesArray);
  }, [imageIndex]);

  function getPressedImageIndexAndName(index, name, selected) {
    setImageIndex(index);
    setChooseImage(name);
  }

  imageStyle = function (selected) {
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
      borderColor: "#84BD00",
    };
  };

  return (
    <SafeAreaView>
      <Menu />
      <View>
        <Text style={styles.mainText}>Bildgalleri</Text>
        <FlatList
          style={styles.container}
          data={imagesArray}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                getPressedImageIndexAndName(index, item.name, item.selected)
              }
              style={{ flex: 0.5, flexDirection: "row" }}
            >
              <Image style={imageStyle(item.selected)} source={item.image} />
            </TouchableOpacity>
          )}
        />
        <View style={styles.containerForTwoBottomButtons}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CreateActivity", {
                imageForActivity: chooseImage,
              })
            }
          >
            <Text style={styles.buttonSave}>Spara</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LinearGradient
              colors={["#84BD00", "#5B6770"]}
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
};
const styles = StyleSheet.create({
  mainText: {
    fontSize: 34,
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
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#84BD00",
    backgroundColor: "#84BD00",
    overflow: "hidden",

    paddingVertical: 20,
    paddingBottom: 10,

    marginBottom: 10,
  },

  buttonCancel: {
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 2,
    paddingVertical: 12,
    paddingHorizontal: 155,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    overflow: "hidden",
  },
  buttonBorderStyleButtonBackAndCancel: {
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});
