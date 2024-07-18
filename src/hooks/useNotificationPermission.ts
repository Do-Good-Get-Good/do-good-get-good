import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { PermissionsAndroid } from "react-native";

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
};

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export const useNotificationPermission = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);
};
