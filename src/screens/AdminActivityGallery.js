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

import RadioButton from "../components/RadioButton";
import Suggestions from "../components/Suggestions";
import SearchBarComponent from "../components/SearchBarComponent";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useActivityCardContext } from "../context/ActivityCardContext";
import Menu from "../components/Menu";

export function AdminActivityGallery({ navigation }) {
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
    if (
      activityCardContext.active === true ||
      activityCardContext.popular === true
    ) {
      createActivityContext.activityHasChanged(true);

      activityCardContext.changePopularStatusInAdminGallery(false);
      activityCardContext.changeActiveStatusInAdminGallery(false);
    }
  }, [activityCardContext.active, activityCardContext.popular]);

  useEffect(() => {
    if (createActivityContext.updateGallery === true) {
      const addAndDeleteObjectInArrayAfterStatusActiveChanged = () => {
        if (
          createActivityContext.changedActivity.active === true &&
          createActivityContext.changedActivity.id != ""
        ) {
          var indexActive = arrayOfActiveActivities.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (
            indexActive === -1 &&
            createActivityContext.changedActivity.id != ""
          ) {
            setArrayOfActiveActivities((prev) => [
              ...prev,
              createActivityContext.changedActivity,
            ]);
          }

          var arrayInactive = inactiveActivities;

          var indexInactive = arrayInactive.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (indexInactive != -1) {
            arrayInactive.splice(indexInactive, 1);
            setInactiveActivities(arrayInactive);
          }

          createActivityContext.activityHasChanged(false);
          createActivityContext.setUpdateGallery(false);
        } else if (
          createActivityContext.changedActivity.active === false &&
          createActivityContext.changedActivity.id != ""
        ) {
          var indexInactive2 = inactiveActivities.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (
            indexInactive2 === -1 &&
            createActivityContext.changedActivity.id != ""
          ) {
            setInactiveActivities((prev) => [
              ...prev,
              createActivityContext.changedActivity,
            ]);
          }

          var arrayStatusActive = arrayOfActiveActivities;
          var indexOfActiveActivities = arrayStatusActive.findIndex(
            (x) => x.id === createActivityContext.changedActivity.id
          );

          if (indexOfActiveActivities != -1) {
            arrayStatusActive.splice(indexOfActiveActivities, 1);
            setArrayOfActiveActivities(arrayStatusActive);
          }
          createActivityContext.activityHasChanged(false);
          createActivityContext.setUpdateGallery(false);
        }
      };

      addAndDeleteObjectInArrayAfterStatusActiveChanged();
    }
  }, [createActivityContext.updateGallery]);

  useEffect(() => {
    if (adminGalleryContext.showSearchObject.length != 0) {
      setInactiveActivities(adminGalleryContext.showSearchObject);
    } else {
      setInactiveActivities(adminGalleryContext.inactiveActivities);
    }
    if (createActivityContext.showSearchObject.length != 0) {
      setArrayOfActiveActivities(createActivityContext.showSearchObject);
    } else {
      setArrayOfActiveActivities(createActivityContext.activeActivities);
    }
  }, [
    adminGalleryContext.showSearchObject,
    createActivityContext.showSearchObject,
  ]);

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <SearchBarComponent />
          <View style={styles.containerRadioButtonAndDropDown}>
            <View style={styles.radioButton}>
              <RadioButton />
            </View>

            <View style={styles.dropDown}></View>
          </View>
        </View>

        <View style={styles.suggestionContainer}>
          <Suggestions
            navigation={navigation}
            inactiveActivities={inactiveActivities}
            adminGallery={arrayOfActiveActivities}
          ></Suggestions>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AdminActivityGallery;

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
