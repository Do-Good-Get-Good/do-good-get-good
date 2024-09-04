import { AlertToApproveTimeEntries } from "./Alerts/AlertToApproveTimeEntries";
import { LongButton } from "./Buttons/LongButton";

type Props = {
  isDisabled: boolean;
  onApprove: () => void;
  onAllUsers: () => void;
};

export const SuperAdminLongButtons = ({
  isDisabled,
  onApprove,
  onAllUsers,
}: Props) => {
  return (
    <>
      <LongButton
        isDisabled={isDisabled}
        style={{ marginTop: 20 }}
        title="Godkänn"
        onPress={() => AlertToApproveTimeEntries(onApprove)}
        testID="on-save"
      />
      <LongButton
        style={{ marginTop: 20 }}
        title="Alla användare"
        onPress={onAllUsers}
        testID="to-all-users"
      />
    </>
  );
};
