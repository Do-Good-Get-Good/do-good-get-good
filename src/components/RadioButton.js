import React, { useState, useEffect } from "react";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const RadioButton = ({}) => {
  const [jaButton, setJaButton] = useState(false);
  const [nejButton, setNejButton] = useState(true);
  const adminGalleryContext = useAdminGalleryFunction();

  const jaRadioButtonsPress = () => {
    if (jaButton != true) {
      setJaButton(true);
      setNejButton(false);
      adminGalleryContext.chooseActiveOrNot(false);
    }
  };

  const nejRadioButtonsPress = () => {
    if (nejButton != true) {
      setNejButton(true);
      setJaButton(false);
      adminGalleryContext.chooseActiveOrNot(true);
    }
  };

  return (
    <View>
      <View style={styles.textRadioButtonFilter}>
        <View style={styles.radioButtons}>
          <Text style={styles.textAktiva}>Aktiva:</Text>
          <TouchableOpacity
          testID="pressOnButtonJa" 
            onPress={jaRadioButtonsPress}
            style={styles.radioButtons}
          >
            <Text style={styles.textJaNej}> Ja </Text>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                backgroundColor: jaButton === true ? "#84BD00" : "white",
                borderColor: "#333333",
                borderWidth: 1,
              }}
            >
              {jaButton === true ? (
                <View style={styles.smallCircul}></View>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
           testID="pressOnButtonNej"
            onPress={nejRadioButtonsPress}
            style={styles.radioButtons}
          >
            <Text style={styles.textJaNej}> Nej </Text>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                backgroundColor: nejButton === true ? "#84BD00" : "white",
                borderColor: "#333333",
                borderWidth: 1,
              }}
            >
              {nejButton === true ? (
                <View style={styles.smallCircul}></View>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RadioButton; 

// export default (props) => { 
  
//    const { chooseInactive, setchooseInactive } = useAdminGalleryFunction();
//    return <RadioButton chooseInactive={chooseInactive} setchooseInactive={setchooseInactive} {...props}/>; 
//   };

const styles = StyleSheet.create({
  textAktiva: {
    fontSize: 20,
    paddingTop: 8,
    color: "#333333",
  },
  textJaNej: {
    fontSize: 16,
    paddingTop: 2,
    marginLeft: 5,
    color: "#333333",
  },
  textRadioButtonFilter: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 16,
  },
  radioButtons: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10,
  },

  smallCircul: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    margin: 4,
    backgroundColor: "#333333",
  },
});
