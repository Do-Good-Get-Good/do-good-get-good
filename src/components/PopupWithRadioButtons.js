import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import typography from '../assets/theme/typography';
import colors from '../assets/theme/colors';
import {useSuperAdminFunction} from '../context/SuperAdminContext';

export function PopupWithRadioButtons({
  titleText,
  showPopup,
  arrayWithChangedAdmin,
  listOfRoles,
}) {
  const superAdminContext = useSuperAdminFunction();
  const [connectedAdminID, setConnectedAdminID] = useState({
    adminName: '',
    adminId: '',
  });
  const [allAdminsAnsSuperAdmin, setAllAdminsAnsSuperAdmin] = useState(
    superAdminContext.allAdminsAnsSuperAdmins,
  );

  const [selectedUserHasRole, setSelectedUserHasRole] = useState({});

  const [showRole, setShowRole] = useState(false);

  useEffect(() => {
    if (listOfRoles != undefined && listOfRoles.length != 0) {
      setSelectedUserHasRole(superAdminContext.makeChangesForSelectedUser);
      setShowRole(true);
    }
  }, [listOfRoles, superAdminContext.makeChangesForSelectedUser]);

  function textToShowIfRole(role) {
    var text = '';
    if (role === 'user') {
      text = 'User';
    } else if (role === 'admin') {
      text = 'Admin';
    } else if (role === 'superadmin') {
      text = 'Super admin';
    }
    return text;
  }

  useEffect(() => {
    if (
      superAdminContext.userIDToConnectAnotherAdmin != '' &&
      superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin.length
    ) {
      var indexOfUserWhosedminIDNeedsToBeChange =
        superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin.findIndex(
          x => x.user.docId === superAdminContext.userIDToConnectAnotherAdmin,
        );
      setConnectedAdminID({
        adminName:
          superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin[
            indexOfUserWhosedminIDNeedsToBeChange
          ].user.adminName,
        adminId:
          superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin[
            indexOfUserWhosedminIDNeedsToBeChange
          ].user.adminId,
      });
    }
  }, [superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin]);

  useEffect(() => {
    setAllAdminsAnsSuperAdmin(superAdminContext.allAdminsAnsSuperAdmins);
  }, [superAdminContext.allAdminsAnsSuperAdmins]);

  function changeConnectedAdminWithPressingOkButton() {
    let changeAdminObject =
      superAdminContext.makeChangesForSelectedUser.arrayOfUsersIfAdmin;

    var indexOfUserWhosedminIDNeedsToBeChange = changeAdminObject.findIndex(
      x => x.user.docId === superAdminContext.userIDToConnectAnotherAdmin,
    );

    let tempObjectOfUserThatConnectedToAdmin = {
      adminName: connectedAdminID.adminName,
      selectedForDropDown:
        changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange]
          .selectedForDropDown,
      user: {
        activitiesAndAccumulatedTime:
          changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user
            .activitiesAndAccumulatedTime,
        adminId: connectedAdminID.adminId,
        connectedActivities:
          changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user
            .connectedActivities,
        docId:
          changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user.docId,
        firstName:
          changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user
            .firstName,
        lastName:
          changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user
            .lastName,
        role: changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user
          .role,
        statusActive:
          changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user
            .statusActive,
        totalConfirmedHours:
          changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user
            .totalConfirmedHours,
        totalHoursMonth:
          changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user
            .totalHoursMonth,
        totalHoursYear:
          changeAdminObject[indexOfUserWhosedminIDNeedsToBeChange].user
            .totalHoursYear,
      },
    };

    changeAdminObject.splice(
      indexOfUserWhosedminIDNeedsToBeChange,
      1,
      tempObjectOfUserThatConnectedToAdmin,
    );

    let allSelectedUser = {
      user: superAdminContext.makeChangesForSelectedUser.user,
      adminName: superAdminContext.makeChangesForSelectedUser.adminName,
      arrayOfUsersIfAdmin: changeAdminObject,
    };

    superAdminContext.setMakeChangesForSelectedUser(allSelectedUser);

    var index = superAdminContext.arrayOfIdOfChangedUserInfo.findIndex(
      x => x === tempObjectOfUserThatConnectedToAdmin.user.docId,
    );
    if (index === -1) {
      superAdminContext.setArrayOfIdOfChangedUserInfo(prev => [
        ...prev,
        tempObjectOfUserThatConnectedToAdmin.user.docId,
      ]);
    }

    arrayWithChangedAdmin(changeAdminObject);

    showPopup(false);
  }

  function changeRoleWithPressingOkButton() {
    superAdminContext.setMakeChangesForSelectedUser(selectedUserHasRole);
    var index = superAdminContext.arrayOfIdOfChangedUserInfo.findIndex(
      x => x === selectedUserHasRole.user.docId,
    );
    if (index === -1) {
      superAdminContext.setArrayOfIdOfChangedUserInfo(prev => [
        ...prev,
        selectedUserHasRole.user.docId,
      ]);
    }

    showPopup(false);
    setShowRole(false);
  }

  function changeRoleOfTheSelectedUser(userRole) {
    if (
      (userRole === 'user' &&
        selectedUserHasRole.arrayOfUsersIfAdmin.length === 0) ||
      userRole === 'admin' ||
      userRole === 'superadmin'
    ) {
      let tempObject = {
        adminName: selectedUserHasRole.adminName,
        arrayOfUsersIfAdmin: selectedUserHasRole.arrayOfUsersIfAdmin,
        user: {
          activitiesAndAccumulatedTime:
            selectedUserHasRole.user.activitiesAndAccumulatedTime,
          adminId: selectedUserHasRole.user.adminId,
          connectedActivities: selectedUserHasRole.user.connectedActivities,
          docId: selectedUserHasRole.user.docId,
          firstName: selectedUserHasRole.user.firstName,
          lastName: selectedUserHasRole.user.lastName,
          role: userRole,
          statusActive: selectedUserHasRole.user.statusActive,
          totalConfirmedHours: selectedUserHasRole.user.totalConfirmedHours,
          totalHoursMonth: selectedUserHasRole.user.totalHoursMonth,
          totalHoursYear: selectedUserHasRole.user.totalHoursYear,
        },
      };
      setSelectedUserHasRole(tempObject);
    }
  }

  function ifChangeRole() {
    return (
      <View style={{backgroundColor: colors.background}}>
        {listOfRoles.map((role, index) => (
          <View style={styles.containerTextAndRadioButtins} key={index}>
            <Text>{textToShowIfRole(role)}</Text>
            <TouchableOpacity
              onPress={() => changeRoleOfTheSelectedUser(role)}
              style={styles.radioButtons}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  backgroundColor:
                    role === selectedUserHasRole.user.role
                      ? colors.primary
                      : colors.background,
                  borderColor: colors.dark,
                  borderWidth: 1,
                }}>
                {role === selectedUserHasRole.user.role ? (
                  <View style={styles.smallCircul}></View>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  function ifChangeAdmin() {
    return (
      <View style={{backgroundColor: colors.background}}>
        {allAdminsAnsSuperAdmin.map((user, index) => (
          <View style={styles.containerTextAndRadioButtins} key={user.docId}>
            <Text>{user.firstName + ' ' + user.lastName}</Text>
            <TouchableOpacity
              onPress={() =>
                user.docId != superAdminContext.userIDToConnectAnotherAdmin &&
                setConnectedAdminID({
                  adminName: user.firstName + ' ' + user.lastName,
                  adminId: user.docId,
                })
              }
              style={styles.radioButtons}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  backgroundColor:
                    user.docId === connectedAdminID.adminId
                      ? colors.primary
                      : colors.background,
                  borderColor: colors.dark,
                  borderWidth: 1,
                }}>
                {user.docId === connectedAdminID.adminId ? (
                  <View style={styles.smallCircul}></View>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text style={styles.textTitle}>{titleText}</Text>
        {showRole ? ifChangeRole() : ifChangeAdmin()}
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          showRole
            ? changeRoleWithPressingOkButton()
            : changeConnectedAdminWithPressingOkButton()
        }
        style={styles.okButton}>
        <Text
          style={{textAlign: 'center', fontWeight: '500', ...typography.lg}}>
          Ok
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default PopupWithRadioButtons;

const styles = StyleSheet.create({
  containerTextAndRadioButtins: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 22,
    color: colors.background,
  },
  textTitle: {
    ...typography.title,
    margin: 12,
  },
  smallCircul: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    margin: 4,
    backgroundColor: colors.dark,
  },
  okButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 17,
    marginTop: 30,
  },
});
