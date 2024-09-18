import { includes, pull } from "lodash";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../../assets/theme/colors";
import {
  TimeEntry,
  UserAndUnapprovedTimeEntriesType,
} from "../../../utility/types";
import { InfoRow } from "../InfoRow";
import { MainLabel } from "./MainLabel";

const countAllEntries = (
  usersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[]
) =>
  usersWithUnconfirmedTimeEntries.reduce(
    (total, current) => total + current.unapprovedTimeEntries.length,
    0
  ) ?? 0;

type Props = {
  onCheck: Array<TimeEntry>;
  setOnCheck: (onCheck: Array<TimeEntry>) => void;
  usersTimeEtries: UserAndUnapprovedTimeEntriesType[];
};
export const AdminAndUnapprovedTimeEntriesDropDown = ({
  usersTimeEtries,
  setOnCheck,
  onCheck,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const adminName = `${usersTimeEtries[0].adminFirstName}\u00A0${usersTimeEtries[0].adminLastName}`;

  const onCheckPress = (timeEntry: TimeEntry) => {
    setOnCheck(
      includes(onCheck, timeEntry)
        ? [...pull(onCheck, timeEntry)]
        : [...onCheck, timeEntry]
    );
  };

  return (
    <>
      {usersTimeEtries.length > 0 && (
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
              {usersTimeEtries.map((user, j) => (
                <View key={j} style={styles.containerBorder}>
                  {user.unapprovedTimeEntries.map((entry) => (
                    <InfoRow
                      key={entry.id}
                      testID={entry.id}
                      mainTitle={`${user.userFirstName}\u00A0${user.userLastName}`}
                      time={entry.time}
                      date={entry.date}
                      checked={includes(onCheck, entry)}
                      onCheck={() => onCheckPress(entry)}
                    />
                  ))}
                </View>
              ))}
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
