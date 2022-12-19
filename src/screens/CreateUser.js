import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";

import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useMultistepPage } from "../hooks/useMultistepPage";
import UserForm from "../components/UserForm";
import { useUserLevelCheckFunction } from "../context/UserLevelContext";
import typography from "../assets/theme/typography";
import BottomNavButtons from "../components/BottomNavButtons";

const CreateUser = ({ navigation }) => {
  const userLevel = useUserLevelCheckFunction();
  const createActivityContext = useCreateActivityFunction();

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);

  const { step, steps, currentStepIndex, next, back } = useMultistepPage([
    <UserForm
      userLevel={userLevel}
      name={name}
      setName={setName}
      surname={surname}
      setSurname={setSurname}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      role={role}
      setRole={setRole}
      nextPage={handleNextPage}
    />,
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <BottomNavButtons
        primaryText="Spara"
        secondaryText="Tillbaka"
        primaryFunc={() => {}}
        secondaryFunc={() => {
          handleGoBack();
        }}
      />
    </View>,
  ]);

  function handleNextPage() {
    next();
  }

  function handleGoBack() {
    back();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Skapa användare</Text>
        <Text style={styles.pageNumber}>
          {currentStepIndex + 1}/{steps.length}
        </Text>
      </View>
      {step}
    </SafeAreaView>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  header: {
    fontFamily: typography.title.fontFamily,
    fontSize: typography.title.fontSize,
  },
  pageNumber: {
    marginLeft: 10,
    fontFamily: typography.b1.fontFamily,
    fontSize: typography.b1.fontSize,
  },
  contentWrapper: {
    marginHorizontal: 16,
  },
});
