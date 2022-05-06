import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyActivityAsAList from "../components/MyActivityAsAList";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-elements/dist/icons/Icon", () => () => {
  return <fakeIcon />;
});
jest.mock("../components/Menu", () => () => {
  return <mockDropDownForSorting />;
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
      statusConfirmed: true,
      time: 1.5,
      user_id: "asd",
    },
  ];
  const timeandstatusOldTimeEntriesContext = [
    {
      activity_id: "asd",
      activity_title: "Missing people",
      admin_id: "aaa",
      date: { toDate: () => new Date() },
      doc_id: "z7kknsEWFeJPhHPev2lA2222",
      statusConfirmed: true,
      time: 1.5,
      user_id: "asd",
    },
  ];
  const allListOfTimeEntryFromContext = [
    {
      activity_id: "asd",
      activity_title: "Missing people",
      admin_id: "aaa",
      date: { toDate: () => new Date() },
      doc_id: "gkknsEWFeJ65465edgcyu",
      statusConfirmed: true,
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

  return {
    useActivityFunction: () => ({
      allListOfTimeEntry: allListOfTimeEntryFromContext,
      lastFiveTimeEntries: timeandstatusContext,
      myActivities: myActivitiesContext,
      setLimitAmountForTimeEntries: jest.fn(),
      addMoreTimeEntriesAfterScroll: true,
      timeEntriesAfterScrolling: timeandstatusOldTimeEntriesContext,
      userHasLassThanFiveTimeEntriesForLastTwoMonthes: timeandstatusContext,
      setAddMoreTimeEntriesAfterScroll: jest.fn(),
      setScrollToGetMoreTimeEntries: jest.fn(),
    }),
  };
});

describe("Testing MyActivityAsAList", () => {
  it("can find the text Min tid", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });
    const { getAllByText } = render(<MyActivityAsAList />);
    expect(getAllByText("Mina aktiviteter").length).toBe(1);
  });

  it("can find the activity title", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });
    const { getAllByText } = render(<MyActivityAsAList />);
    expect(getAllByText("Missing people").length).toBe(2);
  });

  it("can find the activity date", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });
    const { getAllByText } = render(<MyActivityAsAList />);
    expect(getAllByText(new Date().toISOString().slice(0, 10)).length).toBe(2);
  });

  it("can find the activity time", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });

    const { getAllByText } = render(<MyActivityAsAList />);
    expect(getAllByText("1.5 tim").length).toBe(2);
  });

  it("can press the edit button if statusConfirmed is false", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });

    const { getAllByTestId } = render(<MyActivityAsAList />);
    const button = getAllByTestId("editButton")[0];
    fireEvent.press(button);
    expect(button).toBeTruthy();
  });

  it("the edit button is unabled when statusConfirmed is true", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "HomePage",
    });

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

    expect(navigate).toHaveBeenCalledWith("MyTimePage");
  });

  it("hide button Visa allt in MyTimePage screen", () => {
    require("@react-navigation/native").useRoute.mockReturnValue({
      name: "MyTimePage",
    });

    const { queryByText } = render(<MyActivityAsAList />);
    expect(queryByText("Visa allt")).toBeNull();
  });
});
