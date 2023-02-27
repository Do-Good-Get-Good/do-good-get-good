import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Text, Platform, TouchableOpacity} from 'react-native';
import colors from '../assets/theme/colors';
import typography from '../assets/theme/typography';
import {Icon} from '@rneui/base';
import {useSuperAdminFunction} from '../context/SuperAdminContext';

export function ListOfAllUsers({navigation}) {
  const superAdminContext = useSuperAdminFunction();
  const [arrayOfAllUsersInSystem, setArrayOfAllUsersInSystem] = useState([]);

  useEffect(() => {
    if (
      superAdminContext.getAllUsers === true &&
      superAdminContext.allUsersInSystem.length != 0
    ) {
      setArrayOfAllUsersInSystem(superAdminContext.allUsersInSystem);
      superAdminContext.setGetAllUsers(false);
    }
  }, [superAdminContext.allUsersInSystem]);

  function findNameOfUserAdmin(adminId) {
    let adminName = '';
    let index = arrayOfAllUsersInSystem.findIndex(x => x.docId === adminId);

    if (index != -1) {
      adminName =
        arrayOfAllUsersInSystem[index].firstName +
        ' ' +
        arrayOfAllUsersInSystem[index].lastName;
    }
    return adminName;
  }

  function findAllUsersConnectedToTheAdmin(userId) {
    let usersArray = [];
    let adminName = findNameOfUserAdmin(userId);

    for (let index = 0; index < arrayOfAllUsersInSystem.length; index++) {
      if (arrayOfAllUsersInSystem[index].adminId === userId) {
        let tempObject = {
          user: arrayOfAllUsersInSystem[index],
          adminName: adminName,
          selectedForDropDown: false,
        };
        usersArray.push(tempObject);
      }
    }

    return usersArray;
  }

  function changingUserData(chooseUser) {
    let userAdminName = findNameOfUserAdmin(chooseUser.adminId);
    let arrayOfUsers = [];
    if (chooseUser.role === 'admin' || chooseUser.role === 'superadmin') {
      arrayOfUsers = findAllUsersConnectedToTheAdmin(chooseUser.docId);
    }

    superAdminContext.setMakeChangesForSelectedUser({
      user: chooseUser,
      adminName: userAdminName,
      arrayOfUsersIfAdmin: arrayOfUsers,
    });

    navigation.navigate('RolesAndConnection');
  }

  return (
    <View style={{marginTop: 16}}>
      {arrayOfAllUsersInSystem.length != 0 &&
        arrayOfAllUsersInSystem.map((user, index) => (
          <View key={user.docId} style={styles.contrainer}>
            <Text style={styles.firstAndLastNameText}>
              {user.firstName + ' ' + user.lastName}
            </Text>
            <TouchableOpacity onPress={() => changingUserData(user)}>
              <Icon
                color={colors.dark}
                name="pencil-outline"
                type="material-community"
                size={25}
              />
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
}

export default ListOfAllUsers;

const styles = StyleSheet.create({
  contrainer: {
    backgroundColor: colors.background,
    marginHorizontal: 16,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  firstAndLastNameText: {
    ...typography.b2,
  },
});
