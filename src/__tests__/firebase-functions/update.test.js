import firestore from "@react-native-firebase/firestore";

import { calculateNewHours } from "../../firebase-functions/update.js";

jest.mock("@react-native-firebase/firestore", () => ({
  collection: () => ({
    doc: () => ({
      update: jest.fn(),
    }),
  }),
}));

test("that saved hours are zero if removed time are greater than registered time", () => {
  var uid = "12354";
  var hours = 4;
  var registeredTime = 2;

  totalHours = calculateNewHours(hours, registeredTime);
  expect(totalHours).toBe(0);
});

test("that saved hours are removed with the right amout", () => {
  var uid = "12354";
  var hours = 2;
  var registeredTime = 4;
  var answer = registeredTime - hours;

  totalHours = calculateNewHours(hours, registeredTime);
  expect(totalHours).toBe(answer);
});
