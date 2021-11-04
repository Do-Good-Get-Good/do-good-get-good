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
import { CreateUserProvider } from "./context/CreateUserContext";

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
      <CreateUserProvider>
        <ActivityCardProvider>
          <AdminGalleryProvider>
            <CreateActivityProvider>
              <AdminProvider>
                <ActivityProvider>
                  <Mystack />
                </ActivityProvider>
              </AdminProvider>
            </CreateActivityProvider>
          </AdminGalleryProvider>
        </ActivityCardProvider>
      </CreateUserProvider>
    </SafeAreaProvider>
  );
}
