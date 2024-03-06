import { StyleSheet, View } from "react-native";

import { useState } from "react";

import { includes, pull } from "lodash";
import {
  TimeEntry,
  UserAndUnapprovedTimeEntriesType,
} from "../../utility/types";
import colors from "../../assets/theme/colors";
import { InfoRow } from "../DropDowns/InfoRow";
import { MainLabel } from "../DropDowns/AdminAndUnapprovedTimeEntriesDropDown/MainLabel";

type Props = {
  onCheck: Array<TimeEntry>;
  setOnCheck: (onCheck: Array<TimeEntry>) => void;
  user: UserAndUnapprovedTimeEntriesType;
};
export const UserAndUnapprovedTimeEntriesRow = ({
  user,
  setOnCheck,
  onCheck,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = `${user.userFirstName}\u00A0${user.userLastName}`;

  const onCheckPress = (timeEntry: TimeEntry) => {
    setOnCheck(
      includes(onCheck, timeEntry)
        ? [...pull(onCheck, timeEntry)]
        : [...onCheck, timeEntry],
    );
  };

  return (
    <>
      {user && (
        <View
          testID="unapproved-time-entries-drop-down"
          style={styles.dropDownMonolithContainer}
        >
          <MainLabel
            title={userName}
            amountOfTimeEntries={user.unapprovedTimeEntries.length}
            setIsOpen={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
          />

          {isOpen && (
            <View style={{ paddingBottom: 10 }}>
              <View style={styles.containerBorder}>
                {user.unapprovedTimeEntries.map((entry) => (
                  <InfoRow
                    key={entry.id}
                    testID={entry.id}
                    mainTitle={entry.activityTitle}
                    time={entry.time}
                    date={entry.date}
                    checked={includes(onCheck, entry)}
                    onCheck={() => onCheckPress(entry)}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  containerBorder: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.light,
  },
  dropDownMonolithContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    borderRadius: 3,
  },
});
