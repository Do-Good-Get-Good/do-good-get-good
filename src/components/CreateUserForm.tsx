import { ScrollView } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import BottomNavButtons from "./BottomNavButtons";
import { useNavigation } from "@react-navigation/native";
import { Role } from "../utility/enums";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputFieldWithController } from "./InputFieldWithController";
import { UserNewAccount } from "../screens/CreateUser";
import { ChangeUserRole } from "./ChangeUserRole";
import React, { useRef } from "react";
import { useUserLevel } from "../context/useUserLevel";

const schema: yup.ObjectSchema<UserNewAccount> = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .max(30, "* Förnamn kan innehålla max 30 tecken")
      .min(1, "* Förnamn måste innehålla minst 1 tecken")
      .required("* Obligatorisk"),
    surname: yup
      .string()
      .trim()
      .max(30, "* Förnamn kan innehålla max 30 tecken")
      .min(1, "* Efternamn måste innehålla minst 1 tecken")
      .required("* Obligatorisk"),
    email: yup
      .string()
      .trim()
      .email("* Ange en giltig e-mail")
      .required("* Obligatorisk"),
    confirmEmail: yup
      .string()
      .trim()
      .required("Obligatorisk")
      .oneOf([yup.ref("email")], "Överensstämmer inte"),
    password: yup
      .string()
      .trim()
      .min(6, "* Lösenordet måste innehålla minst 6 tecken")
      .max(100)
      .required(),
    role: yup
      .mixed<Role>()
      .oneOf(Object.values(Role), "* Obligatorisk")
      .required(),
  })
  .defined();

type Props = {
  user: UserNewAccount;
  setUser: (user: UserNewAccount) => void;
  nextPage: () => void;
};

export const CreateUserForm = ({ user, setUser, nextPage }: Props) => {
  const navigation = useNavigation();
  const { userLevel } = useUserLevel();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleContentSizeChange = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<UserNewAccount>({
    defaultValues: {
      name: user?.name,
      surname: user?.name,
      email: user?.email,
      confirmEmail: user?.email,
      password: user?.password,
      role: userLevel === Role.superadmin ? "Behörighet" : Role.user,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = ({
    name,
    surname,
    email,
    password,
    role,
  }: UserNewAccount) => {
    isDirty &&
      setUser({
        name,
        surname,
        email,
        password,
        role,
      });
    nextPage();
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={handleContentSizeChange}
        keyboardDismissMode={"on-drag"}
        style={{ flex: 1 }}
        testID="scroll"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <InputFieldWithController
          placeholderText={"Förnamn"}
          control={control}
          error={errors.name}
          name={"name"}
          testID={"name"}
        />
        <InputFieldWithController
          placeholderText={"Efternamn"}
          control={control}
          error={errors.surname}
          name={"surname"}
          testID={"surname"}
        />
        <InputFieldWithController
          placeholderText={"E-mail"}
          toLowerCase={true}
          control={control}
          error={errors.email}
          name={"email"}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
          contextMenuHidden={true}
          testID={"email"}
        />
        <InputFieldWithController
          placeholderText={"Bekräfta E-mail"}
          toLowerCase={true}
          control={control}
          error={errors.confirmEmail}
          name={"confirmEmail"}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
          contextMenuHidden={true}
          testID={"confirm-email"}
        />
        {userLevel === Role.superadmin && (
          <ChangeUserRole error={errors.role} control={control} />
        )}
      </ScrollView>

      <BottomNavButtons
        primaryText="Nästa"
        secondaryText="Avbryt"
        primaryFunc={handleSubmit(onSubmit)}
        secondaryFunc={() => navigation.goBack()}
      />
    </>
  );
};
