import { useNavigation } from "@react-navigation/native";
import { useSuperAdminHomePageContext } from "../context/SuperAdminHomePageContext";
import { TimeEntry } from "../utility/types";
import { AlertQuestion } from "./Alerts/AlertQuestion ";
import { LongButton } from "./Buttons/LongButton";
import auth from "@react-native-firebase/auth";
import { SuperAdminStack } from "../utility/routeEnums";
import { AlertToApproveTimeEntries } from "./Alerts/AlertToApproveTimeEntries";

type Props = {
  onCheck: TimeEntry[];
};

const superAdminID = auth().currentUser?.uid;

export const SuperAdminLongButtons = ({ onCheck }: Props) => {
  const navigation = useNavigation<{
    navigate: (nav: SuperAdminStack) => void;
  }>();
  const { onApproveTimeEntriesSuperadmin } = useSuperAdminHomePageContext();

  const onNavigateToListOfAllUsers = () => {
    navigation.navigate(SuperAdminStack.AllUsersInTheSystem);
  };

  const onApprove = () => {
    if (superAdminID !== undefined)
      onApproveTimeEntriesSuperadmin(onCheck, superAdminID);
  };

  return (
    <>
      <LongButton
        isDisabled={onCheck.length < 1}
        style={{ marginTop: 20 }}
        title="Godkänn"
        onPress={() => AlertToApproveTimeEntries(onApprove)}
        testID="on-save"
      />
      <LongButton
        style={{ marginTop: 20 }}
        title="Alla användare"
        onPress={onNavigateToListOfAllUsers}
        testID="to-all-users"
      />
    </>
  );
};
