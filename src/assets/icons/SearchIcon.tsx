import { Icon } from "@rneui/base";
import { StyleSheet } from "react-native";

type Props = {
  testID?: string;
  onPress?: () => void;
};

export const SearchIcon = ({ onPress, testID }: Props) => {
  return (
    <Icon
      testID={testID}
      onPress={onPress}
      style={styles.iconContainer}
      color="#5B6770"
      name="search"
      size={30}
    />
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    width: 55,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
