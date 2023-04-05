import { updateTotalHoursMonthForUser } from "../../firebase-functions/update.js";

let mockFunc = jest.fn();

jest.mock("@react-native-firebase/firestore", () => ({
  collection: () => ({
    doc: () => ({
      update: mockFunc,
    }),
  }),
}));

test("updateTotalHoursMonthForUser can throw error", async () => {
  mockFunc.mockRejectedValueOnce(new Error("error"));
  let uid = "1243";
  try {
    updateTotalHoursMonthForUser(uid, 3);
  } catch (error) {
    expect(error.message).toEqual(
      `There was an error updating 'total_hours_month' for user '${uid}' in Firebase`,
    );
  }
});
