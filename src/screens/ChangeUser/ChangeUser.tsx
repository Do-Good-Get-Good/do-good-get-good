import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import Menu from "../../components/Menu";

import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import BottomNavButtons from "../../components/BottomNavButtons";
import { InputFieldWithController } from "../../components/InputFieldWithController";
import { Spinner } from "../../components/Loading";
import { useAdminUpdateUserInfoAndActivities } from "../../context/AdminContext/useAdminUpdateUserInfoAndActivities";
import { useSuperAdminContext } from "../../context/SuperAdminContext/useSuperAdminContext";
import { boldTextWithUnderline } from "../../styles/boldTextWithUnderline";
import { SuperAdminStack } from "../../utility/routeEnums";
import { ChangeUserRouteProps } from "../../utility/typesRouteProps";
import { UserName } from "./updateUser";

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
  const { user, prevRoute }: ChangeUserRouteProps = route.params;

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<UserName>({
    defaultValues: { name: user.firstName, surname: user.lastName },
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [changedStatus, setChangedStatus] = useState(user.statusActive);
  const { updateUser } = useSuperAdminContext();
  const { updateUserAfterChanges } = useAdminUpdateUserInfoAndActivities();

  const onSubmit = async (changed: UserName) => {
    setLoading(true);
    if (prevRoute === SuperAdminStack.RolesAndConnection) {
      updateUser({
        ...user,
        firstName: changed.name,
        lastName: changed.surname,
        statusActive: changedStatus,
      });
    } else {
      if (isDirty || changedStatus !== user.statusActive) {
        await updateUserAfterChanges({
          ...user,
          firstName: changed.name,
          lastName: changed.surname,
          statusActive: changedStatus,
        });
      }
    }
    setLoading(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <Text style={styles.textMainTitle}>Ändra användare</Text>

      <ScrollView style={styles.container}>
        <InputFieldWithController
          placeholderText={"Förnamn"}
          control={control}
          error={errors.name}
          name={"name"}
        />
        <InputFieldWithController
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
        <Spinner loading={loading} />
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
