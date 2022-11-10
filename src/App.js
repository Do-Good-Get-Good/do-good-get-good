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
import { SuperAdminProvider } from "./context/SuperAdminContext";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import typography from "./assets/theme/typography";

export default function App() {
  // Set an initializing state whilst Firebase connects

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userClaims, setUserClaims] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      user
        .getIdTokenResult()
        .then((res) => {
          setUserClaims(res.claims);
        })
        .catch((error) => console.log(error));
    }
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

  if (!userClaims) {
    return <Login />;
  }

  if (userClaims.superadmin) {
    // Render superadmin content
    return (
      <SafeAreaProvider>
        <ChangeUserInfoProvider>
          <ActivityCardProvider>
            <AdminGalleryProvider>
              <CreateActivityProvider>
                <AdminProvider>
                  <ActivityProvider>
                    <SuperAdminProvider>
                      <AdminHomePageProvider>
                        <Mystack />
                      </AdminHomePageProvider>
                    </SuperAdminProvider>
                  </ActivityProvider>
                </AdminProvider>
              </CreateActivityProvider>
            </AdminGalleryProvider>
          </ActivityCardProvider>
        </ChangeUserInfoProvider>
      </SafeAreaProvider>
    );
  } else if (userClaims.admin) {
    // Render admin content
  } else if (userClaims.user) {
    return (
      <SafeAreaProvider>
        <ChangeUserInfoProvider>
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
        </ChangeUserInfoProvider>
      </SafeAreaProvider>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Text>
            Något är fel med din användare, kontakta dggg@technogarden.se
          </Text>
          <TouchableOpacity
            style={{
              height: 50,
              width: "100%",
              backgroundColor: "green",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={() => auth().signOut()}
          >
            <Text style={{ color: "#FFFFFF", ...typography.button.lg }}>
              Logga ut
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
