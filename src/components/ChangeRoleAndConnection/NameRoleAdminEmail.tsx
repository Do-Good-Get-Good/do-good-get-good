import { StyleSheet, Text, View } from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { Role } from "../../utility/enums";
import { User } from "../../utility/types";
import { roleTitles } from "../../utility/utils";

type TitleAndValue = {
  title: string;
  value: string;
};

const TitleAndValue = ({ title, value }: TitleAndValue) => {
  return (
    <>
      <Text style={styles.textForRoleAndAdminTitle}>{title}</Text>
      <Text testID="title-and-value-value" style={styles.textForRoleAndAdmin}>
        {value}
      </Text>
    </>
  );
};

type Props = {
  userName: string;
  role: Role;
  adminName: string;
  userEmail: User["email"];
};

export const NameRoleAdminEmail = ({
  userName,
  role,
  adminName,
  userEmail,
}: Props) => {
  return (
    <>
      <Text style={styles.title}>{userName}</Text>
      <View style={styles.containerForRoleAndAdminText}>
        <TitleAndValue title="Nivå" value={roleTitles[role]} />
        <TitleAndValue title="Admin" value={adminName} />
        <TitleAndValue title="E-post" value={userEmail ?? "---"} />
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
    paddingLeft: 10,
    paddingBottom: 25,
  },
  textForRoleAndAdminTitle: {
    fontWeight: "700",
    paddingLeft: 10,
    paddingBottom: 7,
  },
  title: {
    marginTop: 20,
    ...typography.h2,
    paddingVertical: 20,
    borderRadius: 3,
    marginBottom: 10,
  },
});
