import {
  decrementTotalHoursMonthForUser,
  incrementTotalHoursMonthForUser,
  updateTotalHoursMonthForUser,
} from "../../firebase-functions/update.js";

jest.mock("@react-native-firebase/firestore", () => ({
  collection: () => ({
    doc: () => ({
      update: jest.fn(),
    }),
  }),
}));

jest.mock("../../firebase-functions/update.js", () => {
  const actual = jest.requireActual("../../firebase-functions/update.js");

  return {
    ...actual,
    updateTotalHoursMonthForUser: jest.fn(),
  };
});

test("incrementTotalHoursMonthForUser can throw error", async () => {
  updateTotalHoursMonthForUser.mockRejectedValueOnce(new Error("error"));
  let uid = "1243";
  try {
    incrementTotalHoursMonthForUser(uid, 7);
  } catch (error) {
    expect(error.message).toEqual(
      `There was an error updating 'total_hours_month' for user '${uid}' in Firebase`,
    );
  }
});

test("decrementTotalHoursMonthForUser can throw error", async () => {
  updateTotalHoursMonthForUser.mockRejectedValueOnce(new Error("error"));
  let uid = "1243";
  try {
    decrementTotalHoursMonthForUser(uid, 3);
  } catch (error) {
    expect(error.message).toEqual(
      `There was an error updating 'total_hours_month' for user '${uid}' in Firebase`,
    );
  }
});
