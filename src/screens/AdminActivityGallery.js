import React, { useEffect, useState } from "react";

import { Text, StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

import RadioButton from "../components/RadioButton";
import Suggestions from "../components/Suggestions";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext";
import { useActivityCardContext } from "../context/ActivityCardContext";
import Menu from "../components/Menu";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Text style={styles.headerText}>Aktivitetsgalleri</Text>
        <View
          style={{
            backgroundColor: colors.background,
            height: 50,
            justifyContent: "center",
            paddingLeft: 10,
            marginBottom: 16,
          }}
        >
          <Text>Searchbar</Text>
        </View>
        <View style={styles.radioButtonDropdownView}>
          <RadioButton style={styles.radioButtonContainer} />
          <View style={styles.dropDown}>
            <Text style={{ ...typography.b1 }}>Sorting</Text>
          </View>
        </View>
        <Suggestions
          navigation={navigation}
          inactiveActivities={inactiveActivities}
          chooseActive={adminGalleryContext.activeOrInactiveActivity}
          search={adminGalleryContext.showSearchObject}
          adminGallery={arrayOfActiveActivities}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AdminActivityGallery;

const styles = StyleSheet.create({
  headerText: {
    ...typography.h2,
    marginTop: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
  },
  radioButtonDropdownView: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  radioButtonContainer: {
    flex: 1.6,
    flexDirection: "row",
    alignItems: "center",
  },
  dropDown: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
});
