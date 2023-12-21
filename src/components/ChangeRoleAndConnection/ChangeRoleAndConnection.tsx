import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { Overlay } from "@rneui/base";

import { PopupWithRadioButtons } from "../PopupWithRadioButtons";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { useChangeRoleAndConnectionButtons } from "./useChangeRoleAndConnectionButtons";
import { TextUnderlineButton } from "../Buttons/TextUnderlineButton";
import { NameRoleAdmin } from "./NameRoleAdmin";
import { Role } from "../../utilily/enums";

type Props = {
  role: Role;
  adminName: string;
  control: any;
};

export function ChangeRolesAndConnection({ role, control, adminName }: Props) {
  const superAdminContext = useSuperAdminFunction();
  const user = superAdminContext.makeChangesForSelectedUser.user;
  const [isShowPopup, setShowPopup] = useState(false);
  const changeRoleAndConnectionButtons = useChangeRoleAndConnectionButtons(() =>
    setShowPopup(!isShowPopup),
  );

  // useEffect(() => {
  //   setUser(superAdminContext.makeChangesForSelectedUser.user);
  // }, [superAdminContext.makeChangesForSelectedUser.user]);

  // useEffect(() => {
  //   serAdminName(superAdminContext.makeChangesForSelectedUser.adminName);
  // }, [superAdminContext.makeChangesForSelectedUser.adminName]);

  return (
    <View>
      <NameRoleAdmin
        userName={user.firstName + " " + user.lastName}
        role={role}
        adminName={adminName}
      />

      <View style={styles.containerTextButton}>
        {changeRoleAndConnectionButtons.map((button, i) => (
          <TextUnderlineButton
            key={button.title + i}
            title={button.title}
            onPress={button.onPress}
          />
        ))}
      </View>
      <Overlay
        isVisible={isShowPopup}
        animationType="fade"
        overlayStyle={styles.overlayStyle}
        onBackdropPress={() => setShowPopup(false)}
      >
        {/* <PopupWithRadioButtons
          titleText={"Ändra nivå"}
          showPopup={(showPopupWithRadioButtons) =>
            setShowPopupWithRadioButtons(showPopupWithRadioButtons)
          }
          listOfRoles={roleArray}
        /> */}
      </Overlay>
    </View>
  );
}
export default ChangeRolesAndConnection;
const styles = StyleSheet.create({
  containerTextButton: {
    marginTop: 40,
    marginLeft: 2,
  },
  overlayStyle: {
    backgroundColor: colors.light,
    width: "90%",
    height: "35%",
    borderRadius: 5,
  },

  textAsButton: {
    textDecorationLine: "underline",
    fontWeight: "700",
    paddingVertical: 10,
  },
});
