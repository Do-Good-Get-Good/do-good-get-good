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
  onChange: () => void;
  setShowPopup: () => void;
};

export const ChangeRoleOrAdminPopup = ({
  isShowPopup,
  changeRoleOrAdmin,
  selected,
  onChange,
  setShowPopup,
}: Props) => {
  const allAdminsAnsSuperAdmins =
    useSuperAdminFunction().allAdminsAnsSuperAdmins;

  const allAdminsPopupObj = makePopupObjectOfAdminNameAndID(
    allAdminsAnsSuperAdmins,
  );

  const isRolePopup = changeRoleOrAdmin === ChagesType.role;

  return (
    changeRoleOrAdmin && (
      <PopupWithRadioButtons
        mainTitle={isRolePopup ? "Ändra nivå" : "Ändra admin"}
        optionsList={isRolePopup ? roleTitles : allAdminsPopupObj}
        selected={selected}
        onSelect={onChange}
        showPopup={isShowPopup}
        setShowPopup={setShowPopup}
      />
    )
  );
};
