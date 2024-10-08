import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import BottomLogo from "../components/BottomLogo";
import DropDownForSorting from "../components/DropDownForSorting";
import Menu from "../components/Menu";
import RadioButton from "../components/RadioButton";
import SearchBarComponentOld from "../components/SearchBarComponentOld";
import Suggestions from "../components/Suggestions";
import { useActivityCardContext } from "../context/ActivityCardContext";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useCreateActivityFunction } from "../context/CreateActivityContext/CreateActivityContext";

export function AdminActivityGallery({ navigation }) {
  const adminGalleryContext = useAdminGalleryFunction();
  const createActivityContext = useCreateActivityFunction();
  const activityCardContext = useActivityCardContext();

  const [arrayOfActiveActivities, setArrayOfActiveActivities] = useState([]);
  const [inactiveActivities, setInactiveActivities] = useState([]);
  const [selectedOptionForSorting, setSelectedOptionForSorting] =
    useState(null);

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
            createActivityContext.setAllActiveActvivitiesFB((prev) => [
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
            adminGalleryContext.setInactiveActivitiesGallery((prev) => [
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
      adminGalleryContext.setSearchWordHasNoMatch(false);
    }
    if (createActivityContext.showSearchObject.length != 0) {
      setArrayOfActiveActivities(createActivityContext.showSearchObject);
    } else {
      setArrayOfActiveActivities(createActivityContext.activeActivities);
      createActivityContext.setSearchWordHasNoMatch(false);
    }
  }, [
    adminGalleryContext.showSearchObject,
    createActivityContext.showSearchObject,
  ]);

  useEffect(() => {
    if (createActivityContext.searchWordHasNoMatch) {
      setArrayOfActiveActivities([]);
    } else if (adminGalleryContext.searchWordHasNoMatch) {
      setInactiveActivities([]);
    }
  }, [
    createActivityContext.searchWordHasNoMatch,
    adminGalleryContext.searchWordHasNoMatch,
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        keyboardDismissMode={"on-drag"}
        style={{ paddingHorizontal: 16 }}
      >
        <Text style={styles.headerText}>Aktivitetsgalleri</Text>
        <SearchBarComponentOld />
        <View style={styles.radioButtonDropdownView}>
          <RadioButton style={styles.radioButtonContainer} />
          <View>
            <DropDownForSorting
              choice={(selectedOptionForSorting) =>
                setSelectedOptionForSorting(selectedOptionForSorting)
              }
            />
          </View>
        </View>
        <Suggestions
          choiceFromDropDown={selectedOptionForSorting}
          navigation={navigation}
          inactiveActivities={inactiveActivities}
          adminGallery={arrayOfActiveActivities}
        />
        <BottomLogo />
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
    zIndex: 1,
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
