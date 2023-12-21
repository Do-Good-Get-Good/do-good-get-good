type ChangeButtonsType = {
  title: string;
  onPress: () => void;
};
export const useChangeRoleAndConnectionButtons = (
  isShowPopup: () => void,
): Array<ChangeButtonsType> => {
  const onPressButton = (func: () => void) => {
    isShowPopup();
    func();
  };

  const changeRoleAndConnectionButtons = [
    {
      title: "Ändra nivå",
      onPress: () => onPressButton(() => console.log("func")),
    },
    {
      title: "Ändra admin",
      onPress: () => onPressButton(() => console.log("Ändra admin")),
    },
    {
      title: "Ändra användare",
      onPress: () => onPressButton(() => console.log("Ändra användare")),
    },
    {
      title: "Inaktivera",
      onPress: () => onPressButton(() => console.log("Inaktivera")),
    },
  ];
  return changeRoleAndConnectionButtons;
};
