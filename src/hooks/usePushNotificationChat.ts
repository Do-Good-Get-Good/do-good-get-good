import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Linking, ActivityIndicator } from "react-native";
import { PermissionsAndroid } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const NAVIGATION_IDS = ["chat", "chatCard"];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn("Unverified navigationId", navigationId);
    return null;
  }
  if (navigationId === "chat") {
    return "myapp://chat";
  }
  const postId = data?.postId;
  if (typeof postId === "string") {
    return `myapp://chatCard/${postId}`;
  }
  console.warn("Missing postId");
  return null;
}

const linking = {
  prefixes: ["myapp://"],
  config: {
    initialRouteName: "Chat",
    screens: {
      Home: "chat",
      Post: "chatCard/:id",
    },
  },

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === "string") {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === "string") {
      return deeplinkURL;
    }
  },

  async subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener("url", onReceiveURL);
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token, "----- token");

    const foreground = messaging().onMessage(async (remoteMessage) => {
      console.log(" A new FCM message arrived", remoteMessage);
    });
    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === "string") {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
      foreground();
    };
  },
};

const requestUserPermission = async () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    const tocken = await messaging().getToken();
    console.log(tocken, " --------tocken");
  }
};

export const usePushNotificationChat = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  {
    return { linking };
  }
};
