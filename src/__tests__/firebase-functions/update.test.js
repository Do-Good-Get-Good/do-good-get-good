import {
  calculateNewHours,
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

test("that saved hours are zero if removed time are greater than registered time", () => {
  var hours = 4;
  var registeredTime = 2;

  totalHours = calculateNewHours(hours, registeredTime, "sub");
  expect(totalHours).toBe(0);
});

test("that saved hours are removed with the right amout", () => {
  var hours = 2;
  var registeredTime = 4;
  var answer = registeredTime - hours;

  totalHours = calculateNewHours(hours, registeredTime, "sub");
  expect(totalHours).toBe(answer);
});

test("that saved hours are removed with the right amout even if amount is big", () => {
  var hours = Number.MAX_SAFE_INTEGER;
  var registeredTime = 2423;

  totalHours = calculateNewHours(hours, registeredTime, "sub");
  expect(totalHours).toBe(0);
});

test("that saved hours are added with the right amout", () => {
  var hours = 2;
  var registeredTime = 0;
  var answer = registeredTime + hours;

  totalHours = calculateNewHours(hours, registeredTime, "add");
  expect(totalHours).toBe(answer);
});

test("that saved hours are added with the right amout even if amount is big", () => {
  var hours = Number.MAX_SAFE_INTEGER;
  var registeredTime = 2423;
  var answer = registeredTime + hours;

  totalHours = calculateNewHours(hours, registeredTime, "add");
  expect(totalHours).toBe(answer);
});

test("that saved hours still is 0 when adding 0", () => {
  var hours = 0;
  var registeredTime = 0;

  totalHours = calculateNewHours(hours, registeredTime, "add");
  expect(totalHours).toBe(0);
});

test("that saved hours still is 0 when subtracting 0", () => {
  var hours = 0;
  var registeredTime = 0;

  totalHours = calculateNewHours(hours, registeredTime, "sub");
  expect(totalHours).toBe(0);
});

test("incrementTotalHoursMonthForUser can throw error", async () => {
  updateTotalHoursMonthForUser.mockRejectedValueOnce(new Error("error"));
  let uid = "1243";
  try {
    incrementTotalHoursMonthForUser(uid, 7, 3);
  } catch (error) {
    expect(error.message).toEqual(
      `There was an error incrementing 'total_hours_month' for user '${uid}' in Firebase`,
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
      `There was an error decrementing 'total_hours_month' for user '${uid}' in Firebase`,
    );
  }
});
