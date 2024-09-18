/**
 * @format
 */

import messaging from "@react-native-firebase/messaging";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { UserLevelProvider } from "./context/useUserLevel";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

// https://rnfirebase.io/messaging/usage#background-application-state
// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return (
    <UserLevelProvider>
      <App />
    </UserLevelProvider>
  );
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
