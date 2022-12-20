import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import UserForm from "../components/UserForm";

import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useUserLevelCheckFunction } from "../context/UserLevelContext";
import { useAdminHomePageFunction } from "../context/AdminHomePageContext";

import { useMultistepPage } from "../hooks/useMultistepPage";

import typography from "../assets/theme/typography";
import CreateActivity from "../components/CreateActivity";

const CreateUser = ({ route, navigation }) => {
  const userLevel = useUserLevelCheckFunction();
  const createActivityContext = useCreateActivityFunction();

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
    title: null,
    place: null,
    city: null,
    description: null,
    favorite: false,
    image: null,
  });
  const [selectedActivity, setSelectedActivity] = useState(null);
  const setUserData = useAdminHomePageFunction().setUserData;

  const { step, steps, currentStepIndex, next, back } = useMultistepPage([
    <UserForm
      userLevel={userLevel}
      user={user}
      setUser={setUser}
      nextPage={handleNextPage}
    />,
    <CreateActivity
      activity={activity}
      setActivity={setActivity}
      selectedActivity={selectedActivity}
      setSelectedActivity={setSelectedActivity}
      goBack={handleGoBack}
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

  function createUserAndNewActivity() {
    if (
      title != " " &&
      city != " " &&
      place != " " &&
      title.trim() &&
      city.trim() &&
      place.trim()
    ) {
      let newActivityAndUser = {
        active_status: true,
        activity_city: city,
        activity_description: description,
        activity_photo: selectedImage,
        activity_place: place,
        activity_title: title,
        tg_favorite: checkBoxPressed,
        newUserInfo: {
          firstName: user.name,
          lastName: user.surname,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      };
      createActivityContext.createNewActivityAndUser(newActivityAndUser);
    }
  }

  async function createUserAndLinkSelectedActivity() {
    var createUser = functions().httpsCallable("createUser");
    try {
      let res = await createUser({
        firstName: user.name,
        lastName: user.surname,
        email: user.email,
        password: user.password,
        role: user.role,
        activityId: selectedActivity.id,
      });

      let newUser = res.data.createdUser;
      console.log(res);

      // Save new user locally
      setUserData((prev) => [...prev, newUser]);

      setLoading(false);

      alertUser(
        `Användaren '${newUser.first_name} ${newUser.last_name}' har skapats!`
      );
    } catch (error) {
      let message = "Error";
      setLoading(false);
      if (error === "auth/email-already-exists") {
        message = `Användaren '${email}' kunde inte skapas, en användare med den adressen finns redan`;
      } else {
        message = `Kunde inte skapa användare med epost '${email}', error '${error.message}'`;
      }
      alertUser(message);
    } finally {
    }
  }

  function alertUser(message) {
    Alert.alert("Skapa användare", message, [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("AdminPage");
        },
      },
    ]);
  }

  function alertPopUp(onlyActivityCreated, newUser) {
    let alertTitle = "";
    let alertMessage = "";

    if (onlyActivityCreated) {
      alertTitle = "Skapa aktivitet";
      alertMessage = `Aktiviteten '${title}' har skapats!`;
    } else {
      alertTitle = "Skapa aktivitet och användare";
      alertMessage = `Aktiviteten '${title}' och användaren '${newUser.first_name} ${newUser.last_name}' har skapats!`;
    }

    Alert.alert(alertTitle, alertMessage, [
      {
        text: "OK",
        onPress: () => {
          setTitle("");
          setPlace("");
          setCity("");
          setDescription("");
          setCheckBoxPressed(false);
          navigation.navigate("HomePage");
        },
      },
    ]);
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
