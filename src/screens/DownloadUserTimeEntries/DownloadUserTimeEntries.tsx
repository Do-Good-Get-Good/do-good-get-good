import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../../components/Menu";
import typography from "../../assets/theme/typography";
import { StyleSheet, Text } from "react-native";

export const DownloadUserTimeEntries = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <Text style={styles.headerText}>Exportera data</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    alignSelf: "center",
    ...typography.title,
    marginBottom: 16,
  },
});
