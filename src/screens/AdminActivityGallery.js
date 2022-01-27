import React, { useContext, useEffect, useState } from "react";

import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Button,
  Platform,
} from "react-native";

import { RadioButton } from "../components/RadioButton";
import { Suggestions } from "../components/Suggestions";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useActivityCardContext } from "../context/ActivityCardContext";
import Menu from "../components/Menu";

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

          let arrayInactive = inactiveActivities;

          var indexInactive = arrayInactive.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (indexInactive != -1) {
            arrayInactive.splice(indexInactive, 1);
            setInactiveActivities(arrayInactive);
          }

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

          let arrayActive = arrayOfActiveActivities;

          var indexActive = arrayActive.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (indexActive != -1) {
            arrayActive.splice(indexActive, 1);
            setArrayOfActiveActivities(arrayActive);
          }
        }
        activityCardContext.changeActiveStatusInAdminGallery(false);
      };

      addAndDeleteObjectInArrayAfterStatusActiveChanged();
    }
  }, [activityCardContext.active]);

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerRadioButtonAndDropDown}>
            <View style={styles.radioButton}>
              <RadioButton></RadioButton>
            </View>

            <View style={styles.dropDown}></View>
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
