import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yupResolver } from "@hookform/resolvers/yup";
import Menu from "../../components/Menu";

import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import BottomNavButtons from "../../components/BottomNavButtons";
import { UserName, onUpdateUser } from "./updateUser";
import { boldTextWithUnderline } from "../../styles/boldTextWithUnderline";
import { InputField } from "../../components/InputField";
import { ChangeUserRouteProps } from "../../utility/typesRouteProps";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { SuperAdminStack } from "../../utility/routeEnums";
import { useSuperAdminContext } from "../../context/SuperAdminContext/useSuperAdminContext";

const schema: yup.ObjectSchema<UserName> = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .max(20)
      .min(1, "* Förnamn måste innehålla minst 1 tecken")
      .required("Obligatorisk"),
    surname: yup
      .string()
      .trim()
      .max(20)
      .min(1, "* Efternamn måste innehålla minst 1 tecken")
      .required("Obligatorisk"),
  })
  .defined();

type Props = {
  route: any;
  navigation: any;
};

export const ChangeUser = ({ route, navigation }: Props) => {
  const {
    userName,
    userSurname,
    statusActive,
    userID,
    sortBy,
    prevRoute,
  }: ChangeUserRouteProps = route.params;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserName>({
    defaultValues: { name: userName, surname: userSurname },
    resolver: yupResolver(schema),
  });
  const [changedStatus, setChangedStatus] = useState(statusActive);
  const { updateUserName } = useSuperAdminContext();

  const onSubmit = (data: UserName) => {
    if (prevRoute === SuperAdminStack.RolesAndConnection) {
      updateUserName(data);
    } else {
      onUpdateUser(
        data,
        statusActive,
        changedStatus,
        userID,
        userName,
        userSurname,
        sortBy,
      );
    }

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
          onPress={() => setChangedStatus(!changedStatus)}
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
});
