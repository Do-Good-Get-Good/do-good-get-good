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
  mainLableText?: string;
  user: UserAndUnapprovedTimeEntriesType;
  isUserName?: boolean;
  amountOfTimeEntries?: number;
};
export const UserAndUnapprovedTimeEntriesDropDown = ({
  user,
  mainLableText,
  isUserName = true,
  amountOfTimeEntries,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onCheck, setOnCheck] = useState<TimeEntry["id"][]>([]);

  const onCheckPress = (timeEntryID: TimeEntry["id"]) => {
    setOnCheck(
      includes(onCheck, timeEntryID)
        ? [...pull(onCheck, timeEntryID)]
        : [...onCheck, timeEntryID],
    );
  };
  console.log(user, " .      ---  user");
  return (
    <View
      testID="unapproved-time-entries-drop-down"
      style={styles.dropDownMonolithContainer}
    >
      {mainLableText && (
        <MainLabel
          title={mainLableText}
          amountOfTimeEntries={amountOfTimeEntries}
          setIsOpen={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
      )}

      {isOpen && (
        <View style={{ paddingBottom: 10 }}>
          {user.unapprovedTimeEntries.map((entry) => (
            <InfoRow
              key={entry.id}
              activityTitle={
                isUserName
                  ? `${user.userFirstName}\u00A0${user.userLastName}`
                  : entry.activityTitle
              }
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
