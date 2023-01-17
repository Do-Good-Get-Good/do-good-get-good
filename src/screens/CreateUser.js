import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import UserForm from "../components/UserForm";
import LoadingOverlay from "../components/LoadingOverlay";
import LinkActivityToNewUser from "../components/LinkActivityToNewUser";

import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useUserLevelCheckFunction } from "../context/UserLevelContext";

import { useMultistepPage } from "../hooks/useMultistepPage";

import typography from "../assets/theme/typography";

import { createUserAndLinkSelectedActivity } from "../cloud_functions/createUserAndLinkSelectedActivity";
import { createUserAndNewActivity } from "../cloud_functions/createUserAndNewActivity";

const CreateUser = ({ route, navigation }) => {
  const userLevel = useUserLevelCheckFunction();
  const { setAllActiveActvivitiesFB } = useCreateActivityFunction();

  const [loading, setLoading] = useState(false);

  // Step 1
  const [user, setUser] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    role: null,
  });

  // Step 2
  const [activity, setActivity] = useState({
    title: "",
    place: "",
    city: "",
    description: "",
    favorite: false,
    image: "",
  });
  const [selectedActivity, setSelectedActivity] = useState(null);

  const { step, steps, currentStepIndex, next, back } = useMultistepPage([
    <UserForm
      userLevel={userLevel}
      user={user}
      setUser={setUser}
      nextPage={handleNextPage}
    />,
    <LinkActivityToNewUser
      activity={activity}
      setActivity={setActivity}
      selectedActivity={selectedActivity}
      setSelectedActivity={setSelectedActivity}
      goBack={handleGoBack}
      createUserAndNewActivity={handleCreateUserAndNewActivity}
      createUserAndLinkSelectedActivity={handleCreateUser}
    />,
  ]);

  useEffect(() => {
    if (route.params?.imageForActivity === undefined) {
      setActivity({ ...activity, image: "symbol_hands_heart-DEFAULT" });
    } else {
      setActivity({ ...activity, image: route.params?.imageForActivity });
    }
  }, [route.params?.imageForActivity]);

  function handleNextPage() {
    next();
  }

  function handleGoBack() {
    back();
  }

  function handleCreateUser() {
    createUserAndLinkSelectedActivity(
      user,
      selectedActivity,
      setLoading,
      navigation
    );
  }

  function handleCreateUserAndNewActivity() {
    const newActivity = {
      active_status: true,
      activity_city: activity.city,
      activity_description: activity.description,
      activity_photo: activity.image,
      activity_place: activity.place,
      activity_title: activity.title,
      tg_favorite: activity.favorite,
    };
    const newUser = {
      firstName: user.name,
      lastName: user.surname,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    createUserAndNewActivity(
      newActivity,
      newUser,
      setAllActiveActvivitiesFB,
      setLoading,
      navigation
    );
  }

  function headerTitle() {
    switch (currentStepIndex) {
      case 0:
        return "Skapa användare";
      case 1:
        return "Koppla aktivitet till användaren";
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>
          {headerTitle()}
          <Text style={styles.pageNumber}>
            {"  "}
            {currentStepIndex + 1}/{steps.length}
          </Text>
        </Text>
      </View>
      {step}
      {loading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  header: {
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h2.fontSize,
    lineHeight: 35,
  },
  pageNumber: {
    fontFamily: typography.b1.fontFamily,
    fontSize: typography.b1.fontSize + 1,
  },
  contentWrapper: {
    marginHorizontal: 16,
  },
});
