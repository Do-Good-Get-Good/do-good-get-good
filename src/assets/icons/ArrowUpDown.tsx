import { Icon } from "@rneui/base";

type Props = {
  onPress?: () => void;
  expanded: boolean;
};

export const ArrowUpDown = ({ onPress, expanded = false }: Props) => {
  return (
    <Icon
      testID={`${expanded ? "arrow-drop-up" : "arrow-drop-down"}-icon`}
      color="#5B6770"
      name={expanded ? "arrow-drop-up" : "arrow-drop-down"}
      size={30}
      onPress={() => onPress && onPress()}
    />
  );
};
