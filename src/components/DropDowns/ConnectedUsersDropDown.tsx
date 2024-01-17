import { Controller, UseFormGetValues, useForm } from "react-hook-form";
import { UserInfo } from "../../screens/RolesAndConnection";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { User, UserObjectForSuperAdmin } from "../../utilily/types";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { ArrowUpDown } from "../../assets/icons/ArrowUpDown";
import { useCallback, useState } from "react";
import { set } from "lodash";

import { Pencil } from "../../assets/icons/Pencil";

import { PopupWithRadioButtons } from "../Popup/PopupWithRadioButtons";
import { makePopupObjectOfAdminNameAndID } from "../ChangeRoleAndConnection/utils";

type DropDownInfoProps = {
  onSelect: (user: User) => void;
  user: User;
};
const DropDownInfo = ({ user, onSelect }: DropDownInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const context = useSuperAdminFunction();
  const admin = context?.makeChangesForSelectedUser?.user;
  const allAdminsAnsSuperAdmin = context?.allAdminsAnsSuperAdmins;
  const allAdminsPopupObj = makePopupObjectOfAdminNameAndID(
    allAdminsAnsSuperAdmin,
  );

  const adminName = admin?.firstName + " " + admin?.lastName;

  //   const onSelect = (adminID: string)=>{
  //     setUsersWithChangedAdmin(prev => [
  //         ...prev,
  //         { ...user, adminID: adminID }
  //       ]);

  //   }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerForTextAndIcon}
        onPress={() => setIsOpen(!isOpen)}
        //   onPress={() => changeSelectedForDropDown(user.user.id)}
      >
        <Text style={styles.userAndAdminNames}>
          {user.firstName + " " + user.lastName}
        </Text>

        <ArrowUpDown onPress={() => setIsOpen(!isOpen)} expanded={isOpen} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.containerAdminName}>
          <View style={[styles.containerAdminName, styles.adminNameAndIcon]}>
            <Text style={styles.userAndAdminNames}>{adminName}</Text>

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
  onSelect: (user: User) => void;
};
export const ConnectedUsersDropDown = ({ onSelect }: Props) => {
  const superAdminContext = useSuperAdminFunction();

  const connectedUsers =
    superAdminContext?.makeChangesForSelectedUser?.arrayOfUsersIfAdmin;

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
    paddingLeft: 10,
    paddingRight: 3,
    justifyContent: "space-between",
    flex: 1,
  },
});

// type ConnectedUserAdminInfo = {
//   id: User["adminID"];
//   adminFullName: string;
// };

// const schema: yup.ObjectSchema<ConnectedUserAdminInfo> = yup
//   .object()
//   .shape({
//     id: yup.string().required(),
//     adminFullName: yup.string().required(),
//   })

//   .defined();

//   const { handleSubmit, control, getValues } = useForm<ConnectedUserAdminInfo>({
//     defaultValues: {
//       id: user.adminID,
//       adminFullName: user?.adminName,
//     },
//     resolver: yupResolver(schema),
//   });

{
  /* <Controller
        name={ChagesType.admin}
        control={props.control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
             <PopupWithRadioButtons
            mainTitle={ "Ändra admin"}
            optionsList={ allAdminsPopupObj}
            selected={getValues("admin.id")}
            exceptOf={userID}
            onSelect={(key) =>
              isRolePopup
                ? onSelectRole(key)
                : onChange({ id: key, fullName: allAdminsPopupObj[key] })
            }
            showPopup={isShowPopup}
            setShowPopup={setShowPopup}
          />
        )}
      /> */
}
