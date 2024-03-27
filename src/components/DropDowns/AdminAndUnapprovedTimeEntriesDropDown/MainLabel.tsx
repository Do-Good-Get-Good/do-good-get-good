import { StyleSheet, Text, View } from "react-native";
import { User } from "../../../utility/types";
import { ArrowUpDown } from "../../../assets/icons/ArrowUpDown";

type Props = {
  title: string;
  amountOfTimeEntries?: number;
  setIsOpen: () => void;
  isOpen: boolean;
};

export const MainLabel = ({
  title,
  amountOfTimeEntries,
  setIsOpen,
  isOpen,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text
        onPress={setIsOpen}
        testID="main-title-drop-down"
        style={styles.textName}
      >
        {title}
      </Text>
      <ArrowUpDown
        style={{ marginHorizontal: 5 }}
        onPress={setIsOpen}
        expanded={isOpen}
      />
      <Text testID="amount-of-unapproved-time-entries">
        {amountOfTimeEntries && `${amountOfTimeEntries}\u00A0st`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
    flex: 1,
  },
  textName: { fontWeight: "bold", flex: 1 },
});
