import { StyleSheet, Text, View } from "react-native";
import { Role } from "../../utilily/enums";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { roleTitles } from "../../utilily/utils";

type TitleAndValue = {
  title: string;
  value: string;
};

const TitleAndValue = ({ title, value }: TitleAndValue) => {
  return (
    <>
      <Text style={styles.textForRoleAndAdminTitle}>{title}</Text>
      <Text style={styles.textForRoleAndAdmin}>{value}</Text>
    </>
  );
};

type Props = {
  userName: string;
  role: Role;
  adminName: string;
};

export const NameRoleAdmin = ({ userName, role, adminName }: Props) => {
  return (
    <>
      <Text style={styles.title}>{userName}</Text>
      <View style={styles.containerForRoleAndAdminText}>
        <TitleAndValue title="Nivå" value={roleTitles[role]} />
        <TitleAndValue title="Admin" value={adminName} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerForRoleAndAdminText: {
    backgroundColor: colors.background,

    ...typography.b2,
  },
  textForRoleAndAdmin: {
    padding: 10,
  },
  textForRoleAndAdminTitle: {
    fontWeight: "700",
    padding: 10,
  },
  title: {
    marginTop: 20,
    ...typography.h2,
    paddingVertical: 20,
    borderRadius: 3,
    marginBottom: 10,
  },
});
