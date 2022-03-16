import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./screens/HomePage";
import { MyTimePage } from "./screens/MyTimePage";
import { AdminActivityGallery } from "./screens/AdminActivityGallery";
import { CreateActivity } from "./screens/CreateActivity";
import { ActivityCard } from "./screens/ActivityCard";
import { ImagesGallery } from "./screens/ImagesGallery";
import { CreateOrChangeUser } from "./screens/CreateOrChangeUser";
import { ChangeActivity } from "./screens/ChangeActivity";

import Faq from "./screens/Faq";

const Stack = createNativeStackNavigator();
export const Mystack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="MyTimePage" component={MyTimePage} />
        <Stack.Screen
          name="AdminActivityGallery"
          component={AdminActivityGallery}
        />
        <Stack.Screen name="CreateActivity" component={CreateActivity} />
        <Stack.Screen name="ActivityCard" component={ActivityCard} />
        <Stack.Screen name="ImagesGallery" component={ImagesGallery} />
        <Stack.Screen
          name="CreateOrChangeUser"
          component={CreateOrChangeUser}
        />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="ChangeActivity" component={ChangeActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
