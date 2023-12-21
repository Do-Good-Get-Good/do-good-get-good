import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { MyActivities } from "../../components/MyActivities";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@react-native-async-storage/async-storage", () => {
  const actualAsyncStorage = jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock",
  );
  return {
    ...actualAsyncStorage,
    getItem: () => null,
  };
});

jest.mock("../../context/ActivityImagesContext", () => ({
  useActivityImages: jest.fn(() => ({
    getImageForActivity: jest.fn(() => ({
      photo: "symbol_blood",
    })),
  })),
}));

jest.mock("@rneui/base/dist/Icon/", () => ({
  Icon: jest.fn(),
}));

jest.mock("../../components/CalendarView", () => () => {
  return <fakeCalenderView />;
});

const activities = [
  {
    id: "123",
    title: "Studiehjälp för lågstadiebarn",
    city: "Gbg",
    photo: "symbol_blood",
    time: 0,
    adminId: "321",
  },
  {
    id: "124",
    title: "Missing people",
    city: "Gbg",
    photo: "symbol_blood",
    time: 0,
    adminId: "321",
  },
];

describe("Testing MyActivities", () => {
  it("can find the activity title", () => {
    const { getAllByText } = render(<MyActivities activities={activities} />);
    expect(getAllByText("Studiehjälp för lågstadiebarn").length).toBe(1);
    expect(getAllByText("Missing people").length).toBe(1);
  });

  it("can find the city for the activity", () => {
    const { getAllByText } = render(<MyActivities activities={activities} />);
    expect(getAllByText("Gbg").length).toBe(2);
  });

  it("can find the time for the activity", () => {
    const { getAllByText } = render(<MyActivities activities={activities} />);
    expect(getAllByText("0 tim").length).toBe(2);
  });

  it("can find the image for the activity", () => {
    const { getAllByTestId } = render(<MyActivities activities={activities} />);
    const image = getAllByTestId("imageId");
    expect(image[0].props.source).toEqual({
      photo: "symbol_blood",
    });
    expect(image[1].props.source).toEqual({
      photo: "symbol_blood",
    });
  });

  it("can click on the Logga tid button", () => {
    const { getAllByText, getAllByTestId } = render(
      <MyActivities activities={activities} />,
    );
    expect(getAllByText("Logga tid").length).toBe(2);
    const button = getAllByTestId("logTimeButton");
    fireEvent.press(button[0]);
    fireEvent.press(button[1]);
  });

  it("More padding between title and city if title.length <= 16", () => {
    const { getAllByText, getAllByTestId } = render(
      <MyActivities activities={activities} />,
    );
    const view = getAllByTestId("viewId");
    expect(view[1].props.style.paddingTop).toEqual(25);
    expect(getAllByText("Missing people").length).toBe(1);
  });
  it("Less padding between title and city if title.length > 16", () => {
    const { getAllByText, getAllByTestId } = render(
      <MyActivities activities={activities} />,
    );
    const view = getAllByTestId("viewId");
    expect(view[0].props.style.paddingTop).toEqual(5);
    expect(getAllByText("Studiehjälp för lågstadiebarn").length).toBe(1);
  });
});
