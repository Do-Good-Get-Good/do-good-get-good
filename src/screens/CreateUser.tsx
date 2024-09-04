import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import typography from "../assets/theme/typography";
import { createUserAndLinkSelectedActivity } from "../cloud_functions/createUserAndLinkSelectedActivity";
import { createUserAndNewActivity } from "../cloud_functions/createUserAndNewActivity";
import { CreateUserForm } from "../components";
import LinkActivityToNewUser from "../components/LinkActivityToNewUser";
import LoadingOverlay from "../components/LoadingOverlay";
import Menu from "../components/Menu";
import { useAdminContext } from "../context/AdminContext/useAdminContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext/CreateActivityContext";
import { useMultistepPage } from "../hooks/useMultistepPage";
import { Role } from "../utility/enums";
import { Activity } from "../utility/types";

export type UserNewAccount = {
  name: string;
  surname: string;
  email: string;
  confirmEmail?: string;
  password: string;
  role: Role | "Behörighet";
};

type Props = {
  route: any;
  navigation: any;
};

const generateRandomPassword = () => Math.random().toString(36).slice(-8);

const CreateUser = ({ route, navigation }: Props) => {
  const { setAllActiveActvivitiesFB, activeActivities } =
    useCreateActivityFunction();
  const { onShowUnApprovedTimeEntriesAdminPage } = useAdminContext();
  const [loading, setLoading] = useState(false);

  // Step 1
  const [user, setUser] = useState<UserNewAccount>({
    name: "",
    surname: "",
    email: "",
    password: generateRandomPassword(),
    role: Role.user,
  });

  // Step 2
  const [activity, setActivity] = useState({
    title: "",
    place: "",
    city: "",
    description: "",
    favorite: false,
    photo: "",
    imageUrl: "",
  });

  const [selectedActivity, setSelectedActivity] = useState<
    null | Activity | "create-new"
  >(null);

  const { step, steps, currentStepIndex, next, back } = useMultistepPage([
    <CreateUserForm user={user} setUser={setUser} nextPage={() => next()} />,
    <LinkActivityToNewUser
      activity={activity}
      setActivity={setActivity}
      selectedActivity={selectedActivity}
      setSelectedActivity={setSelectedActivity}
      goBack={() => back()}
      createUserAndNewActivity={handleCreateUserAndNewActivity}
      createUserAndLinkSelectedActivity={handleCreateUser}
    />,
  ]);

  useEffect(() => {
    if (!route.params?.image) {
      setActivity({ ...activity, photo: "placeholder" });
    } else {
      setActivity({
        ...activity,
        photo: route.params?.image.photo,
        imageUrl: route.params?.image.imageUrl,
      });
    }
  }, [route.params?.image.photo, route.params?.image.imageUrl]);

  async function handleCreateUser() {
    if (
      selectedActivity !== null &&
      selectedActivity !== "create-new" &&
      "id" in selectedActivity
    ) {
      await createUserAndLinkSelectedActivity(
        user,
        selectedActivity.id,
        setLoading,
        navigation
      );
      await onShowUnApprovedTimeEntriesAdminPage();
    }
  }
  async function handleCreateUserAndNewActivity() {
    const newActivity = {
      active_status: true,
      activity_city: activity.city,
      activity_description: activity.description,
      activity_photo: activity.photo,
      image_url: activity.imageUrl,
      activity_place: activity.place,
      activity_title: activity.title,
      tg_favorite: activity.favorite,
    };

    const newUser = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    setLoading(true);
    await createUserAndNewActivity(
      newActivity,
      newUser,
      activeActivities,
      setAllActiveActvivitiesFB,
      navigation
    );
    setLoading(false);
    await onShowUnApprovedTimeEntriesAdminPage();
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
