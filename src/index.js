/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { UserLevelProvider } from "./context/useUserLevel";

AppRegistry.registerComponent(appName, () => () => (
  <UserLevelProvider>
    <App />
  </UserLevelProvider>
));
