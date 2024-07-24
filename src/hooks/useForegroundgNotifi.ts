import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { AlertInfo } from "../components/Alerts/AlertInfo";

export const useForegroundgNotifi = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const notificationBody = remoteMessage?.notification?.body;
      const notificationTitle = remoteMessage?.notification?.title;
      notificationBody &&
        AlertInfo(
          notificationBody,
          undefined,
          notificationTitle && notificationTitle,
        );
    });

    return unsubscribe;
  }, []);
};
