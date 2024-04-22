import React, { useState } from "react";
import {
  View,StyleSheet,Text,Image, Dimensions, TouchableOpacity
} from "react-native";
import { Overlay } from "@rneui/base";
import colors from "../../../assets/theme/colors";
import typography from "../../../assets/theme/typography";
import { useNavigation } from "@react-navigation/native";
import { UserStack } from "../../../utility/routeEnums";


type Props ={
    visible: boolean
    onBackdropPress: ()=> void,
  }


export const PopUpExpirePost = ({visible,onBackdropPress}:Props) => {

      const navigation = useNavigation<{
    navigate: (nav: UserStack) => void;
  }>();

    const onButtonYesPressed=()=>{

        console.log("Ja pressed")

    }

  return (
    <Overlay
    onBackdropPress={onBackdropPress}
    isVisible={visible}
    animationType="fade"
    overlayStyle={styles.overlayStyle}>
    <Text style={styles.textQuestionAlert}>Den här upplevelsen raderas automatiskt efter ett år..</Text>
        <View style={styles.containerButtonsAlert}>
          <TouchableOpacity
            style={[styles.alertButton, { backgroundColor: colors.primary }]}
            onPress={onButtonYesPressed}
          >
            <Text style={styles.buttonAlertText}>Okej</Text>
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
        justifyContent: 'center',
      },
      alertButton: {
        marginVertical:10,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:80,
        paddingVertical: 8,
        borderRadius: 5,
      },
      buttonAlertText: {
        ...typography.button.lg,
      }
 
});
