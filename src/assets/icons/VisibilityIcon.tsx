import { Icon } from "@rneui/base";

type Props = {
  onPress?: () => void;
  visibilityOn: boolean;
};

export const VisibilityIcon = ({ onPress, visibilityOn = false }: Props) => {
  return (
    <Icon
      name={visibilityOn ? "visibility" : "visibility-off"}
      type="material"
      size={25}
      onPress={() => onPress && onPress()}
    />
  );
};
