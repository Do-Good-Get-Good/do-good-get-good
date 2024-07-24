import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { useSaveTokenToDatabase } from "./useSaveTokenToDatabase";

const iosPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    return { RESULTS: { GRANTE: "granted" } };
  } else {
    console.log("Authorization status:", authStatus);
  }
};

const permission =
  Platform.OS === "android"
    ? check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    : iosPermission();

// const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;

export const useNotificationPermission = () => {
  const { getAndRefreshToken } = useSaveTokenToDatabase();

  const requestUserPermission = async () => {
    const result = await permission;

    if (result === RESULTS.GRANTED) {
      await getAndRefreshToken();
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);
};
