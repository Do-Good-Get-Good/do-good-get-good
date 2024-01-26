import { StyleSheet, Text, View } from "react-native";
import { User } from "../../../utilily/types";
import { ArrowUpDown } from "../../../assets/icons/ArrowUpDown";

type Props = {
  firstName: User["firstName"];
  lastName: User["lastName"];
  amountOfTimeEntries: number;
  setIsOpen: () => void;
  isOpen: boolean;
};

export const MainLabel = ({
  firstName,
  lastName,
  amountOfTimeEntries,
  setIsOpen,
  isOpen,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{`${firstName}\u00A0${lastName}`}</Text>
      <ArrowUpDown
        style={{ marginHorizontal: 5 }}
        onPress={setIsOpen}
        expanded={isOpen}
      />
      <Text>{`${amountOfTimeEntries}\u00A0st`}</Text>
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
