import { StyleSheet, View } from "react-native";

import { Activity, TimeEntry, User } from "../../../utilily/types";
import { MainLabel } from "./MainLabel";
import { useState } from "react";
import { InfoRow } from "./InfoRow";
import colors from "../../../assets/theme/colors";
import { includes, reject } from "lodash";

type ActivityAndTymeEntries = {
  activityID: Activity["id"];
  timeEntryID: TimeEntry["id"];
  activityName: Activity["title"];
  date: TimeEntry["date"];
  time: TimeEntry["time"];
};

type UserAndUnapprovedTymeEntries = {
  userID: User["id"];
  userFirstName: User["firstName"];
  userLastName: User["lastName"];
  unapprovedTymeEntries: Array<ActivityAndTymeEntries>;
};

type Props = {
  user: UserAndUnapprovedTymeEntries;
};
export const UserAndUnapprovedTymeEntriesDropDown = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onCheck, setOnCheck] = useState<TimeEntry["id"][]>([]);

  const onCheckPress = (timeEntryID: TimeEntry["id"]) => {
    includes(onCheck, timeEntryID)
      ? reject(onCheck, timeEntryID)
      : setOnCheck([...onCheck, timeEntryID]);
  };
  console.log(onCheck);
  return (
    <View style={styles.dropDownMonolithContainer}>
      {user && (
        <MainLabel
          firstName={user.userFirstName}
          lastName={user.userLastName}
          amountOfTimeEntries={user.unapprovedTymeEntries.length}
          setIsOpen={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
      )}

      {isOpen && (
        <View style={{ paddingBottom: 10 }}>
          {user.unapprovedTymeEntries.map((entry) => (
            <InfoRow
              key={entry.timeEntryID}
              activityName={entry.activityName}
              time={entry.time}
              date={entry.date}
              checked={includes(onCheck, entry.timeEntryID)}
              onCheck={() => onCheckPress(entry.timeEntryID)}
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
