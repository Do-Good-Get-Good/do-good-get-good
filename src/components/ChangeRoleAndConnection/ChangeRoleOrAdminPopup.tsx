import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { Role } from "../../utilily/enums";
import { User } from "../../utilily/types";
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
    context.allAdminsAnsSuperAdmins,
  );
  const userID = context.makeChangesForSelectedUser?.user.id;

  const isRolePopup = changeRoleOrAdmin === ChagesType.role;

  return (
    changeRoleOrAdmin && (
      <PopupWithRadioButtons
        mainTitle={isRolePopup ? "Ändra nivå" : "Ändra admin"}
        optionsList={isRolePopup ? roleTitles : allAdminsPopupObj}
        selected={selected}
        exceptOf={userID}
        onSelect={(key) =>
          isRolePopup
            ? onChange(key)
            : onChange({ id: key, fullName: allAdminsPopupObj[key] })
        }
        showPopup={isShowPopup}
        setShowPopup={setShowPopup}
      />
    )
  );
};
