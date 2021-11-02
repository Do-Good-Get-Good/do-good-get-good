import React, { useContext, useEffect, useState } from "react";

import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Button,
} from "react-native";

// import { SearchBarComponent } from "../components/SearchBarComponent";

// import { DropDownSmall } from "../components/DropDownSmall";
import { RadioButton } from "../components/RadioButton";
import { Suggestions } from "../components/Suggestions";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useActivityCardContext } from "../context/ActivityCardContext";

export const AdminActivityGallery = ({ navigation }) => {
  const adminGalleryContext = useAdminGalleryFunction();
  const createActivityContext = useCreateActivityFunction();
  const activityCardContext = useActivityCardContext();

  const [arrayOfActiveActivities, setArrayOfActiveActivities] = useState([]);
  const [inactiveActivities, setInactiveActivities] = useState([]);

  useEffect(() => {
    setArrayOfActiveActivities(createActivityContext.activeActivities);
    setInactiveActivities(adminGalleryContext.inactiveActivities);
  }, [
    adminGalleryContext.inactiveActivities,
    createActivityContext.activeActivities,
  ]);

  useEffect(() => {
    if (activityCardContext.active === true) {
      const addAndDeleteObjectInArrayAfterStatusActiveChanged = () => {
        if (
          createActivityContext.changedActivity.active === true &&
          createActivityContext.changedActivity.id != ""
        ) {
          var indexInActive = arrayOfActiveActivities.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (
            indexInActive === -1 &&
            createActivityContext.changedActivity.id != ""
          ) {
            setArrayOfActiveActivities((prev) => [
              ...prev,
              createActivityContext.changedActivity,
            ]);
          }

          var indexInactive = inactiveActivities.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (indexInactive != -1) {
            inactiveActivities.splice(indexInactive, 1);
          }
          console.log(
            "IN IF ACTIVITY === TRUE",
            "indexInActive ",
            indexInActive,
            "indexInactive ",
            indexInactive
          );
          activityCardContext.changeActiveStatusInAdminGallery(false);
        } else if (
          createActivityContext.changedActivity.active === false &&
          createActivityContext.changedActivity.id != ""
        ) {
          var indexInActive = inactiveActivities.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (
            indexInActive === -1 &&
            createActivityContext.changedActivity.id != ""
          ) {
            setInactiveActivities((prev) => [
              ...prev,
              createActivityContext.changedActivity,
            ]);
          }

          var indexActive = arrayOfActiveActivities.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (indexActive != -1) {
            arrayOfActiveActivities.splice(indexActive, 1);
          }
        }
        activityCardContext.changeActiveStatusInAdminGallery(false);
      };
      console.log(
        "activityCardContext.changeActive ADMIN GALLERY",
        activityCardContext.active,
        "createActivityContext.changedActivity",
        createActivityContext.changedActivity
      );

      addAndDeleteObjectInArrayAfterStatusActiveChanged();
    }
  }, [activityCardContext.active]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Button title="back" onPress={() => navigation.goBack()}></Button>
          {/* <SearchBarComponent style={styles.searchBar}></SearchBarComponent> */}

          <View style={styles.containerRadioButtonAndDropDown}>
            <View style={styles.radioButton}>
              <RadioButton></RadioButton>
            </View>

            <View style={styles.dropDown}>
              {/* <DropDownSmall></DropDownSmall> */}
            </View>
          </View>
        </View>

        <View style={styles.suggestionContainer}>
          <Suggestions
            navigation={navigation}
            inactiveActivities={inactiveActivities}
            chooseActive={adminGalleryContext.activeOrInactiveActivity}
            search={adminGalleryContext.showSearchObject}
            adminGallery={arrayOfActiveActivities}
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
