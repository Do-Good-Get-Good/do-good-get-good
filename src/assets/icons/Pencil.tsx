import { Icon } from "@rneui/base";
import colors from "../theme/colors";

type Props = {
  onPress?: () => void;
};

export const Pencil = ({ onPress }: Props) => {
  return (
    <Icon
      color={colors.secondary}
      type="material-community"
      name="pencil-outline"
      size={25}
      onPress={() => onPress && onPress()}
    />
  );
};
