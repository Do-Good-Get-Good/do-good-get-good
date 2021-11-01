import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./screens/HomePage";
import { MyTimePage } from "./screens/MyTimePage";
import { AdminActivityGallery } from "./screens/AdminActivityGallery";
import { CreateActivity } from "./screens/CreateActivity";
import { ImagesGallery } from "./screens/ImagesGallery";

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
        <Stack.Screen name="ImagesGallery" component={ImagesGallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
