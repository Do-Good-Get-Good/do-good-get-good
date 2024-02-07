import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { User } from "../../utilily/types";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { ArrowUpDown } from "../../assets/icons/ArrowUpDown";
import { useEffect, useState } from "react";

import { Pencil } from "../../assets/icons/Pencil";

import { PopupWithRadioButtons } from "../Popup/PopupWithRadioButtons";
import { makePopupObjectOfAdminNameAndID } from "../ChangeRoleAndConnection/utils";
import { showAdminName } from "../../hooks/super-admin/utils";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";

type DropDownInfoProps = {
  onSelect: (user: User) => void;
  user: User;
};

const DropDownInfo = ({ user, onSelect }: DropDownInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const context = useSuperAdminFunction();
  const allAdminsAndSuperAdmin = context?.allAdminsAndSuperAdmins;
  const allAdminsPopupObj = makePopupObjectOfAdminNameAndID(
    allAdminsAndSuperAdmin,
  );

  return (
    <View
      testID={`connected-users-dropdown-${user.id}`}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.containerForTextAndIcon}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.userAndAdminNames}>
          {user.firstName + " " + user.lastName}
        </Text>

        <ArrowUpDown onPress={() => setIsOpen(!isOpen)} expanded={isOpen} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.containerAdminName}>
          <View style={[styles.containerAdminName, styles.adminNameAndIcon]}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.adminText}>Admin:</Text>
              <Text
                testID="drop-down-admin-name"
                style={styles.userAndAdminNames}
              >
                {showAdminName(user.adminID, allAdminsAndSuperAdmin)}
              </Text>
            </View>

            <Pencil onPress={() => setIsShowPopup(!isShowPopup)} />
          </View>

          <PopupWithRadioButtons
            mainTitle={"Ändra admin"}
            optionsList={allAdminsPopupObj}
            selected={user.adminID ?? ""}
            exceptOf={user.id}
            onSelect={(adminID) => onSelect({ ...user, adminID })}
            showPopup={isShowPopup}
            setShowPopup={() => setIsShowPopup(!isShowPopup)}
          />
        </View>
      )}
    </View>
  );
};

type Props = {
  onSaveUsersWithChangedAdmin: (user: User) => void;
};
export const ConnectedUsersDropDown = ({
  onSaveUsersWithChangedAdmin,
}: Props) => {
  const superAdminContext = useSuperAdminFunction();
  const contextArrayOfUsersIfAdmin =
    superAdminContext?.makeChangesForSelectedUser?.arrayOfUsersIfAdmin;
  const [connectedUsers, setConnectedUsers] = useState<User[] | undefined>(
    contextArrayOfUsersIfAdmin,
  );

  useEffect(() => {
    setConnectedUsers(contextArrayOfUsersIfAdmin);
  }, [contextArrayOfUsersIfAdmin]);

  const onSelect = (user: User) => {
    onSaveUsersWithChangedAdmin(user);

    const i = connectedUsers?.findIndex((u) => u.id === user.id) ?? -1;
    const arr = connectedUsers;
    if (i !== -1 && arr !== undefined) {
      arr[i] = { ...user };

      setConnectedUsers(arr);
    }
  };

  return (
    <View>
      {connectedUsers &&
        connectedUsers.map((item, i) => (
          <DropDownInfo onSelect={onSelect} key={i} user={item} />
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    marginTop: 10,
    borderRadius: 3,
  },
  containerForTextAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...typography.b1,
    paddingVertical: 14,
  },
  adminText: {
    paddingRight: 5,
    fontWeight: "500",
    ...typography.b2,
  },
  containerAdminName: {
    flexDirection: "row",
    marginBottom: 7,
  },
  userAndAdminNames: {
    ...typography.b2,
  },
  adminNameAndIcon: {
    paddingRight: 3,
    justifyContent: "space-between",
    flex: 1,
  },
});
