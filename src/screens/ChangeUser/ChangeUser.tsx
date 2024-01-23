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
import { User } from "../../utilily/types";
import { Sort } from "../../lib/enums/sort";
import { ChangeUserScreenRouteProps } from "../../utilily/typeRouteProps";
import { useUpdateUserInfo } from "../../hooks/useUpdateUserInfo";

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
    email: yup
      .string()
      .trim()
      .email("* Ange en giltig e-mail")
      .required("* Obligatorisk"),
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
  }: ChangeUserScreenRouteProps = route.params;
  const { email, updateUserEmail } = useUpdateUserInfo(userID);
  console.log(email, " ......... email   userEmail");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserName>({
    defaultValues: { name: userName, surname: userSurname, email: email },
    resolver: yupResolver(schema),
  });
  const [changedStatus, setChangedStatus] = useState(statusActive);

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
    data?.email && updateUserEmail(data?.email);
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
        <InputField
          placeholderText={"E-mail"}
          control={control}
          error={errors.email}
          name={"email"}
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
