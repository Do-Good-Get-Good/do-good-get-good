import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import Menu from "../components/Menu";
import { Icon } from "react-native-elements";
import { DropDownSmall } from "../components/DropDownSmall";
import Images from "../Images";
import { set } from "date-fns";

export const ImagesGallery = ({ navigation }) => {
  const [imagesArray, setImagesArray] = useState(Images);
  const [imageSelected, setImageSelected] = useState(true);
  const [imageName, setImageName] = useState("symbol_hands_heart-DEFAULT");
  const [imageIndex, setImageIndex] = useState(0);
  const [chooseImage, setChooseImage] = useState("");
  //   const [imageName, setImageName] = useState(0);

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

  // console.log("imagesArray", imagesArray);
  console.log("imageIndex", imageIndex);

  function getPressedImageIndexAndName(index, name, selected) {
    setImageIndex(index);
    setChooseImage(name);
    setImageSelected(selected);
  }

  // setImagesArray((prev) => {
  //   return{
  //     ...prev,
  //     selected: true
  //   }
  // })

  // if(imageName === "symbol_hands_heart-DEFAULT") {
  //     setDefaultImageBorderLight(true)
  // } else {
  // }

  // useEffect(() => {
  //   for(let i = 0; i<imagesArray.length; i++ ){

  //   }
  // },[])

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

  // const imageStyle = {

  // };

  // function border(index) {
  //   const st = {
  //     borderWidth: imagesArray[index].selected === true ? 7 : 1,
  //   };
  // }

  return (
    <SafeAreaView>
      <Menu />
      <View>
        <Text style={styles.mainText}>Bildgalleri</Text>
        <FlatList
          style={styles.container}
          data={imagesArray}
          // keyExtractor={(item) => item.key}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                getPressedImageIndexAndName(index, item.name, item.selected)
              }
              style={{ flex: 0.5, flexDirection: "row" }}
            >
              {/* <Image
                style={{
                  ...imageStyle,
                  borderWidth: item.selected === true ? 7 : 1,
                }}
                source={item.image}
              /> */}
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
  image: {
    // flex: 1,
    // flexDirection: "row",
    // resizeMode: "contain",
    // backgroundColor: "white",
    // alignItems: "center",
    // marginRight: 14,
    // marginTop: 10,
    // borderRadius: 5,
    // height: 156,
    // width: 143,
    // borderRadius: 3,
    // borderWidth: 1,
    // borderColor: "#84BD00",
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
