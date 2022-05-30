import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSuperAdminFunction } from "../context/SuperAdminContext";

//component
export function ChangeRolesAndConnection({}) {
  const superAdminContext = useSuperAdminFunction();
  const [role, setRole] = useState(null);
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [adminName, serAdminName] = useState("");

  useEffect(() => {
    setUser(superAdminContext.makeChangesForSelectedUser.user);
  }, [superAdminContext.makeChangesForSelectedUser.user]);

  useEffect(() => {
    serAdminName(superAdminContext.makeChangesForSelectedUser.adminName);
  }, [superAdminContext.makeChangesForSelectedUser.adminName]);

  useEffect(() => {
    if (superAdminContext.makeChangesForSelectedUser.user.role === "user")
      setRole("User");
    else if (
      superAdminContext.makeChangesForSelectedUser.user.role === "admin"
    ) {
      setRole("Admin");
    } else if (
      superAdminContext.makeChangesForSelectedUser.user.role === "superadmin"
    ) {
      setRole("Super admin");
    }
  }, [superAdminContext.makeChangesForSelectedUser.user.role]);

  return (
    <View>
      <Text style={styles.title}>{user.firstName + " " + user.lastName}</Text>
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
