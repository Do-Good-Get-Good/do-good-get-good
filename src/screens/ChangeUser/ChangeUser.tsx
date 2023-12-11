import React, { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yupResolver } from "@hookform/resolvers/yup";
import Menu from "../../components/Menu";

import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import BottomNavButtons from "../../components/BottomNavButtons";

import { InputField } from "../../components/TextInput";
import { error } from "firebase-functions/logger";
import { UserName, onUpdateUser } from "./updateUser";
import { boldTextWithUnderline } from "../../styles/boldTextWithUnderline";

const schema: yup.ObjectSchema<UserName> = yup
  .object()
  .shape({
    name: yup.string().trim().max(20).min(1).required("Obligatorisk"),
    surname: yup.string().trim().max(20).min(1).required("Obligatorisk"),
  })
  .defined();

type Props = {
  route: any;
  navigation: any;
};

export const ChangeUser = ({ route, navigation }: Props) => {
  const { userName, userSurname, statusActive, userID, sortBy } = route.params;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserName>({
    defaultValues: { name: userName, surname: userSurname },
    resolver: yupResolver(schema),
  });
  const [changedStatus, setcChangedStatus] = useState(statusActive);

  const onSubmit = (data: UserName) => {
    onUpdateUser(
      data,
      statusActive,
      changedStatus,
      userID,
      userName,
      userSurname,
      sortBy,
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <Text style={styles.textMainTitle}>Ändra användare</Text>

      <ScrollView style={styles.container}>
        <InputField
          placeholderText={"Förnamn"}
          control={control}
          error={errors.name}
          name={"name"}
        />
        <InputField
          placeholderText={"Efternamn"}
          control={control}
          error={errors.surname}
          name={"surname"}
        />

        <TouchableOpacity
          style={{
            marginTop: 10,
            alignSelf: "flex-start",
          }}
          onPress={() => setcChangedStatus(!changedStatus)}
        >
          <Text style={boldTextWithUnderline()}>
            {changedStatus ? "Inaktivera användare" : "Aktivera användare"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavButtons
        primaryText="Spara"
        secondaryText="Avbryt"
        primaryFunc={handleSubmit(onSubmit)}
        secondaryFunc={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default ChangeUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  textMainTitle: {
    ...typography.h2,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.dark,
    ...Platform.select({
      ios: {
        paddingTop: 16,
      },
      android: {
        paddingTop: 8,
      },
    }),
    paddingHorizontal: 16,
  },
  warningAboutRequired: {
    color: colors.error,
    marginTop: 1,
  },
  // textChangeStatusActive: {
  //   color: colors.dark,
  //   ...typography.button.sm,
  //   textDecorationLine: "underline",
  //   fontWeight: "bold",
  // },
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
  placeholderText: {
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    color: colors.dark,
  },
});
