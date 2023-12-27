import { Role } from "../../utilily/enums";
import { roleTitles } from "../../utilily/utils";
import { PopupWithRadioButtons } from "../Popup/PopupWithRadioButtons";
export enum ChagesType {
  role = "role",
  admin = "admin",
}

type Props = {
  isShowPopup: boolean;
  changeRoleOrAdmin: ChagesType | undefined;
  onChange: () => void;
  setShowPopup: () => void;
};

export const ChangeRoleOrAdminPopup = ({
  isShowPopup,
  changeRoleOrAdmin,
  onChange,
  setShowPopup,
}: Props) => {
  return (
    changeRoleOrAdmin && (
      <PopupWithRadioButtons
        mainTitle={
          changeRoleOrAdmin === ChagesType.role ? "Ändra nivå" : "Ändra admin"
        }
        optionsList={roleTitles}
        selected={Role.admin}
        onSelect={onChange}
        showPopup={isShowPopup}
        setShowPopup={setShowPopup}
      />
    )
  );
};
