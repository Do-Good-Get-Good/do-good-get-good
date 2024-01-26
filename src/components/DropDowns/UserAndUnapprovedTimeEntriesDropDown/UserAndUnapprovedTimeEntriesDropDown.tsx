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
};
export const UserAndUnapprovedTimeEntriesDropDown = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onCheck, setOnCheck] = useState<TimeEntry["id"][]>([]);

  const onCheckPress = (timeEntryID: TimeEntry["id"]) => {
    setOnCheck(
      includes(onCheck, timeEntryID)
        ? [...pull(onCheck, timeEntryID)]
        : [...onCheck, timeEntryID],
    );
  };

  return (
    <View style={styles.dropDownMonolithContainer}>
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
