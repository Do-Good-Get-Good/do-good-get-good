import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import {Icon} from '@rneui/base';

import typography from '../assets/theme/typography';
import colors from '../assets/theme/colors';
import BottomNavButtons from './BottomNavButtons';
import {useNavigation} from '@react-navigation/native';
import {UserLevels} from '../lib/enums/userlevels';

const UserForm = ({userLevel, user, setUser, nextPage}) => {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    user.role === null ? 'Behörighet' : user.role,
  );
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordFilledUp, setPasswordFilledUp] = useState();
  const [nameFilledUp, setNameFilledUp] = useState();
  const [surnameFilledUp, setSurnameFilledUp] = useState();
  const [emailFilledUp, setEmailFilledUp] = useState();
  const [placeholderFilledUp, setPlaceholderFilledUp] = useState();
  const roles = [UserLevels.User, UserLevels.Admin, UserLevels.SuperAdmin];
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  useEffect(() => {
    if (user.name != null) {
      if (user.name != '' && user.name.trim()) {
        setNameFilledUp(true);
      } else {
        setNameFilledUp(false);
      }
    }
  }, [user.name]);

  useEffect(() => {
    if (user.surname != null) {
      if (user.surname != '' && user.surname.trim()) {
        setSurnameFilledUp(true);
      } else {
        setSurnameFilledUp(false);
      }
    }
  }, [user.surname]);

  useEffect(() => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (user.email != null) {
      if (user.email != '' && user.email.trim()) {
        setEmailFilledUp(true);
      } else {
        setEmailFilledUp(false);
      }

      if (reg.test(user.email) === false) {
        setInvalidEmail(true);
      } else {
        setInvalidEmail(false);
      }
    }
  }, [user.email]);

  useEffect(() => {
    if (user.password != null) {
      if (user.password.length < 6) {
        setInvalidPassword(true);
      } else {
        setInvalidPassword(false);
      }
      if (user.password != '' && user.password.trim()) {
        setPasswordFilledUp(true);
      } else {
        setPasswordFilledUp(false);
      }
    }
  }, [user.password]);

  useEffect(() => {
    if (userLevel === UserLevels.Admin) {
      setPlaceholderFilledUp(true);
      setPlaceholder('');
    } else {
      if (placeholder === 'Behörighet') return;
      if (
        [UserLevels.User, UserLevels.Admin, UserLevels.SuperAdmin].includes(
          placeholder,
        )
      ) {
        setPlaceholderFilledUp(true);
      } else {
        setPlaceholderFilledUp(false);
      }
    }
  }, [placeholder]);

  function validInputs() {
    if (
      nameFilledUp &&
      surnameFilledUp &&
      emailFilledUp &&
      passwordFilledUp &&
      !invalidEmail &&
      !invalidPassword &&
      placeholderFilledUp &&
      [UserLevels.User, UserLevels.Admin, UserLevels.SuperAdmin].includes(
        placeholder,
      )
    ) {
      return true;
    } else {
      if (user.name === null) setNameFilledUp(false);
      if (user.surname === null) setSurnameFilledUp(false);
      if (user.email === null) setEmailFilledUp(false);
      if (user.password === null) setPasswordFilledUp(false);
      if (
        placeholder === 'Behörighet' ||
        !placeholder ||
        placeholder === null
      ) {
        setPlaceholderFilledUp(false);
      }
      return false;
    }
  }

  return (
    <>
      <ScrollView
        keyboardDismissMode={'on-drag'}
        style={{flex: 1}}
        contentContainerStyle={{paddingHorizontal: 16}}>
        <TextInput
          style={[styles.input, styles.dropdownShadow]}
          maxLength={30}
          onChangeText={text => setUser({...user, name: text})}
          value={user.name}
          placeholder="Förnamn"
          placeholderTextColor={colors.dark}
          returnKeyType="next"
          onSubmitEditing={() => ref_input1.current.focus()}
        />
        {nameFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[styles.input, styles.dropdownShadow]}
          maxLength={30}
          onChangeText={text => setUser({...user, surname: text})}
          value={user.surname}
          placeholder="Efternamn"
          placeholderTextColor={colors.dark}
          ref={ref_input1}
          returnKeyType={'next'}
          onSubmitEditing={() => ref_input2.current.focus()}
        />
        {surnameFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        <TextInput
          style={[styles.input, styles.dropdownShadow]}
          textContentType={'emailAddress'}
          keyboardType={'email-address'}
          autoCapitalize="none"
          maxLength={100}
          onChangeText={text => setUser({...user, email: text})}
          value={user.email}
          placeholder="E-mail"
          placeholderTextColor={colors.dark}
          ref={ref_input2}
          returnKeyType="next"
          onSubmitEditing={() => {
            ref_input3.current.focus();
          }}
        />
        {emailFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        {invalidEmail && emailFilledUp && (
          <Text style={styles.warningAboutRequired}>
            * Ange en giltig e-mail
          </Text>
        )}
        <View style={{flexDirection: 'row', position: 'relative'}}>
          <TextInput
            style={[styles.input, styles.dropdownShadow]}
            maxLength={30}
            onChangeText={text => setUser({...user, password: text})}
            value={user.password}
            placeholder="Lösenord"
            placeholderTextColor={colors.dark}
            ref={ref_input3}
            returnKeyType="default"
            secureTextEntry={showPassword ? false : true}
          />
          <View style={styles.showPasswordIcon}>
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              type="material"
              size={25}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          </View>
        </View>
        {passwordFilledUp === false && (
          <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
        )}
        {invalidPassword && passwordFilledUp && (
          <Text style={styles.warningAboutRequired}>
            * Lösenordet måste innehålla minst 6 tecken
          </Text>
        )}

        {userLevel === 'superadmin' && (
          <>
            <TouchableOpacity
              style={[
                styles.input,
                styles.dropdownShadow,
                styles.dropdown,
                {
                  borderWidth: 1,
                  borderColor: expanded ? colors.dark : colors.background,
                },
              ]}
              onPress={() => setExpanded(!expanded)}>
              <Text style={styles.placeholderText}>{placeholder}</Text>
              <Icon
                color="#5B6770"
                name={expanded === true ? 'arrow-drop-up' : 'arrow-drop-down'}
                size={30}
              />
            </TouchableOpacity>

            {expanded === true && (
              <View
                style={[styles.listItemContentStyle, styles.dropdownShadow]}>
                {roles.map((role, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setPlaceholder(role);
                      setUser({
                        ...user,
                        role: role.toLowerCase().replace(' ', ''),
                      });
                      setExpanded(false);
                    }}>
                    <Text style={styles.dropdownItem}>{role}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {placeholderFilledUp === false && (
              <Text style={styles.warningAboutRequired}>* Obligatorisk</Text>
            )}
          </>
        )}
      </ScrollView>
      <BottomNavButtons
        primaryText="Nästa"
        secondaryText="Avbryt"
        primaryFunc={() => {
          if (validInputs()) nextPage();
        }}
        secondaryFunc={() => navigation.goBack()}
      />
    </>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    maxHeight: 55,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
  },
  showPasswordIcon: {
    position: 'absolute',
    right: 15,
    alignSelf: 'center',
    paddingBottom: 10,
    elevation: 2,
  },
  warningAboutRequired: {
    color: colors.error,
    marginTop: -5,
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownShadow: {
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  dropdownItem: {
    marginVertical: 8,
    ...typography.button.sm,
  },
  placeholderText: {
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    color: colors.dark,
  },
  listItemContentStyle: {
    marginTop: -10,
    flexDirection: 'column',
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: colors.background,
  },
});
