import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { Role } from "../../utilily/enums";
import { roleTitles } from "../../utilily/utils";
import { PopupWithRadioButtons } from "../Popup/PopupWithRadioButtons";
import { makePopupObjectOfAdminNameAndID } from "./utils";
export enum ChagesType {
  role = "role",
  admin = "admin",
}

type Props = {
  isShowPopup: boolean;
  changeRoleOrAdmin: ChagesType | undefined;
  selected: string;
  onChange: (select: string | { [key: string]: string }) => void;
  setShowPopup: () => void;
};

export const ChangeRoleOrAdminPopup = ({
  isShowPopup,
  changeRoleOrAdmin,
  selected,
  onChange,
  setShowPopup,
}: Props) => {
  const context = useSuperAdminFunction();

  const allAdminsPopupObj = makePopupObjectOfAdminNameAndID(
    context?.allAdminsAndSuperAdmins,
  );
  const userID = context?.makeChangesForSelectedUser?.user.id;
  const arrayOfUsersIfAdmin =
    context?.makeChangesForSelectedUser?.arrayOfUsersIfAdmin;
  const isHavingUsers =
    arrayOfUsersIfAdmin !== undefined && arrayOfUsersIfAdmin.length > 0;

  const isRolePopup = changeRoleOrAdmin === ChagesType.role;

  const onSelectRole = (key: string) => {
    isHavingUsers && key === Role.user
      ? console.log("You need to connect users to another admin")
      : onChange(key);
  };

  return (
    changeRoleOrAdmin && (
      <PopupWithRadioButtons
        mainTitle={isRolePopup ? "Ändra nivå" : "Ändra admin"}
        optionsList={isRolePopup ? roleTitles : allAdminsPopupObj}
        selected={selected}
        exceptOf={userID}
        onSelect={(key) =>
          isRolePopup
            ? onSelectRole(key)
            : onChange({ id: key, fullName: allAdminsPopupObj[key] })
        }
        showPopup={isShowPopup}
        setShowPopup={setShowPopup}
      />
    )
  );
};
