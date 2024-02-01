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

type Props = {
  user: UserAndUnapprovedTimeEntriesType;
  onCheck: Array<TimeEntry["id"]>;
  setOnCheck: (onCheck: Array<TimeEntry["id"]>) => void;
};
export const UserAndUnapprovedTimeEntriesDropDown = ({
  user,
  onCheck,
  setOnCheck,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onCheckPress = (timeEntryID: TimeEntry["id"]) => {
    setOnCheck(
      includes(onCheck, timeEntryID)
        ? [...pull(onCheck, timeEntryID)]
        : [...onCheck, timeEntryID],
    );
  };
  console.log(user, " .    ---   user");

  return (
    <View
      testID="unapproved-time-entries-drop-down"
      style={styles.dropDownMonolithContainer}
    >
      {user && (
        <MainLabel
          firstName={user.userFirstName}
          lastName={user.userLastName}
          amountOfTimeEntries={user.unapprovedTimeEntries.length}
          setIsOpen={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
      )}

      {isOpen && (
        <View style={{ paddingBottom: 10 }}>
          {user.unapprovedTimeEntries.map((entry) => (
            <InfoRow
              key={entry.id}
              activityTitle={entry.activityTitle}
              time={entry.time}
              date={entry.date}
              checked={includes(onCheck, entry.id)}
              onCheck={() => onCheckPress(entry.id)}
            />
          ))}
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
