import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyActivityAsAList from "../components/MyActivityAsAList";
// import { useActivityFunction } from "../context/ActivityContext";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});

jest.mock("../components/CalendarView", () => () => {
  return <fakeCalenderView />;
});

jest.mock("@react-navigation/native");

jest.mock("../context/ActivityContext", () => {
  const timeandstatusContext = [
    {
      activity_id: "asd",
      activity_title: "Missing people",
      admin_id: "aaa",
      date: { toDate: () => new Date() },
      doc_id: "z7kknsEWFeJPhHPev2lA",
      statusConfirmed: false,
      time: 1.5,
      user_id: "asd",
    },
  ];

  const myActivitiesContext = [
    {
      id: "asd",
      title: "Missing people",
      city: "Gbg",
      photo: "symbol_earth",
    },
  ];

  // let arrayWithTimeAntries = [];
  // for (let i = 0; i < 5; i++) {
  //   arrayWithTimeAntries.push(timeandstatusContext);
  // }

  // let arrayWithTwentyTimeAntries = [];
  // for (let i = 0; i < 20; i++) {
  //   arrayWithTimeAntries.push(timeandstatusContext);
  // }

  return {
    useActivityFunction: () => ({
      allListOfTimeEntry: timeandstatusContext,
      lastFiveTimeEntries: timeandstatusContext,
      myActivities: myActivitiesContext,
      setLimitAmountForTimeEntries: jest.fn(),
      // allListOfTimeEntry: jest.fn(),
    }),
  };
});

// const showAllList = [
//   {
//     activityId: "asd",
//     date: { toDate: () => new Date() },
//     fbDocumentID: "z7kknsEWFeJPhHPev2lA",
//     statusConfirmed: false,
//     time: 1.5,
//   },
//   {
//     activityId: "abc",
//     date: { toDate: () => new Date() },
//     fbDocumentID: "z7kknsEWFeJPhHPev2lB",
//     statusConfirmed: false,
//     time: 1,
//   },
// ];

describe("Testing MyActivityAsAList", () => {
  it("can find the text Min tid", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });
    const { getAllByText } = render(<MyActivityAsAList />);
    expect(getAllByText("Min tid").length).toBe(1);
  });

  it("can find the activity title", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });
    const { getAllByText } = render(<MyActivityAsAList />);
    expect(getAllByText("Missing people").length).toBe(1);
  });

  it("can find the activity date", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });
    const { getAllByText } = render(<MyActivityAsAList />);
    expect(getAllByText(new Date().toISOString().slice(0, 10)).length).toBe(1);
  });

  it("can find the activity time", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });

    const { getAllByText } = render(<MyActivityAsAList />);
    expect(getAllByText("1.5 tim").length).toBe(1);
  });

  it("can press the edit button if statusConfirmed is false", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });

    const { getByTestId } = render(<MyActivityAsAList />);
    const button = getByTestId("editButton");
    fireEvent.press(button);
  });

  it("the edit button is unabled when statusConfirmed is true", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });

    const timeandstatusContext1 = [
      {
        activityId: "asd",
        date: { toDate: () => new Date() },
        fbDocumentID: "z7kknsEWFeJPhHPev2lA",
        statusConfirmed: true,
        time: 1.5,
      },
    ];
    // useActivityFunction().lastFiveTimeEntries = timeandstatusContext1;

    const { queryByTestId } = render(<MyActivityAsAList />);
    queryByTestId("icon");
  });

  it("can press on the button Visa allt in HomePage screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });

    const navigate = jest.fn();

    const { getAllByText, getByTestId } = render(
      <MyActivityAsAList navigation={{ navigate }} />
    );
    expect(getAllByText("Visa allt").length).toBe(1);
    const button = getByTestId("showAllButton");
    fireEvent.press(button);
    //useActivityFunction().setLimitAmountForTimeEntries().mockReturnValue(20);
    expect(navigate).toHaveBeenCalledWith("MyTimePage");
  });

  it("hide button Visa allt in MyTimePage screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "MyTimePage",
    });
    // useActivityFunction().setLimitAmountForTimeEntries().mockReturnValue(20);
    const { queryByText } = render(<MyActivityAsAList />);
    expect(queryByText("Visa allt")).toBeNull();
  });
});
