import { View } from "react-native";
import { dropDownContainer } from "../styles";
import { Activity, TimeEntry, User } from "../../../utilily/types";
import { MainLabel } from "./MainLabel";
import { useState } from "react";

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
  userAndTimeEntry: UserAndUnapprovedTymeEntries;
};
export const UserAndUnapprovedTymeEntriesDropDown = ({
  userAndTimeEntry,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={dropDownContainer}>
      {userAndTimeEntry && (
        <MainLabel
          firstName={userAndTimeEntry.userFirstName}
          lastName={userAndTimeEntry.userLastName}
          amountOfTimeEntries={userAndTimeEntry.unapprovedTymeEntries.length}
          setIsOpen={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
      )}
    </View>
  );
};
