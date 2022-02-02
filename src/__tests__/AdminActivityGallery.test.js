import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

import AdminActivityGallery from "../screens/AdminActivityGallery";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

describe("Testing admin activity gallery", () => {
  const screen = render(<AdminActivityGallery />);
  screen.debug();
});
