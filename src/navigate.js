import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityCardProvider } from "./context/ActivityCardContext";
import { ActivityImagesProvider } from "./context/ActivityImagesContext/ActivityImagesContext";
import { AdminProvider } from "./context/AdminContext";
import { AdminGalleryProvider } from "./context/AdminGalleryContext";
import { CreateActivityProvider } from "./context/CreateActivityContext/CreateActivityContext";
import { SuperAdminProvider } from "./context/SuperAdminContext";
import { SuperAdminHomePageContextProvider } from "./context/SuperAdminHomePageContext";
import { TimeStatisticsProvider } from "./context/TimeStatisticsContext";
import { ActivityCard } from "./screens/ActivityCard";
import { ActivityCardDetails } from "./screens/ActivityCard/ActivityCardDetails";
import { AddOrEditPost } from "./screens/AddOrEditPost";
import { AdminActivityGallery } from "./screens/AdminActivityGallery";
import { AdminPage } from "./screens/AdminPage";
import AllUsersInTheSystem from "./screens/AllUsersInTheSystem";
import { ChangeActivity } from "./screens/ChangeActivity";
import { ChangeUser } from "./screens/ChangeUser";
import { Chat } from "./screens/Chat";
import { ChatCardScreen } from "./screens/Chat/ChatCardScreen";
import ConceptPage from "./screens/ConceptPage";
import { CreateActivity } from "./screens/CreateActivity";
import CreateUser from "./screens/CreateUser";
import DownloadUserData from "./screens/DownloadUserData";
import Faq from "./screens/Faq";
import { HomePage } from "./screens/HomePage";
import { ImagesGallery } from "./screens/ImagesGallery";
import { MyTimePage } from "./screens/MyTimePage";
import { RolesAndConnection } from "./screens/RolesAndConnection";
import { SuperAdminHomePage } from "./screens/SuperAdminHomePage";

const Stack = createNativeStackNavigator();
export const SuperAdminStack = () => {
  return (
    <SafeAreaProvider>
      <ActivityImagesProvider>
        <ActivityCardProvider>
          <AdminGalleryProvider>
            <CreateActivityProvider>
              <TimeStatisticsProvider>
                <SuperAdminProvider>
                  <AdminProvider>
                    <SuperAdminHomePageContextProvider>
                      <NavigationContainer>
                        <Stack.Navigator
                          screenOptions={{
                            headerShown: false,
                          }}
                        >
                          <Stack.Screen name="HomePage" component={HomePage} />
                          <Stack.Screen
                            name="AdminPage"
                            component={AdminPage}
                          />
                          <Stack.Screen
                            name="MyTimePage"
                            component={MyTimePage}
                          />
                          <Stack.Screen
                            name="AdminActivityGallery"
                            component={AdminActivityGallery}
                          />
                          <Stack.Screen
                            name="CreateActivity"
                            component={CreateActivity}
                          />
                          <Stack.Screen
                            name="ActivityCard"
                            component={ActivityCard}
                          />
                          <Stack.Screen
                            name="ImagesGallery"
                            component={ImagesGallery}
                          />
                          <Stack.Screen
                            name="CreateUser"
                            component={CreateUser}
                          />
                          <Stack.Screen
                            name="ChangeUser"
                            component={ChangeUser}
                          />
                          <Stack.Screen name="Faq" component={Faq} />
                          <Stack.Screen
                            name="ConceptPage"
                            component={ConceptPage}
                          />
                          <Stack.Screen
                            name="ChangeActivity"
                            component={ChangeActivity}
                          />
                          <Stack.Screen
                            name="DownloadUserData"
                            component={DownloadUserData}
                          />
                          <Stack.Screen
                            name="AllUsersInTheSystem"
                            component={AllUsersInTheSystem}
                          />
                          <Stack.Screen
                            name="RolesAndConnection"
                            component={RolesAndConnection}
                          />
                          <Stack.Screen
                            name="SuperAdminHomePage"
                            component={SuperAdminHomePage}
                          />
                          <Stack.Screen name="Chat" component={Chat} />
                          <Stack.Screen
                            name="AddOrEditPost"
                            component={AddOrEditPost}
                          />
                          <Stack.Screen
                            name="ChatCardScreen"
                            component={ChatCardScreen}
                          />
                          <Stack.Screen
                            name="ActivityCardDetails"
                            component={ActivityCardDetails}
                          />
                        </Stack.Navigator>
                      </NavigationContainer>
                    </SuperAdminHomePageContextProvider>
                  </AdminProvider>
                </SuperAdminProvider>
              </TimeStatisticsProvider>
            </CreateActivityProvider>
          </AdminGalleryProvider>
        </ActivityCardProvider>
      </ActivityImagesProvider>
    </SafeAreaProvider>
  );
};

export const AdminStack = () => {
  return (
    <SafeAreaProvider>
      <ActivityImagesProvider>
        <ActivityCardProvider>
          <AdminGalleryProvider>
            <CreateActivityProvider>
              <TimeStatisticsProvider>
                <AdminProvider>
                  <NavigationContainer>
                    <Stack.Navigator
                      screenOptions={{
                        headerShown: false,
                      }}
                    >
                      <Stack.Screen name="HomePage" component={HomePage} />
                      <Stack.Screen name="AdminPage" component={AdminPage} />
                      <Stack.Screen name="MyTimePage" component={MyTimePage} />
                      <Stack.Screen
                        name="AdminActivityGallery"
                        component={AdminActivityGallery}
                      />
                      <Stack.Screen
                        name="CreateActivity"
                        component={CreateActivity}
                      />
                      <Stack.Screen
                        name="ActivityCard"
                        component={ActivityCard}
                      />
                      <Stack.Screen
                        name="ImagesGallery"
                        component={ImagesGallery}
                      />
                      <Stack.Screen name="CreateUser" component={CreateUser} />
                      <Stack.Screen name="ChangeUser" component={ChangeUser} />
                      <Stack.Screen name="Faq" component={Faq} />
                      <Stack.Screen
                        name="ConceptPage"
                        component={ConceptPage}
                      />
                      <Stack.Screen
                        name="ChangeActivity"
                        component={ChangeActivity}
                      />
                      <Stack.Screen name="Chat" component={Chat} />
                      <Stack.Screen
                        name="AddOrEditPost"
                        component={AddOrEditPost}
                      />
                      <Stack.Screen
                        name="ChatCardScreen"
                        component={ChatCardScreen}
                      />
                      <Stack.Screen
                        name="ActivityCardDetails"
                        component={ActivityCardDetails}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </AdminProvider>
              </TimeStatisticsProvider>
            </CreateActivityProvider>
          </AdminGalleryProvider>
        </ActivityCardProvider>
      </ActivityImagesProvider>
    </SafeAreaProvider>
  );
};

export const UserStack = () => {
  return (
    <SafeAreaProvider>
      <ActivityImagesProvider>
        <TimeStatisticsProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="HomePage" component={HomePage} />
              <Stack.Screen name="MyTimePage" component={MyTimePage} />
              <Stack.Screen name="ActivityCard" component={ActivityCard} />
              <Stack.Screen name="Faq" component={Faq} />
              <Stack.Screen name="ConceptPage" component={ConceptPage} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="AddOrEditPost" component={AddOrEditPost} />
              <Stack.Screen name="ChatCardScreen" component={ChatCardScreen} />
              <Stack.Screen
                name="ActivityCardDetails"
                component={ActivityCardDetails}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </TimeStatisticsProvider>
      </ActivityImagesProvider>
    </SafeAreaProvider>
  );
};
