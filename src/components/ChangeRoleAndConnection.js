import { StyleSheet, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

//component
export function ChangeRolesAndConnection({ user, adminName }) {
  const [selectedUser, setSelectedUser] = useState(user);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user.role === "user") setRole("User");
    else if (user.role === "admin") {
      setRole("Admin");
    } else if (user.role === "superadmin") {
      setRole("Super admin");
    }
  }, [user]);

  return (
    <View>
      <Text style={styles.title}>{user.first_name + " " + user.last_name}</Text>
      <View style={styles.containerForRoleAndAdminText}>
        <Text style={styles.textForRoleAndAdminTitle}>Nivå</Text>
        <Text style={styles.textForRoleAndAdmin}>{role}</Text>
        <Text style={styles.textForRoleAndAdminTitle}>Admin</Text>
        <Text style={styles.textForRoleAndAdmin}>{adminName}</Text>
      </View>
      <View style={styles.containerTextButton}>
        <TouchableOpacity>
          <Text style={styles.textAsButton}>Ändra nivå</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textAsButton}>Ändra admin</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textAsButton}>Ändra användare</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textAsButton}>Inaktivera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ChangeRolesAndConnection;
const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    ...typography.h2,
    paddingVertical: 20,
    borderRadius: 3,
    marginBottom: 10,
  },
  containerForRoleAndAdminText: {
    backgroundColor: colors.background,

    ...typography.b2,
  },
  textForRoleAndAdminTitle: {
    fontWeight: "700",
    padding: 10,
  },
  containerTextButton: {
    marginTop: 40,
    marginLeft: 2,
  },
  textForRoleAndAdmin: {
    padding: 10,
  },
  textAsButton: {
    textDecorationLine: "underline",
    fontWeight: "700",
    paddingVertical: 10,
  },
});
