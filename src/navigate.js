import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage } from './screens/HomePage'
import { MyTimePage } from './screens/MyTimePage'
import { AdminActivityGallery } from './screens/AdminActivityGallery'

const Stack = createNativeStackNavigator()
export const Mystack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="MyTimePage" component={MyTimePage} />
        <Stack.Screen
          name="AdminActivityGallery"
          component={AdminActivityGallery}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
