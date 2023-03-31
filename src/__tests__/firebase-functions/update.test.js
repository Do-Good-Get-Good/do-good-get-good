import {
  calculateNewHours,
  decrementTotalHoursMonthForUser,
  incrementTotalHoursMonthForUser,
  updateTotalHoursMonthForUser,
} from "../../firebase-functions/update.js";
import { Arithmetic } from "../../lib/enums/arithmetic.js";

import each from "jest-each";

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

each([
  [2, 1, 1],
  [1, 1, 0],
  [100, 90, 10],
  [Number.MAX_SAFE_INTEGER + 124, 124, Number.MAX_SAFE_INTEGER],
]).test(
  "returns %s when adding %s and %s",
  (expected, registeredTime, hours) => {
    expect(calculateNewHours(hours, registeredTime, Arithmetic.Add)).toBe(
      expected,
    );
  },
);

each([
  [10, 14, 4],
  [3, 6, 3],
  [0, 0, 10],
  [0, 10, Number.MAX_SAFE_INTEGER],
]).test(
  "returns %s when subtracting %s with %s",
  (expected, registeredTime, hours) => {
    expect(calculateNewHours(hours, registeredTime, Arithmetic.Sub)).toBe(
      expected,
    );
  },
);

test("incrementTotalHoursMonthForUser can throw error", async () => {
  updateTotalHoursMonthForUser.mockRejectedValueOnce(new Error("error"));
  let uid = "1243";
  try {
    incrementTotalHoursMonthForUser(uid, 7, 3);
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
    decrementTotalHoursMonthForUser(uid, 7, 3);
  } catch (error) {
    expect(error.message).toEqual(
      `There was an error updating 'total_hours_month' for user '${uid}' in Firebase`,
    );
  }
});
