import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./screens/HomePage";
import { MyTimePage } from "./screens/MyTimePage";
import { AdminActivityGallery } from "./screens/AdminActivityGallery";
import { CreateActivity } from "./screens/CreateActivity";
import { ActivityCard } from "./screens/ActivityCard";
import { ImagesGallery } from "./screens/ImagesGallery";
import CreateUser from "./screens/CreateUser";
import { ChangeUser } from "./screens/ChangeUser";
import { ChangeActivity } from "./screens/ChangeActivity";
import AllUsersInTheSystem from "./screens/AllUsersInTheSystem";
import { RolesAndConnection } from "./screens/RolesAndConnection";
import { SuperAdminHomePageContextProvider } from "./context/SuperAdminHomePageContext";
import { AdminProvider } from "./context/AdminContext";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { SuperAdminHomePage } from "./screens/SuperAdminHomePage";
import { SuperAdminProvider } from "./context/SuperAdminContext";
import { AdminGalleryProvider } from "./context/AdminGalleryContext";
import { ActivityCardProvider } from "./context/ActivityCardContext";
import { CreateActivityProvider } from "./context/CreateActivityContext/CreateActivityContext";
import { TimeStatisticsProvider } from "./context/TimeStatisticsContext";
import { ActivityImagesProvider } from "./context/ActivityImagesContext/ActivityImagesContext";
import Faq from "./screens/Faq";
import ConceptPage from "./screens/ConceptPage";
import DownloadUserData from "./screens/DownloadUserData";
import { AdminPage } from "./screens/AdminPage";
import { Chat } from "./screens/Chat";
import { AddOrEditPost } from "./screens/AddOrEditPost";
import { ChatCardScreen } from "./screens/Chat/ChatCardScreen";
import { ActivityCardDetails } from "./screens/ActivityCard/ActivityCardDetails";

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
              <Stack.Screen name=" AddOrEditPost" component={AddOrEditPost} />
              <Stack.Screen name="ActivityCardDetails"component={ActivityCardDetails}/>
            </Stack.Navigator>
          </NavigationContainer>
        </TimeStatisticsProvider>
      </ActivityImagesProvider>
    </SafeAreaProvider>
  );
};
