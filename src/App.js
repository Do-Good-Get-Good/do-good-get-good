import React, { useState, useEffect } from "react";
import { Mystack } from "./navigate";
import auth from "@react-native-firebase/auth";
import Login from "./components/Login";
import { AdminGalleryProvider } from "./context/AdminGalleryContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityProvider } from "./context/ActivityContext";
import { CreateActivityProvider } from "./context/CreateActivityContext";
import { ActivityCardProvider } from "./context/ActivityCardContext";
import { AdminProvider } from "./context/AdminContext";
import { ChangeUserInfoProvider } from "./context/ChangeUserInfoContext";
import { AdminHomePageProvider } from "./context/AdminHomePageContext";

export default function App() {
  // Set an initializing state whilst Firebase connects

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <Login />;
  }

  return (
    <SafeAreaProvider>
      <ChangeUserInfoProvider>
        <ActivityCardProvider>
          <AdminGalleryProvider>
            <CreateActivityProvider>
              <AdminProvider>
                <ActivityProvider>
                  <AdminHomePageProvider>
                    <Mystack />
                  </AdminHomePageProvider>
                </ActivityProvider>
              </AdminProvider>
            </CreateActivityProvider>
          </AdminGalleryProvider>
        </ActivityCardProvider>
      </ChangeUserInfoProvider>
    </SafeAreaProvider>
  );
}
