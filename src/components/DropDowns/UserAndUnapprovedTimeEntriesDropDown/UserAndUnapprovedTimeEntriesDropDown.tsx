import { StyleSheet, View } from "react-native";

import {
  TimeEntry,
  UserAndUnapprovedTimeEntriesType,
} from "../../../utilily/types";
import { MainLabel } from "./MainLabel";
import { useState } from "react";
import { InfoRow } from "./InfoRow";
import colors from "../../../assets/theme/colors";
import { includes, pull } from "lodash";

const countAllEntries = (
  usersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[],
) =>
  usersWithUnconfirmedTimeEntries.reduce(
    (total, current) => total + current.unapprovedTimeEntries.length,
    0,
  );

type Props = {
  onCheck: Array<TimeEntry["id"]>;
  setOnCheck: (onCheck: Array<TimeEntry["id"]>) => void;

  usersTimeEtries: UserAndUnapprovedTimeEntriesType[];
};
export const UserAndUnapprovedTimeEntriesDropDown = ({
  usersTimeEtries,
  setOnCheck,
  onCheck,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [onCheck, setOnCheck] = useState<TimeEntry["id"][]>([]);
  const adminName = `${usersTimeEtries[0].adminFirstName}\u00A0${usersTimeEtries[0].adminLastName}`;

  const onCheckPress = (timeEntryID: TimeEntry["id"]) => {
    setOnCheck(
      includes(onCheck, timeEntryID)
        ? [...pull(onCheck, timeEntryID)]
        : [...onCheck, timeEntryID],
    );
  };

  return (
    <View
      testID="unapproved-time-entries-drop-down"
      style={styles.dropDownMonolithContainer}
    >
      <MainLabel
        title={adminName}
        amountOfTimeEntries={countAllEntries(usersTimeEtries)}
        setIsOpen={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />

      {isOpen && (
        <View style={{ paddingBottom: 10 }}>
          {usersTimeEtries.map((user) =>
            user.unapprovedTimeEntries.map((entry) => (
              <InfoRow
                key={entry.id}
                activityTitle={`${user.userFirstName}\u00A0${user.userLastName}`}
                time={entry.time}
                date={entry.date}
                checked={includes(onCheck, entry.id)}
                onCheck={() => onCheckPress(entry.id)}
              />
            )),
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  dropDownMonolithContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    borderRadius: 3,
  },
});
