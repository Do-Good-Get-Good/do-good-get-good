import React, { useContext } from "react";

import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Button,
} from "react-native";

import { SearchBarComponent } from "../components/SearchBarComponent";
import { Overlay } from "react-native-elements";
// import { AdminGalleryProvider } from "../context/AdminGalleryContext";
import { DropDownSmall } from "../components/DropDownSmall";
import { RadioButton } from "../components/RadioButton";
import { Suggestions } from "../components/Suggestions";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";

// import { useRoute } from "@react-navigation/native";

// import UserContext from '../context/UserContext'
// import { Suggestions } from '../components/Suggestions'

export const AdminActivityGallery = ({ navigation }) => {
  const adminGalleryContext = useAdminGalleryFunction();
  const createActivityContext = useCreateActivityFunction();
  console.log("gallery");
  // const loggedInUser = useContext(UserContext)
  console.log(
    "adminGalleryContext.inactiveActivities",
    adminGalleryContext.inactiveActivities
  );

  console.log(
    "adminGalleryContext.activeOrInactiveActivity",
    adminGalleryContext.activeOrInactiveActivity
  );
  console.log("adminGalleryContext.gallery", adminGalleryContext.gallery);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Button title="back" onPress={() => navigation.goBack()}></Button>
          <SearchBarComponent style={styles.searchBar}></SearchBarComponent>

          <View style={styles.containerRadioButtonAndDropDown}>
            <View style={styles.radioButton}>
              <RadioButton></RadioButton>
            </View>

            <View style={styles.dropDown}>
              {/* <Overlay> */}
              <DropDownSmall></DropDownSmall>
              {/* </Overlay> */}
            </View>
          </View>
        </View>
        {/* <AdminGalleryProvider> */}
        <View style={styles.suggestionContainer}>
          <Suggestions
            inactiveActivities={adminGalleryContext.inactiveActivities}
            chooseActive={adminGalleryContext.activeOrInactiveActivity}
            search={adminGalleryContext.showSearchObject}
            adminGallery={createActivityContext.activeActivities}
          ></Suggestions>
        </View>

        {/* </AdminGalleryProvider> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerRadioButtonAndDropDown: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioButton: {
    flex: 1,
  },
  dropDown: {
    flex: 1,
    margin: 5,
    marginRight: 15,

    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  suggestionContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
});
