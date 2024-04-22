import React, { useState } from "react";
import {
  View,StyleSheet,Text,Image, Dimensions, TouchableOpacity
} from "react-native";
import { Overlay } from "@rneui/base";
import colors from "../../../assets/theme/colors";
import typography from "../../../assets/theme/typography";
import { PopUpExpirePost } from "./PopUpExpirePost";


type Props ={
    visible: boolean
    onBackdropPress: ()=> void,
  }


export const PopUpPublishPost = ({visible,onBackdropPress}:Props) => {
    const [showOverlay, setShowOverlay] = useState(false);

    const onButtonYesPressed=()=>{

    }
    const onButtonNoPressed=()=>{
        console.log("Nej pressed")      
    }

  return (
    <Overlay
    onBackdropPress={onBackdropPress}
    isVisible={visible}
    animationType="fade"
    overlayStyle={styles.overlayStyle}>
    <Text style={styles.textQuestionAlert}>Vill du publicera det här inlägget i chatten? Alla DGGG-användare kommer att se detta inlägg.</Text>
        <View style={styles.containerButtonsAlert}>
          <TouchableOpacity
            style={[styles.alertButton, { backgroundColor: colors.light }]}
            onPress={onButtonNoPressed}
          >
            <Text style={styles.buttonAlertText}>Nej</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.alertButton, { backgroundColor: colors.primary }]}
            onPress={onButtonYesPressed}
          >
            <Text style={styles.buttonAlertText}>Ja</Text>
          </TouchableOpacity>
        </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
    textQuestionAlert: {
        color: colors.dark,
        ...typography.cardTitle,
        margin: 8,
      },
    overlayStyle: {
        backgroundColor: colors.light,
     },
     containerButtonsAlert: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
      },
      alertButton: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:30,
        minWidth: "30%",
        paddingVertical: 10,
        borderRadius: 5,
      },
      buttonAlertText: {
        ...typography.button.sm,
      }
});
