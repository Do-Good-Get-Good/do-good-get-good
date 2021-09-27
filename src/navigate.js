import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LandingPage } from "./screens/LandingPage";
import { MyTimePage } from "./screens/MyTimePage";

const Stack = createNativeStackNavigator();
export const Mystack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="MyTimePage" component={MyTimePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
